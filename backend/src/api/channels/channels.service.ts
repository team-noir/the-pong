import { Injectable, HttpStatus } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { CreateChannelDto, ChannelMessageDto } from './dtos/channel.dto';
import { ONESECOND } from '../../const';

import { ChannelClass, Channel } from './ChannelClass';
import { ChannelUserClass, ChannelUser } from './ChannelUserClass';
import { MessageClass, Message } from './MessageClass';

@Injectable()
export class ChannelsService {
  @WebSocketServer() server: Server;

  public channelClass: ChannelClass = new ChannelClass();
  public channelUserClass: ChannelUserClass = new ChannelUserClass();
  public messageClass: MessageClass = new MessageClass();

  // Channel getter

  // 채널의 상세 정보를 찾는다.
  getUserJoinedChannel(userId: number, channelId: number): ChannelUser {
    const channel: Channel = this.channelClass.get(channelId);
    const user: ChannelUser = this.channelUserClass.getUser(userId);

    if (!channel.users.has(user.id)) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'This user is not in the channel';
      throw { code, message };
    }
    return user;
  }

  // 채널 목록을 찾는다.
  getUserArrayJoinedChannel(channelId: number) {
    const channel: Channel = this.channelClass.get(channelId);
    const data = [];

    channel.users.forEach((userId) => {
      const user = this.channelUserClass.getUser(userId);
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
    const channel: Channel = this.channelClass.get(channelId);
    const user = this.getUserJoinedChannel(userId, channelId);

    if (channel.owner == user.id) {
      return 'owner';
    } else if (channel.admin.has(user.id)) {
      return 'admin';
    }
    return 'normal';
  }

  kick(user: ChannelUser, channel: Channel, kickedUser: ChannelUser) {
    this.channelUserClass.setUserLeave(kickedUser, channel);
    this.messageClass.noticeToChannel(
      channel,
      `${user.name}님이 ${kickedUser.name} 님을 채널에서 강퇴하였습니다.`
    );
  }

  ban(user: ChannelUser, channel: Channel, bannedUser: ChannelUser) {
    this.channelUserClass.setUserLeave(bannedUser, channel);
    channel.banned.add(bannedUser.id);
    this.messageClass.noticeToChannel(
      channel,
      `${user.name}님이 ${bannedUser.name} 님을 채널에서 차단하였습니다.`
    );
  }

  mute(user: ChannelUser, channel: Channel, mutedUser: ChannelUser, seconds: number) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (ONESECOND * seconds));

    channel.muted.set(mutedUser.id, expiresAt);
    this.messageClass.noticeToChannel(
      channel,
      `${user.name}님이 ${mutedUser.name} 님을 채널에서 조용히 시켰습니다.`
    );
  }


  // Controller 

  create(userId: number, data: CreateChannelDto) {
    const createdBy: ChannelUser = this.channelUserClass.getUser(userId);
    const newChannel: Channel = this.channelClass.createChannel(data);

    newChannel.owner = createdBy.id;
    this.channelClass.joinChannel(createdBy, newChannel);

    // socket message
    createdBy.socket.emit('message', {
      channelId: newChannel.id,
    });

    return { id: newChannel.id };
  }

  join(userId: number, channelId: number, password: string) {
    const channel: Channel = this.channelClass.get(channelId);
    const user: ChannelUser = this.channelUserClass.getUser(userId);

    if (channel.password && password != channel.password) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You entered an incorrect password.',
      };
    } else if (channel.banned.has(user.id)) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are blocked from the channel.',
      };
    } else if (channel.isDm && channel.users.size > 1) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are connot join the channel.',
      };
    } else if (channel.isUserJoined(user)) {
      throw {
        code: HttpStatus.CONFLICT,
        message: 'This channel is already participating.',
      };
    }

    this.channelClass.joinChannel(user, channel);
    this.messageClass.noticeToChannel(channel, `${user.name} 님이 채널에 참여하였습니다.`);
  }

  leave(userId: number, channelId: number) {
    const channel: Channel = this.channelClass.get(channelId);
    const user: ChannelUser = this.channelUserClass.getUser(userId);

    channel.isUserJoinedAssert(user);
    if (channel.owner == user.id) {
      channel.users.forEach((joinedUserId) => {
        const joined = this.channelUserClass.getUser(joinedUserId);
        this.channelUserClass.setUserLeave(joined, channel);
      });
    } else {
      this.channelUserClass.setUserLeave(user, channel);
    }

    this.messageClass.noticeToChannel(channel, `${user.name} 님이 나가셨습니다.`);
  }

  list(userId: number, query) {
    const data = [];
    const channels = this.channelClass.getAll();
    const user = this.channelUserClass.getUser(userId);

    if (!query.isPublic && !query.isPriv && !query.isDm) {
      query.isPublic = true;
    }

    channels.forEach((channel) => {
      if (
        !this.channelClass.checkCanListed(channel, user.id) ||
        (query.isEnter && !channel.isUserJoined(user)) ||
        this.channelClass.checkListedRange(channel, query)
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
            info.title = this.channelUserClass.getUser(id).name;
          }
        });
      }
      data.push(info);
    });

    return data;
  }

  getChannelInfo(userId: number, channelId: number) {
    const channel: Channel = this.channelClass.get(channelId);

    if (!this.channelClass.checkCanGetInfo(channel, userId)) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are not authorized to this channel.',
      };
    }

    const users = [];
    channel.users.forEach((id) => {
      const user = this.channelUserClass.getUser(id);
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
    const channel: Channel = this.channelClass.get(channelId);
    const settedBy: ChannelUser = this.channelUserClass.getUser(userId);

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
    const channel: Channel = this.channelClass.get(channelId);
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
      this.messageClass.noticeToChannel(channel, `${settedUser.name} 님이 관리자 권한을 얻었습니다.`);
    } else if (role == 'normal') {
      channel.admin.delete(settedUser.id);
      this.messageClass.noticeToChannel(channel, `${settedUser.name} 님의 관리자 권한이 해제되었습니다.`);
    }
  }

  initDirectMessage(userId: number, invitedUserId: number) {
    const invitedUser: ChannelUser = this.channelUserClass.getUser(invitedUserId);
    const user: ChannelUser = this.channelUserClass.getUser(userId);

    if (invitedUser.blockUser.has(userId)) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You cannot send dm to.',
      };
    }

    const dms: Channel[] = this.channelClass.getAllDms(user);
    const found = dms.find(
      (channel) =>
        channel.users.has(user.id) && channel.users.has(invitedUserId)
    );

    if (!found) {
      const newChannel = this.channelClass.createChannel({ isDm: true });
      this.channelClass.joinChannel(user, newChannel);
      this.channelClass.joinChannel(invitedUser, newChannel);
      return { id: newChannel.id };
    }

    return { id: found.id };
  }

  invite(userId: number, channelId: number, invitedUserId: number[]) {
    const channel = this.channelClass.get(channelId);
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
      const invitedUser = this.channelUserClass.getUser(id);

      if (channel.isUserJoined(invitedUser)) {
        throw {
          code: HttpStatus.CONFLICT,
          message: 'The user is already joining the channel.',
        };
      }
  
      this.channelClass.joinChannel(invitedUser, channel);
      
      // socket massage
      invitedUser.socket.emit('invited', { channelId: channel.id });
      this.messageClass.noticeToChannel(channel, `${invitedUser.name} 님을 초대하였습니다.`);
    });
  }

  setUserStatus(userId: number, channelId: number, settedUserId: number, status: string) {
    const channel: Channel = this.channelClass.get(channelId);
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
