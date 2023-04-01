import { Injectable, HttpStatus } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { CreateChannelDto } from './dtos/channel.dto';

// 'public'이면서 비밀번호가 있는 경우 protected
export interface Channel {
  id: number;
  title?: string;
  isDm: boolean;
  isPrivate: boolean;
  createdAt: Date;
  password?: string;

  owner?: number;
  users: Set<number>;
  admin: Set<number>;
  muted: Set<number>;
  banned: Set<number>;
}

export interface ChannelUser {
  id: number;
  name: string;
  socket;

  joined: Set<number>;
  invited: Set<number>;
  blockUser: Set<number>;
}

export interface Message {
  id: number;
  senderId: number;
  channelId: number;
  isLog: boolean;
  text: string;
  createdAt: Date;
}

type userId = number;
type channelId = number;
type messageId = number;

@Injectable()
export class ChannelsService {
  @WebSocketServer() server: Server;
  private channelMap = new Map<channelId, Channel>();
  private channelUserMap = new Map<userId, ChannelUser>();
  private messageMap = new Map<messageId, Message>();

  hasUser(userId: number) {
    return this.channelUserMap.has(userId);
  }

  getUser(userId: number) {
    return this.channelUserMap.get(userId);
  }

  setUser(userId: number, user: ChannelUser) {
    this.channelUserMap.set(userId, user);
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

  setUserLeave(user: ChannelUser, channel: Channel) {
    user.socket.leave(String(channel.id));
    user.joined.delete(channel.id);
    channel.users.delete(user.id);
    channel.admin.delete(user.id);
  }

  getChannel(channelId: number) {
    return this.channelMap.get(channelId);
  }

  getChannelValues() {
    return [...this.channelMap.values()];
  }

  getChannelUsers(channelId: number) {
    const channel: Channel = this.getChannel(channelId);
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

  getChannelUserRole(channelId: number, userId: number): string {
    const channel: Channel = this.getChannel(channelId);
    if (channel.owner == userId) {
      return 'owner';
    } else if (channel.admin.has(userId)) {
      return 'admin';
    }
    return 'normal';
  }

  noticeToChannel(channelId: number, message: string): Message {
    const channel: Channel = this.channelMap.get(channelId);

    if (!channel) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This channel does not exist.',
      };
    }

    const newMessage: Message = {
      id: this.messageMap.size,
      senderId: 0,
      channelId: channel.id,
      isLog: true,
      text: message,
      createdAt: new Date(),
    };
    this.messageMap.set(newMessage.id, newMessage);

    // socket message
    this.server.to(String(channelId)).emit('message', {
      channelId: channelId,
      text: message,
    });
    return newMessage;
  }

