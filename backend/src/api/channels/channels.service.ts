import { Injectable, HttpStatus } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { CreateChannelDto } from './dtos/channel.dto';
import { ONESECOND } from '../../const';

import { ChannelClass, Channel } from './ChannelClass';

type userId = number;
type channelId = number;
type messageId = number;

export interface ChannelUser {
  id: number;
  name: string;               // nickname: string

  joined: Set<channelId>;     // channels: channel
  blockUser: Set<channelId>;  // blockeds: user

  socket;
}

export interface Message {
  id: number;
  senderId: userId;
  channelId: userId;
  text: string;
  createdAt: Date;

  isLog: boolean;             // none

  // sender: user;
  // channel: channel;
}

@Injectable()
export class ChannelsService {
  @WebSocketServer() server: Server;
  private channelUserMap = new Map<userId, ChannelUser>();
  private messageMap = new Map<messageId, Message>();

  public channelClass: ChannelClass = new ChannelClass();

  // User getter

  hasUser(userId: number): boolean {
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



  // User setter

  setUser(userId: number, user: ChannelUser): void {
    this.channelUserMap.set(userId, user);
  }

  setUserLeave(user: ChannelUser, channel: Channel) {
    user.socket.leave(String(channel.id));
    user.joined.delete(channel.id);
    channel.users.delete(user.id);
    channel.admin.delete(user.id);
  }




  // Channel getter

  // 채널의 상세 정보를 찾는다.
  getUserJoinedChannel(userId: number, channelId: number): ChannelUser {
    const channel: Channel = this.channelClass.get(channelId);
    const user: ChannelUser = this.getUser(userId);

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
      const user = this.getUser(userId);
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


  // Channel setter

  

  

  

  kick(user: ChannelUser, channel: Channel, kickedUser: ChannelUser) {
    this.setUserLeave(kickedUser, channel);
    this.noticeToChannel(
      channel.id,
      `${user.name}님이 ${kickedUser.name} 님을 채널에서 강퇴하였습니다.`
    );
  }

  ban(user: ChannelUser, channel: Channel, bannedUser: ChannelUser) {
    this.setUserLeave(bannedUser, channel);
    channel.banned.add(bannedUser.id);
    this.noticeToChannel(
      channel.id,
      `${user.name}님이 ${bannedUser.name} 님을 채널에서 차단하였습니다.`
    );
  }

  mute(user: ChannelUser, channel: Channel, mutedUser: ChannelUser, seconds: number) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (ONESECOND * seconds));

    channel.muted.set(mutedUser.id, expiresAt);
    this.noticeToChannel(
      channel.id,
      `${user.name}님이 ${mutedUser.name} 님을 채널에서 조용히 시켰습니다.`
    );
  }




  // Message

  // 채널에 공지를 보낸다.
  noticeToChannel(channelId: number, message: string): Message {
    const channel: Channel = this.channelClass.get(channelId);

    const newMessage: Message = {
      id: this.messageMap.size + 1,
      senderId: null,
      channelId: channel.id,
      isLog: true,
      text: message,
      createdAt: new Date(),
    };
    this.messageMap.set(newMessage.id, newMessage);

    // socket message
    this.server.to(String(channelId)).emit('notice', {
      id: newMessage.id,
      channelId: newMessage.channelId,
      text: newMessage.text,
      createdAt: newMessage.createdAt,
    });
    return newMessage;
  }

  // 채널에 메세지를 보낸다.
  messageToChannel(
    userId: number,
    channelId: number,
    message: string
  ): Message {
    const channel: Channel = this.channelClass.get(channelId);
    const user: ChannelUser = this.getUserJoinedChannel(userId, channelId);

    if (channel.muted.has(user.id)) {
      const expiresAt = new Date(channel.muted.get(user.id));

      if (expiresAt.getTime() <= new Date().getTime()) {
        channel.muted.delete(user.id);
      } else {
        const code = HttpStatus.FORBIDDEN;
        const message = 'You are silenced on the channel.';
        throw { code, message };
      }
    }

    const newMessage: Message = {
      id: this.messageMap.size + 1,
      senderId: user.id,
      channelId: channel.id,
      isLog: false,
      text: message,
      createdAt: new Date(),
    };
    this.messageMap.set(newMessage.id, newMessage);

    // socket message
    this.server.to(String(channelId)).emit('message', {
      id: newMessage.id,
      channelId: newMessage.channelId,
      senderId: user.id,
      senderNickname: user.name,
      isLog: newMessage.isLog,
      text: newMessage.text,
      createdAt: newMessage.createdAt,
    });

    return newMessage;
  }

