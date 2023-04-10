import { Socket } from 'socket.io';
import { HttpStatus } from '@nestjs/common';
import { Channel } from './channel.model';
import { PrismaService } from '../../../prisma/prisma.service';

type userId = number;
type channelId = number;

export class ChannelUser {
  id: number;
  name: string; // nickname: string

  joined: Set<channelId>; // channels: channel
  blockUser: Set<channelId>; // blockeds: user

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
    this.socket.leave(String(channel.id));
    this.joined.delete(channel.id);
  }

  isOnline() {
    return this.socket != null;
  }

  isBlockUser(userId: number) {
    return this.blockUser.has(userId);
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
        blockeds: {
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

      dbUser.blockeds.forEach((blocked) => {
        newUser.blockUser.add(blocked.blockedId);
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

  getUserFromSocket(socket: Socket) {
    if (!socket || !socket.data || !socket.data.user) {
      return null;
    } else {
      return socket.data.user;
    }
  }

  getUsernameList() {
    return [...this.channelUserMap.keys()];
  }

  // Setter

  setUser(userId: number, user: ChannelUser): void {
    this.channelUserMap.set(userId, user);
  }
}