  messageToChannel(
    userId: number,
    channelId: number,
    message: string
  ): Message {
    const channel: Channel = this.channelMap.get(channelId);
    const user: ChannelUser = this.getUser(userId);

    if (!channel) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This channel does not exist.',
      };
    } else if (!user) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This user does not exist.',
      };
    } else if (!channel.users.has(user.id)) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You not in the channel.',
      };
    } else if (channel.muted.has(user.id)) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are silenced on the channel.',
      };
    }

    const newMessage: Message = {
      id: this.messageMap.size,
      senderId: user.id,
      channelId: channel.id,
      isLog: false,
      text: message,
      createdAt: new Date(),
    };
    this.messageMap.set(newMessage.id, newMessage);

    // socket message
    this.server.to(String(channelId)).emit('message', {
      channelId: channelId,
      sender: {
        id: user.id,
        nickname: user.name,
      },
      text: newMessage.text,
      createdAt: newMessage.createdAt,
    });

    return newMessage;
  }

  getChannelMessages(userId: number, channelId: number) {
    const channel: Channel = this.channelMap.get(channelId);
    const user: ChannelUser = this.getUser(userId);

    if (!channel) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This channel does not exist.',
      };
    } else if (!user) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This user does not exist.',
      };
    } else if (!channel.users.has(user.id)) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You not in the channel.',
      };
    }

    const data = [];
    [...this.messageMap.values()].forEach((message) => {
      if (message.channelId == channelId) {
        
        let senderNickname;
        if (message.senderId == 0) {
          senderNickname = 'notice';
        } else {
          senderNickname = this.getUser(message.senderId).name;
        }

        data.push({
          id: message.id,
          senderId: message.senderId,
          senderNickname: senderNickname,
          isLog: message.isLog,
          text: message.text,
          createdAt: message.createdAt,
        });
      }
    });

    return data;
  }

  createChannel(data) {
    const newChannelId: number = this.channelMap.size;
    const newChannel: Channel = {
      id: newChannelId,
      title: data.title ? data.title : undefined,
      isDm: data.isDm ? true : false,
      isPrivate: data.isPrivate ? true : false,
      createdAt: new Date(),
      password: data.password ? data.password : undefined,

      owner: undefined,
      users: new Set<number>(),
      admin: new Set<number>(),
      muted: new Set<number>(),
      banned: new Set<number>(),
    };
    this.channelMap.set(newChannel.id, newChannel);

    return newChannel;
  }

  joinChannel(user: ChannelUser, channel: Channel) {
    user.socket.join(String(channel.id));
    user.joined.add(channel.id);
    channel.users.add(user.id);
  }

  create(userId: number, data: CreateChannelDto) {
    const createdBy: ChannelUser = this.getUser(userId);
    if (!createdBy) {
      throw {
        code: HttpStatus.UNAUTHORIZED,
        message: "This is a user ID that doesn't exist.",
      };
    } else if (!data.title) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You did not enter a channel name.',
      };
    }

    const newChannel = this.createChannel(data);
    this.joinChannel(createdBy, newChannel);

    createdBy.socket.emit('message', {
      channelId: newChannel.id,
    });

    return { id: newChannel.id };
  }

  join(userId: number, channelId: number, password: string) {
    const channel = this.channelMap.get(channelId);
    const user: ChannelUser = this.getUser(userId);

    if (!channel) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This channel does not exist.',
      };
    } else if (channel.password && password != channel.password) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You entered an incorrect password.',
      };
    } else if (channel.banned.has(user.id)) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are blocked from the channel.',
      };
    } else if (channel.isPrivate && !user.invited.has(channel.id)) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are connot join the channel.',
      };
    } else if (channel.isDm && channel.users.size > 1) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are connot join the channel.',
      };
    } else if (channel.users.has(user.id)) {
      throw {
        code: HttpStatus.CONFLICT,
        message: 'This channel is already participating.',
      };
    }

    this.joinChannel(user, channel);
    this.noticeToChannel(channelId, `${user.name} 님이 채널에 참여하였습니다.`);
  }

  leave(userId: number, channelId: number) {
    const channel: Channel = this.getChannel(channelId);
    const user: ChannelUser = this.getUser(userId);

    if (!channel) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This channel does not exist.',
      };
    } else if (!user) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This user does not exist.',
      };
    } else if (!channel.users.has(user.id)) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You are not participating in the channel.',
      };
    }

    if (channel.owner == user.id) {
      channel.users.forEach((joinedUserId) => {
        const joined = this.getUser(joinedUserId);
        this.setUserLeave(joined, channel);
      });
    } else {
      this.setUserLeave(user, channel);
    }

    // socket message
    this.noticeToChannel(channelId, `${user.name} 님이 나가셨습니다.`);
  }

  checkCanListed(channel: Channel, userId: number): boolean {
    const isJoined = channel.users.has(userId);
    const isPrivate = channel.isPrivate;
    const isDm = channel.isDm;

    return ((isPrivate || isDm) && isJoined) || !isPrivate;
  }

  checkIsJoined(channel: Channel, userId: number): boolean {
    return channel.users.has(userId);
  }

  checkListedRange(query, channel: Channel) {
    return (
      !(query.isPublic && !channel.isPrivate && !channel.isDm) &&
      !(query.isPriv && channel.isPrivate && !channel.isDm) &&
      !(query.isDm && !channel.isPrivate && channel.isDm)
    );
  }

  list(userId: number, query) {
    const data = [];
    const channels = this.getChannelValues();

    if (!query.isPublic && !query.isPriv && !query.isDm) {
      query.isPublic = true;
    }

    channels.forEach((channel) => {
      if (
        !this.checkCanListed(channel, userId) ||
        (query.isEnter && !this.checkIsJoined(channel, userId)) ||
        this.checkListedRange(query, channel)
      ) {
        return;
      }

      const info = {
        id: channel.id,
        title: channel.title,
        isProtected: !channel.isPrivate && channel.password ? true : false,
        isPrivate: channel.isPrivate,
        isDm: channel.isDm,
        dmUserId: undefined,
        userCount: channel.users.size,
        isJoined: channel.users.has(userId),
        createdAt: channel.createdAt,
      };

      if (info.isDm) {
        channel.users.forEach((id) => {
          if (id != userId) {
            info.dmUserId = id;
            info.title = this.channelUserMap.get(id).name;
          }
        });
      }
      data.push(info);
    });

    return data;
  }

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

  getChannelInfo(userId: number, channelId: number) {
    const channel: Channel = this.getChannel(channelId);

    if (!channel) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This channel does not exist.',
      };
    } else if (!this.checkCanGetInfo(channel, userId)) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You are not authorized to this channel.',
      };
    }

    const channelInfo = {
      id: channel.id,
      title: channel.title,
      isProtected: !channel.isPrivate && channel.password ? true : false,
      isPrivate: channel.isPrivate,
      isDm: channel.isDm,
      isBlocked: channel.banned.has(userId),
      isJoined: channel.users.has(userId),
      userCount: channel.users.size,
      users: this.getChannelUsers(channelId),
      createdAt: channel.createdAt,
    };

    return channelInfo;
  }

  setChannelInfo(userId: number, channelId: number, data) {
    const channel: Channel = this.getChannel(channelId);
    const settedBy: ChannelUser = this.getUser(userId);

    if (!channel) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This channel does not exist.',
      };
    } else if (channel.isDm) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'DM channel cannot change settings.',
      };
    } else if (
      !settedBy ||
      this.getChannelUserRole(channel.id, settedBy.id) == 'normal'
    ) {
      throw {
        code: HttpStatus.FORBIDDEN,
        message: 'You do not have permission to change settings.',
      };
    } else if (!data.title) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'The title value is invalid.',
      };
    }

    channel.title = data.title;
    channel.password = data.password ? data.password : undefined;
    return;
  }

  setUserInChannel(
    userId: number,
    channelId: number,
    settedUserId: number,
    role: string
  ) {
    const channel: Channel = this.getChannel(channelId);
    const settedBy: ChannelUser = this.getUser(userId);
    const settedUser: ChannelUser = this.getUser(settedUserId);

    if (!channel) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This channel does not exist.',
      };
    } else if (!settedBy || !settedUser) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This user does not exist.',
      };
    } else if (!channel.users.has(settedBy.id)) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You not in the channel.',
      };
    } else if (!channel.users.has(settedUser.id)) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This user is not in the channel.',
      };
    } else if (channel.isDm) {
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
    } else if (role == 'normal') {
      channel.admin.delete(settedUser.id);
    }
  }

  getDms(user: ChannelUser): Channel[] {
    const data = [];

    user.joined.forEach((channelId) => {
      const channel: Channel = this.channelMap.get(channelId);
      if (channel && channel.isDm) {
        data.push(channel);
      }
    });

    return data;
  }

  initDirectMessage(userId: number, invitedUserId: number) {
    const invitedUser: ChannelUser = this.channelUserMap.get(invitedUserId);
    const user: ChannelUser = this.channelUserMap.get(userId);

    if (!user || !invitedUser) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This user does not exist.',
      };
    } else if (invitedUser.blockUser.has(userId)) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You cannot send dm to.',
      };
    }

    const dms: Channel[] = this.getDms(user);
    const found = dms.find(
      (channel) =>
        channel.users.has(user.id) && channel.users.has(invitedUserId)
    );

    if (!found) {
      const newChannel = this.createChannel({ isDm: true });
      this.joinChannel(user, newChannel);
      this.joinChannel(invitedUser, newChannel);
      return { id: newChannel.id };
    }

    return { id: found.id };
  }

  names(socket: Socket, channelId: number) {
    const channel = this.getChannel(channelId);
    if (!channel) {
      socket.emit('error', { code: 4, msg: 'This channel does not exist.' });
      return;
    }

    const data = this.getUsernameList();
    socket.emit('names', data);
  }

  invite(userId: number, channelId: number, invitedUserId: number) {
    const channel = this.channelMap.get(channelId);
    const invitedBy = this.channelUserMap.get(userId);
    const invitedUser = this.channelUserMap.get(invitedUserId);

    if (!channel) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This channel does not exist.',
      };
    } else if (!invitedUser || !invitedBy) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'This user does not exist.',
      };
    } else if (channel.isDm || !channel.isPrivate) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'You have been invited to the wrong channel.',
      };
    } else if (!channel.users.has(invitedBy.id)) {
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'The user is not in the channel.',
      };
    } else if (channel.users.has(invitedUser.id)) {
      throw {
        code: HttpStatus.CONFLICT,
        message: 'The user is already joining the channel.',
      };
    }

    invitedUser.invited.add(channel.id);

    // socket massage
    invitedUser.socket.emit('invited', { channelId: channel.id });
    this.server
      .to(String(channel.id))
      .emit('message', `${invitedUser.name} 님을 초대하였습니다.`);
  }

  kick(socket: Socket, channelId: number, userId: number) {
    const channel = this.channelMap.get(channelId);
    const tarUser = this.channelUserMap.get(userId);
    const kickedBy = this.getUserFromSocket(socket);

    if (!channel) {
      socket.emit('error', { code: 4, msg: 'This channel does not exist.' });
      return;
    }
    if (!tarUser) {
      socket.emit('error', { code: 7, msg: 'This user does not exist.' });
      return;
    }

    tarUser.socket.emit('kicked', { channelId: channel.id });
    this.noticeToChannel(
      channelId,
      `${kickedBy.name}님이 ${tarUser.name} 님을 강퇴하였습니다.`
    );
    this.server
      .to(String(channel.id))
      .emit(
        'message',
        `${kickedBy.name}님이 ${tarUser.name} 님을 강퇴하였습니다.`
      );
  }
}
