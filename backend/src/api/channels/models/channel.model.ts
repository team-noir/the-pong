import { HttpStatus } from '@nestjs/common';

import { ChannelUser } from './user.model';
import { PrismaService } from '@/prisma/prisma.service';

import { ONESECOND } from '@const';

type userId = number;
type channelId = number;

export class Channel {
  id: number;
  title?: string;
  // channelCode: string;
  password?: string;
  isPrivate: boolean; // isPublic
  isDm: boolean;
  createdAt: Date;
  // updatedAt: Date;
  // deletedAt: Date;

  owner?: userId; // none
  users: Set<userId>;
  admin: Set<userId>; // none
  banned: Set<userId>; // none
  muted: Map<userId, Date>; // none

  // messages: Message[]

  constructor(
    id: number,
    isPrivate: boolean,
    isDm: boolean,
    title?: string,
    owner?: userId,
    password?: string
  ) {
    this.id = id;
    this.title = title;
    this.isDm = isDm;
    this.isPrivate = isPrivate;
    this.createdAt = new Date();
    this.password = password;

    this.owner = owner;
    this.users = new Set<number>();
    this.admin = new Set<number>();
    this.muted = new Map<number, Date>();
    this.banned = new Set<number>();
  }

  join(user: ChannelUser) {
    this.users.add(user.id);
  }

  leave(user: ChannelUser) {
    this.users.delete(user.id);
    this.admin.delete(user.id);
  }

  set(user: ChannelUser, title: string, password: string) {
    this.assertCanUserEditChannel(user, password);
    this.title = title;
    this.password = password;
  }

  isUserJoined(userId: number): boolean {
    return this.users.has(userId);
  }

  isUserMuted(userId: number): boolean {
    return this.muted.has(userId);
  }

  isUserBanned(userId: number): boolean {
    return this.banned.has(userId);
  }

  // 채널에서 유저의 역할을 가져온다.
  getChannelUserRole(user: ChannelUser): string {
    this.checkUserJoined(user);

    if (this.owner == user.id) {
      return 'owner';
    } else if (this.admin.has(user.id)) {
      return 'admin';
    }
    return 'normal';
  }

  checkUserJoined(user: ChannelUser) {
    if (!this.users.has(user.id)) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'This user is not in the channel';
      throw { code, message };
    }
  }

  checkUserMuted(user: ChannelUser) {
    if (this.isUserMuted(user.id)) {
      const expiresAt = new Date(this.muted.get(user.id));

      if (expiresAt.getTime() > new Date().getTime()) {
        const code = HttpStatus.FORBIDDEN;
        const message = 'You are silenced on the channel.';
        throw { code, message };
      }
    }
  }

  checkPassword(password?: string) {
    if (this.password && password && password != this.password) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You entered an incorrect password.',
      };
    }
  }

  assertCanUserJoinChannel(user: ChannelUser) {
    if (this.banned.has(user.id)) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are blocked from the channel.',
      };
    } else if (this.isDm && this.users.size > 1) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are connot join the channel.',
      };
    } else if (this.isUserJoined(user.id)) {
      throw {
        code: HttpStatus.CONFLICT,
        message: 'This channel is already participating.',
      };
    }
  }

  assertCanUserEditChannel(user: ChannelUser, password?: string) {
    if (this.isDm) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'DM channel cannot change settings.',
      };
    } else if (this.isPrivate && password) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Private channel cannot set a password.',
      };
    } else if (!user || this.getChannelUserRole(user) == 'normal') {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You do not have permission to change settings.',
      };
    }
  }

  assertUserPermission(user: ChannelUser) {
    if (this.owner != user.id && !this.admin.has(user.id)) {
      throw {
        code: HttpStatus.UNAUTHORIZED,
        message: 'This user does not have permission to do this.',
      };
    }
  }
}

export class ChannelModel {
  private channelMap: Map<channelId, Channel>;

  constructor(private prismaService: PrismaService) {
    this.channelMap = new Map<channelId, Channel>();
  }

  async initChannel() {
    const dbChannels = await this.prismaService.channel.findMany({
      select: {
        id: true,
        title: true,
        isPrivate: true,
        isDm: true,
        password: true,
        ownerId: true,
        users: {
          select: {
            userId: true,
            isAdmin: true,
            isBanned: true,
          },
        },
      },
    });

    dbChannels.forEach((dbChannel) => {
      const channel = new Channel(
        dbChannel.id,
        dbChannel.isPrivate,
        dbChannel.isDm,
        dbChannel.title,
        dbChannel.ownerId,
        dbChannel.password
      );

      dbChannel.users.forEach((user) => {
        if (user.isAdmin) {
          channel.admin.add(user.userId);
        }
        if (user.isBanned) {
          channel.banned.add(user.userId);
        } else {
          channel.users.add(user.userId);
        }
      });
      this.channelMap.set(channel.id, channel);
    });
  }