  // Message getter

  getChannelMessages(userId: number, channelId: number) {
    this.getUserJoinedChannel(userId, channelId);

    const data = [];
    [ ...this.messageMap.values() ].forEach((message) => {
      if (message.channelId == channelId) {
        const tarMessage = {
          id: message.id,
          senderId: message.senderId,
          senderNickname: null,
          isLog: message.isLog,
          text: message.text,
          createdAt: message.createdAt,
        }
        
        if (message.senderId) {
          tarMessage.senderNickname = this.getUser(message.senderId).name;
        }

        data.push(tarMessage);
      }
    });

    return data;
  }









  // Controller 

  create(userId: number, data: CreateChannelDto) {
    const createdBy: ChannelUser = this.getUser(userId);
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
    const user: ChannelUser = this.getUser(userId);

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
    } else if (this.channelClass.checkIsJoined(channel, user.id)) {
      throw {
        code: HttpStatus.CONFLICT,
        message: 'This channel is already participating.',
      };
    }

    this.channelClass.joinChannel(user, channel);
    this.noticeToChannel(channelId, `${user.name} 님이 채널에 참여하였습니다.`);
  }

  leave(userId: number, channelId: number) {
    const channel: Channel = this.channelClass.get(channelId);
    const user: ChannelUser = this.getUserJoinedChannel(userId, channelId);

    if (channel.owner == user.id) {
      channel.users.forEach((joinedUserId) => {
        const joined = this.getUser(joinedUserId);
        this.setUserLeave(joined, channel);
      });
    } else {
      this.setUserLeave(user, channel);
    }

    this.noticeToChannel(channelId, `${user.name} 님이 나가셨습니다.`);
  }

  list(userId: number, query) {
    const data = [];
    const channels = this.channelClass.getAll();

    if (!query.isPublic && !query.isPriv && !query.isDm) {
      query.isPublic = true;
    }

    channels.forEach((channel) => {
      if (
        !this.channelClass.checkCanListed(channel, userId) ||
        (query.isEnter && !this.channelClass.checkIsJoined(channel, userId)) ||
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
        isJoined: channel.users.has(userId),
        createdAt: channel.createdAt,
      };

      if (info.isDm) {
        channel.users.forEach((id) => {
          if (id != userId) {
            info.dmUserId = id;
            info.title = this.getUser(id).name;
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
      const user = this.getUser(id);
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
    const settedBy: ChannelUser = this.getUser(userId);

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
      this.noticeToChannel(channel.id, `${settedUser.name} 님이 관리자 권한을 얻었습니다.`);
    } else if (role == 'normal') {
      channel.admin.delete(settedUser.id);
      this.noticeToChannel(channel.id, `${settedUser.name} 님의 관리자 권한이 해제되었습니다.`);
    }
  }

  initDirectMessage(userId: number, invitedUserId: number) {
    const invitedUser: ChannelUser = this.getUser(invitedUserId);
    const user: ChannelUser = this.getUser(userId);

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
      const invitedUser = this.getUser(id);

      if (this.channelClass.checkIsJoined(channel, invitedUser.id)) {
        throw {
          code: HttpStatus.CONFLICT,
          message: 'The user is already joining the channel.',
        };
      }
  
      this.channelClass.joinChannel(invitedUser, channel);
      
      // socket massage
      invitedUser.socket.emit('invited', { channelId: channel.id });
      this.noticeToChannel(channel.id, `${invitedUser.name} 님을 초대하였습니다.`);
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
