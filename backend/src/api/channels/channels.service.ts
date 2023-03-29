import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';

// 'public'이면서 비밀번호가 있는 경우 protected
export interface Channel {
  id: number;
  title: string;
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
  socket: Socket;

  joined: Set<number>;
  invited: Set<number>;
}

export interface Message {
  id: number;
  senderId: number;
  channelId: number;
  isLog: boolean;
  text: string;
  createdAt: Date;
}

@Injectable()
export class ChannelsService {
  @WebSocketServer() server: Server;
  private logger = new Logger('Gateway');
  private channelMap = new Map<number, Channel>(); // <channelId, Channel>
  private channelUserMap = new Map<number, ChannelUser>(); // <userId, ChannelUser>
  private messageMap = new Map<number, Message>(); // <messageId, Message>

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
    var data = [];

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

    var data = [];
    [...this.messageMap.values()].forEach((message) => {
      if (message.channelId == channelId) {
        data.push({
          senderId: message.senderId,
          isLog: message.isLog,
          text: message.text,
          createdAt: message.createdAt,
        });
      }
    });

    return data;
  }

  create(userId: number, data) {
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

    const newChannelId: number = this.channelMap.size;
    const newChannel: Channel = {
      id: newChannelId,
      title: data.title,
      isDm: data.isDm ? true : false,
      isPrivate: data.isPrivate ? true : false,
      createdAt: new Date(),
      password: data.password ? data.password : undefined,

      owner: createdBy.id,
      users: new Set<number>().add(createdBy.id),
      admin: new Set<number>(),
      muted: new Set<number>(),
      banned: new Set<number>(),
    };

    this.channelMap.set(newChannelId, newChannel);
    createdBy.socket.join(String(newChannelId));
    createdBy.socket.emit('message', {
      channelId: newChannelId,
    });

    return { id: newChannelId };
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

    user.socket.join(String(channelId));
    user.joined.add(channel.id);
    channel.users.add(user.id);

    // socket message
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

  list(channelId: number) {
    var data = [];
    const channels = this.getChannelValues();

    channels.forEach((channel) => {
      if (!channelId || (channelId && channel.id == channelId)) {
        data.push({
          id: channel.id,
          name: channel.title,
          isProtected: !channel.isPrivate && channel.password,
          isPrivate: channel.isPrivate,
          isDm: channel.isDm,
          createdAt: channel.createdAt,
        });
      }
    });

    return data;
  }

  getChannelInfo(channelId: number) {
    const channel: Channel = this.getChannel(channelId);
    if (!channel) {
      throw new Error('This channel does not exist.');
    }

    var channelInfo = {
      id: channel.id,
      title: channel.title,
      isProtected: !channel.isPrivate && channel.password,
      isPrivate: channel.isPrivate,
      isDm: channel.isDm,
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
      throw { code: HttpStatus.BAD_REQUEST, message: 'This channel is dm' };
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