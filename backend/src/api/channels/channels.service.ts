import { Injectable, HttpStatus } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { CreateChannelDto, ChannelMessageDto } from './dtos/channel.dto';
import { ONESECOND } from '../../const';

import { ChannelModel, Channel } from './models/channel.model';
import { UserModel, ChannelUser } from './models/user.model';
import { MessageModel, Message } from './models/message.model';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ChannelsService {
  @WebSocketServer() server: Server;
  public channelModel: ChannelModel;
  public userModel: UserModel;
  public messageModel: MessageModel;

  constructor(private prismaService: PrismaService) {
    this.channelModel = new ChannelModel(prismaService);
    this.userModel = new UserModel();
    this.messageModel = new MessageModel();

    this.channelModel.initChannel();
  }

  // Channel getter

  // 채널의 상세 정보를 찾는다.
  getUserJoinedChannel(userId: number, channelId: number): ChannelUser {
    const channel: Channel = this.channelModel.get(channelId);
    const user: ChannelUser = this.userModel.getUser(userId);

    if (!channel.users.has(user.id)) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'This user is not in the channel';
      throw { code, message };
    }
    return user;
  }

  // 채널 목록을 찾는다.
  getUserArrayJoinedChannel(channelId: number) {
    const channel: Channel = this.channelModel.get(channelId);
    const data = [];

    channel.users.forEach((userId) => {
      const user = this.userModel.getUser(userId);
      const userRole = this.getChannelUserRole(channelId, user.id);
      data.push({
        id: user.id,
        nickname: user.name,
        role: userRole,
        isMuted: channel.muted.has(user.id),
      });
    });
    return data;
  }

  // 채널에서 유저의 역할을 가져온다.
  getChannelUserRole(channelId: number, userId: number): string {
    const channel: Channel = this.channelModel.get(channelId);
    const user = this.getUserJoinedChannel(userId, channelId);

    if (channel.owner == user.id) {
      return 'owner';
    } else if (channel.admin.has(user.id)) {
      return 'admin';
    }
    return 'normal';
  }

  kick(user: ChannelUser, channel: Channel, kickedUser: ChannelUser) {
    this.userModel.setUserLeave(kickedUser, channel);
    this.messageModel.noticeToChannel(
      channel,
      `${user.name}님이 ${kickedUser.name} 님을 채널에서 강퇴하였습니다.`
    );
  }

  ban(user: ChannelUser, channel: Channel, bannedUser: ChannelUser) {
    this.userModel.setUserLeave(bannedUser, channel);
    channel.banned.add(bannedUser.id);
    this.messageModel.noticeToChannel(
      channel,
      `${user.name}님이 ${bannedUser.name} 님을 채널에서 차단하였습니다.`
    );
  }

  mute(user: ChannelUser, channel: Channel, mutedUser: ChannelUser, seconds: number) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (ONESECOND * seconds));

    channel.muted.set(mutedUser.id, expiresAt);
    this.messageModel.noticeToChannel(
      channel,
      `${user.name}님이 ${mutedUser.name} 님을 채널에서 조용히 시켰습니다.`
    );
  }


  // Controller 

  async create(userId: number, data: CreateChannelDto) {
    const createdBy: ChannelUser = this.userModel.getUser(userId);
    const newChannel: Channel = await this.channelModel.createChannel(data);

    newChannel.owner = createdBy.id;
    this.channelModel.joinChannel(createdBy, newChannel);

    // socket message
    createdBy.socket.emit('message', {
      channelId: newChannel.id,
    });

    return { id: newChannel.id };
  }

  join(userId: number, channelId: number, password: string) {
    const channel: Channel = this.channelModel.get(channelId);
    const user: ChannelUser = this.userModel.getUser(userId);

    this.channelModel.joinChannel(user, channel);
    this.messageModel.noticeToChannel(channel, `${user.name} 님이 채널에 참여하였습니다.`);
  }

  leave(userId: number, channelId: number) {
    const channel: Channel = this.channelModel.get(channelId);
    const user: ChannelUser = this.userModel.getUser(userId);

    channel.isUserJoinedAssert(user);
    if (channel.owner == user.id) {
      channel.users.forEach((joinedUserId) => {
        const joined = this.userModel.getUser(joinedUserId);
        this.userModel.setUserLeave(joined, channel);
      });
    } else {
      this.userModel.setUserLeave(user, channel);
    }

    this.messageModel.noticeToChannel(channel, `${user.name} 님이 나가셨습니다.`);
  }

  list(userId: number, query) {
    const data = [];
    const channels = this.channelModel.getAll();
    const user = this.userModel.getUser(userId);

    if (!query.isPublic && !query.isPriv && !query.isDm) {
      query.isPublic = true;
    }

    channels.forEach((channel) => {
      if (
        !this.channelModel.checkCanListed(channel, user.id) ||
        (query.isEnter && !channel.isUserJoined(user)) ||
        this.channelModel.checkListedRange(channel, query)
      ) {
        return;
      }

      const info = {
        id: channel.id,
        title: channel.title,
        isProtected: !channel.isPrivate && channel.password ? true : false,
        isPrivate: channel.isPrivate,
        isDm: channel.isDm,
        dmUserId: null,
        userCount: channel.users.size,
        isJoined: channel.users.has(user.id),
        createdAt: channel.createdAt,
      };

      if (info.isDm) {
        channel.users.forEach((id) => {
          if (id != user.id) {
            info.dmUserId = id;
            info.title = this.userModel.getUser(id).name;
          }
        });
      }
      data.push(info);
    });

    return data;
  }

  getChannelInfo(userId: number, channelId: number) {
    const channel: Channel = this.channelModel.get(channelId);

    if (!this.channelModel.checkCanGetInfo(channel, userId)) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are not authorized to this channel.',
      };
    }

    const users = [];
    channel.users.forEach((id) => {
      const user = this.userModel.getUser(id);
      const role = this.getChannelUserRole(channelId, id);
      users.push({
        id: user.id,
        nickname: user.name,
        role: role,
        isMuted: channel.muted.has(id),
      })
    });

    const channelInfo = {
      id: channel.id,
      title: channel.title,
      isProtected: !channel.isPrivate && channel.password ? true : false,
      isPrivate: channel.isPrivate,
      isDm: channel.isDm,
      isBlocked: channel.banned.has(userId),
      isJoined: channel.users.has(userId),
      userCount: channel.users.size,
      users: users,
      createdAt: channel.createdAt,
    };

    return channelInfo;
  }

  setChannelInfo(userId: number, channelId: number, data) {
    const channel: Channel = this.channelModel.get(channelId);
    const settedBy: ChannelUser = this.userModel.getUser(userId);

    if (channel.isDm) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'DM channel cannot change settings.',
      };
    } else if (channel.isPrivate && data.password) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Private channel cannot set a password.',
      };
    } else if (
      !settedBy ||
      this.getChannelUserRole(channel.id, settedBy.id) == 'normal'
    ) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You do not have permission to change settings.',
      };
    }

    channel.title = data.title ? data.title : channel.title;
    channel.password = data.password ? data.password : null;
    return;
  }

  setUserInChannel(
    userId: number,
    channelId: number,
    settedUserId: number,
    role: string
  ) {
    const channel: Channel = this.channelModel.get(channelId);
    const settedBy: ChannelUser = this.getUserJoinedChannel(userId, channelId);
    const settedUser: ChannelUser = this.getUserJoinedChannel(settedUserId, channelId);

    if (channel.isDm) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This channel is dm',
      };
    } else if (channel.owner != settedBy.id) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You do not have permission to edit.',
      };
    } else if (role != 'admin' && role != 'normal') {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You entered an incorrect value.',
      };
    }

    if (role == 'admin') {
      channel.admin.add(settedUser.id);
      this.messageModel.noticeToChannel(channel, `${settedUser.name} 님이 관리자 권한을 얻었습니다.`);
    } else if (role == 'normal') {
      channel.admin.delete(settedUser.id);
      this.messageModel.noticeToChannel(channel, `${settedUser.name} 님의 관리자 권한이 해제되었습니다.`);
    }
  }

  async initDirectMessage(userId: number, invitedUserId: number) {
    const invitedUser: ChannelUser = this.userModel.getUser(invitedUserId);
    const user: ChannelUser = this.userModel.getUser(userId);

    if (invitedUser.blockUser.has(userId)) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You cannot send dm to.',
      };
    }

    const dms: Channel[] = this.channelModel.getAllDms(user);
    const found = dms.find(
      (channel) =>
        channel.users.has(user.id) && channel.users.has(invitedUserId)
    );

    if (!found) {
      const newChannel = await this.channelModel.createChannel({ 
        title: "Direct Message",
        isDm: true 
      });
      this.channelModel.joinChannel(user, newChannel);
      this.channelModel.joinChannel(invitedUser, newChannel);
      return { id: newChannel.id };
    }

    return { id: found.id };
  }

  invite(userId: number, channelId: number, invitedUserId: number[]) {
    const channel = this.channelModel.get(channelId);
    const invitedBy = this.getUserJoinedChannel(userId, channelId);
    const role = this.getChannelUserRole(channel.id, invitedBy.id);
    
    if (channel.isDm || !channel.isPrivate) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You invited the user to the wrong channel.',
      };
    } else if (role == 'normal') {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You do not have permission in this channel.',
      };
    }

    invitedUserId.forEach((id) => {
      const invitedUser = this.userModel.getUser(id);

      if (channel.isUserJoined(invitedUser)) {
        throw {
          code: HttpStatus.CONFLICT,
          message: 'The user is already joining the channel.',
        };
      }
  
      this.channelModel.joinChannel(invitedUser, channel);
      
      // socket massage
      invitedUser.socket.emit('invited', { channelId: channel.id });
      this.messageModel.noticeToChannel(channel, `${invitedUser.name} 님을 초대하였습니다.`);
    });
  }

  setUserStatus(userId: number, channelId: number, settedUserId: number, status: string) {
    const channel: Channel = this.channelModel.get(channelId);
    const user: ChannelUser = this.getUserJoinedChannel(userId, channelId);
    const settedUser: ChannelUser = this.getUserJoinedChannel(settedUserId, channelId);

    if (channel.owner != user.id && !channel.admin.has(user.id)) {
      throw {
        code: HttpStatus.UNAUTHORIZED,
        message: 'This user does not have permission to do this.',
      };
    }

    switch (status) {
      case "kick":
        return this.kick(user, channel, settedUser);
      case "ban":
        return this.ban(user, channel, settedUser);
      case "mute":
        return this.mute(user, channel, settedUser, 3);
      default:
        break;
    }
  }

}