  // Getter

  // 채널 아이디로 채널을 가져온다.
  get(channelId: number): Channel {
    const channel = this.channelMap.get(channelId);

    if (!channel) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'This channel does not exist.';
      throw { code, message };
    }
    return channel;
  }

  // 채널 객체를 모두 가져온다.
  getAll() {
    return [...this.channelMap.values()];
  }

  // 채널 중에 dm 채널만 가져온다.
  getAllDms(user: ChannelUser): Channel[] {
    const data = [];

    user.joined.forEach((channelId) => {
      const channel: Channel = this.get(channelId);
      if (channel && channel.isDm) {
        data.push(channel);
      }
    });
    return data;
  }

  // 채널을 리스팅할 수 있는 유저인지 확인
  checkCanListed(channel: Channel, userId: number): boolean {
    const isJoined = channel.users.has(userId);
    const isPrivate = channel.isPrivate;
    const isDm = channel.isDm;

    return ((isPrivate || isDm) && isJoined) || !isPrivate;
  }

  // 채널의 상세 정보를 유저가 볼 수 있는지 확인
  checkCanGetInfo(channel: Channel, userId: number): boolean {
    const isJoined = channel.users.has(userId);
    const isPrivate = channel.isPrivate;
    const isDm = channel.isDm;
    const isPassword = channel.password;

    return (
      ((isPrivate || isDm) && isJoined) ||
      (!isPrivate && isPassword && !isDm && isJoined) ||
      (!isPrivate && !isPassword && !isDm)
    );
  }

  // 채널이 query에서 원하는 유형인지 알려준다.
  checkListedRange(channel: Channel, query) {
    return (
      !(query.isPublic && !channel.isPrivate && !channel.isDm) &&
      !(query.isPriv && channel.isPrivate && !channel.isDm) &&
      !(query.isDm && !channel.isPrivate && channel.isDm)
    );
  }

  // Setter

  async createChannel(data, owner?: ChannelUser) {
    const created = await this.prismaService.channel.create({
      data: {
        title: data.title,
        password: data.password,
        isPrivate: data.isPrivate ? true : false,
        isDm: data.isDm ? true : false,
        ownerId: owner ? owner.id : null,
      },
    });
    const newChannel = new Channel(
      created.id,
      created.isPrivate,
      created.isDm,
      created.title,
      owner ? owner.id : null,
      created.password
    );
    this.channelMap.set(newChannel.id, newChannel);
    return newChannel;
  }

  async joinChannel(user: ChannelUser, channel: Channel, password?: string) {
    channel.checkPassword(password);
    channel.assertCanUserJoinChannel(user);
    channel.join(user);
    user.join(channel);

    await this.prismaService.channel_User.create({
      data: {
        channelId: channel.id,
        userId: user.id,
      },
    });
  }

  async leaveChannel(user: ChannelUser, channel: Channel) {
    channel.leave(user);
    user.leave(channel);

    if (channel.isUserBanned(user.id)) {
      return;
    }
    await this.prismaService.channel_User.delete({
      where: {
        id: {
          channelId: channel.id,
          userId: user.id,
        },
      },
    });
  }

  async inviteChannel(invitedUser: ChannelUser, channel: Channel) {
    channel.assertCanUserJoinChannel(invitedUser);
    channel.join(invitedUser);
    invitedUser.join(channel);

    await this.prismaService.channel_User.create({
      data: {
        channelId: channel.id,
        userId: invitedUser.id,
      },
    });
  }

  async kick(user: ChannelUser, channel: Channel, kickedUser: ChannelUser) {
    channel.assertUserPermission(user);
    await this.leaveChannel(kickedUser, channel);
  }

  async ban(user: ChannelUser, channel: Channel, bannedUser: ChannelUser) {
    channel.assertUserPermission(user);
    channel.banned.add(bannedUser.id);

    await this.prismaService.channel_User.update({
      where: {
        id: {
          channelId: channel.id,
          userId: bannedUser.id,
        },
      },
      data: {
        isBanned: true,
      },
    });

    channel.leave(bannedUser);
    bannedUser.leave(channel);
  }

  async mute(
    user: ChannelUser,
    channel: Channel,
    mutedUser: ChannelUser,
    seconds: number
  ) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + ONESECOND * seconds);

    channel.assertUserPermission(user);
    channel.muted.set(mutedUser.id, expiresAt);
  }

  async unmute(channel: Channel, mutedUser: ChannelUser) {
    channel.muted.delete(mutedUser.id);
  }
}
