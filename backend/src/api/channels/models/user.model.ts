import { Socket } from 'socket.io';
import { HttpStatus } from '@nestjs/common';
import { Channel } from './channel.model';
import { PrismaService } from '@/prisma/prisma.service';

type userId = number;
type channelId = number;

export class ChannelUser {
  id: number;
  name: string; // nickname: string

  joined: Set<channelId>; // channels: channel
  blockUser: Set<userId>; // blockeds: user

  socket;

  constructor(id: number, name: string, socket?) {
    this.id = id;
    this.name = name;
    this.socket = socket;

    this.joined = new Set<number>();
    this.blockUser = new Set<number>();
  }

  join(channel: Channel) {
    this.joined.add(channel.id);
    if (this.socket) {
      this.socket.join(String(channel.id));
    }
  }

  leave(channel: Channel) {
    if (this.socket) {
      this.socket.leave(String(channel.id));
    }
    this.joined.delete(channel.id);
  }

  isOnline() {
    return this.socket != null;
  }

  isBlockUser(userId: number) {
    return this.blockUser.has(userId);
  }

  resetSocket(newSocket: Socket) {
    if (this.socket) {
      this.socket.disconnect(true);
    }
    this.socket = newSocket;
    this.joined.forEach((channelId) => {
      this.socket.join(String(channelId));
    });
  }
}

export class UserModel {
  private channelUserMap: Map<userId, ChannelUser>;

  constructor(private prismaService: PrismaService) {
    this.channelUserMap = new Map<userId, ChannelUser>();
  }

  async initUser() {
    const dbUsers = await this.prismaService.user.findMany({
      select: {
        id: true,
        nickname: true,
        channels: {
          select: {
            channelId: true,
          },
        },
        blockers: {
          select: {
            blockedId: true,
          },
        },
      },
    });

    dbUsers.forEach((dbUser) => {
      const newUser = new ChannelUser(dbUser.id, dbUser.nickname);

      dbUser.channels.forEach((channel) => {
        newUser.joined.add(channel.channelId);
      });

      dbUser.blockers.forEach((blocker) => {
        newUser.blockUser.add(blocker.blockedId);
      });

      this.channelUserMap.set(newUser.id, newUser);
    });
  }

  // Getter

  has(userId: number): boolean {
    return this.channelUserMap.has(userId);
  }

  getUser(userId: number): ChannelUser {
    const user = this.channelUserMap.get(userId);

    if (!user) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'This user does not exist.';
      throw { code, message };
    }
    return user;
  }

  getUsernameList() {
    return [...this.channelUserMap.keys()];
  }

  async getUserBlockSet(user: ChannelUser): Promise<Set<number>> {
    const blockSet = new Set<number>();
    const blocked = await this.prismaService.blockUser.findMany({
      where: { blockerId: user.id },
      select: {
        blocked: { select: { id: true, nickname: true } },
      },
    });
    const blocker = await this.prismaService.blockUser.findMany({
      where: { blockedId: user.id },
      select: {
        blocker: { select: { id: true, nickname: true } },
      },
    });

    blocked.forEach((block) => {
      blockSet.add(block.blocked.id);
    });
    blocker.forEach((block) => {
      blockSet.add(block.blocker.id);
    });
    return blockSet;
  }

  // Setter

  setUser(userId: number, user: ChannelUser): void {
    this.channelUserMap.set(userId, user);
  }

  setUserNickname(userId: number, nickname: string): void {
    const user = this.getUser(userId);
    user.name = nickname;
    this.setUser(userId, user);
  }

  addUser(userId: number, username: string, socket: Socket) {
    const newUser = new ChannelUser(userId, username, socket);
    this.setUser(userId, newUser);
  }

  reconnectUserSocket(userId: number, socket: Socket) {
    const user = this.getUser(userId);
    user.resetSocket(socket);
  }
}
