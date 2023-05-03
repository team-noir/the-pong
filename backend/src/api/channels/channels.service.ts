import { Injectable, HttpStatus } from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { CreateChannelDto, ChannelMessageDto } from './dtos/channel.dto';

import { ChannelModel, Channel } from './models/channel.model';
import { UserModel, ChannelUser } from './models/user.model';
import { MessageModel, Message } from './models/message.model';

import { PrismaService } from '@/prisma/prisma.service';

import { NOTICE_STATUS, NOTICE_STATUS_MESSAGE } from '@const';

@Injectable()
export class ChannelsService {
  @WebSocketServer() server: Server;
  public channelModel: ChannelModel;
  public userModel: UserModel;
  public messageModel: MessageModel;

  constructor(private prismaService: PrismaService) {
    this.userModel = new UserModel(this.prismaService);
    this.channelModel = new ChannelModel(this.prismaService);
    this.messageModel = new MessageModel(this.prismaService);
    this.messageModel.server = this.server;
  }

  async initModels() {
    await this.userModel.initUser();
    await this.channelModel.initChannel();
    await this.messageModel.initMessage();
    this.messageModel.initServer(this.server);
  }

  // Channel getter

  // 채널에 있는 유저를 찾는다.
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

  // 채널에 있는 유저 리스트를 가져온다.
  getUserArrayJoinedChannel(channelId: number) {
    const channel: Channel = this.channelModel.get(channelId);
    const data = [];

    channel.users.forEach((userId) => {
      if (channel.isUserBanned(userId)) {
        return;
      }
      const user = this.userModel.getUser(userId);
      const userRole = channel.getChannelUserRole(user);
      data.push({
        id: user.id,
        nickname: user.name,
        role: userRole,
        isMuted: channel.muted.has(user.id),
      });
    });
    return data;
  }

  // Controller

  async createChannel(userId: number, data: CreateChannelDto) {
    const createdBy: ChannelUser = this.userModel.getUser(userId);
    const newChannel: Channel = await this.channelModel.createChannel(
      data,
      createdBy
    );

    await this.channelModel.joinChannel(createdBy, newChannel, null);

    // socket message
    createdBy.socket.emit('message', {
      channelId: newChannel.id,
    });

    return { id: newChannel.id };
  }

  async join(userId: number, channelId: number, password?: string) {
    const channel: Channel = this.channelModel.get(channelId);
    const user: ChannelUser = this.userModel.getUser(userId);

    await this.channelModel.joinChannel(user, channel, password);
    await this.noticeToChannel(channel, NOTICE_STATUS.USER_JOIN, [user]);
  }

  async leave(userId: number, channelId: number) {
    const channel: Channel = this.channelModel.get(channelId);
    const user: ChannelUser = this.userModel.getUser(userId);

    if (channel.isDm) {
      return;
    }

    channel.checkUserJoined(user);
    await this.channelModel.leaveChannel(user, channel);
    if (channel.owner == user.id) {
      await this.noticeToChannel(channel, NOTICE_STATUS.CHANNEL_REMOVE, [user]);
      channel.users.forEach(async (joinedUserId) => {
        const joined = this.userModel.getUser(joinedUserId);
        await this.channelModel.leaveChannel(joined, channel);
      });
      this.channelModel.deleteChannel(channel);
    } else if (channel.size() == 0) {
      await this.noticeToChannel(channel, NOTICE_STATUS.CHANNEL_REMOVE, [user]);
      this.channelModel.deleteChannel(channel);
    } else {
      await this.noticeToChannel(channel, NOTICE_STATUS.USER_LEAVE, [user]);
    }
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
        channel.banned.has(userId) ||
        !this.channelModel.checkCanListed(channel, user.id) ||
        (query.isEnter && !channel.isUserJoined(user.id)) ||
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
      if (!channel.isUserBanned(userId)) {
        const user = this.userModel.getUser(id);
        const role = channel.getChannelUserRole(user);
        users.push({
          id: user.id,
          nickname: user.name,
          role: role,
          isMuted: channel.muted.has(id),
        });
      }
    });

    let title = channel.title;
    if (channel.isDm) {
      title = users.filter((user) => user.id != userId)[0].nickname;
    }

    const channelInfo = {
      id: channel.id,
      title: title,
      isProtected: !channel.isPrivate && channel.password ? true : false,
      isPrivate: channel.isPrivate,
      isDm: channel.isDm,
      isBlocked: channel.banned.has(userId),
      isJoined: users.includes(userId),
      userCount: users.length,
      users: users,
      createdAt: channel.createdAt,
    };

    return channelInfo;
  }

  setChannelInfo(userId: number, channelId: number, data) {
    const channel: Channel = this.channelModel.get(channelId);
    const settedBy: ChannelUser = this.userModel.getUser(userId);

    channel.assertCanUserEditChannel(settedBy, data.password);

    channel.title = data.title ? data.title : channel.title;
    channel.password = data.password ? data.password : null;
    return;
  }

  async setUserInChannel(
    userId: number,
    channelId: number,
    settedUserId: number,
    role: string
  ) {
    const channel: Channel = this.channelModel.get(channelId);
    const settedBy: ChannelUser = this.getUserJoinedChannel(userId, channelId);
    const settedUser: ChannelUser = this.getUserJoinedChannel(
      settedUserId,
      channelId
    );

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
      await this.noticeToChannel(channel, NOTICE_STATUS.USER_GRANT, [
        settedUser,
      ]);
    } else if (role == 'normal') {
      channel.admin.delete(settedUser.id);
      await this.noticeToChannel(channel, NOTICE_STATUS.USER_REVOKE, [
        settedUser,
      ]);
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
        title: 'Direct Message',
        isDm: true,
      });
      this.channelModel.joinChannel(user, newChannel, null);
      this.channelModel.joinChannel(invitedUser, newChannel, null);
      return { id: newChannel.id };
    }

    return { id: found.id };
  }

  async invite(userId: number, channelId: number, invitedUserId: number[]) {
    const channel = this.channelModel.get(channelId);
    const invitedBy = this.getUserJoinedChannel(userId, channelId);
    const role = channel.getChannelUserRole(invitedBy);

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

    if (invitedUserId.length == 1) {
      const invitedUser = this.userModel.getUser(invitedUserId[0]);
      this.channelModel.inviteChannel(invitedUser, channel);

      // socket massage
      if (invitedUser.socket) {
        invitedUser.socket.emit('invited', { channelId: channel.id });
      }
      await this.noticeToChannel(channel, NOTICE_STATUS.USER_INVITE, [
        invitedUser,
      ]);
      return;
    }

    const users: ChannelUser[] = [];

    invitedUserId.forEach((id) => {
      const invitedUser = this.userModel.getUser(id);
      this.channelModel.inviteChannel(invitedUser, channel);
      users.push(invitedUser);

      // socket massage
      if (invitedUser.socket) {
        invitedUser.socket.emit('invited', { channelId: channel.id });
      }
    });

    await this.noticeToChannel(channel, NOTICE_STATUS.USER_INVITE, users);
  }

  async setUserStatus(
    userId: number,
    channelId: number,
    settedUserId: number,
    status: string
  ) {
    const channel: Channel = this.channelModel.get(channelId);
    const user: ChannelUser = this.getUserJoinedChannel(userId, channelId);
    const settedUser: ChannelUser = this.getUserJoinedChannel(
      settedUserId,
      channelId
    );

    if (status == 'kick') {
      await this.noticeToChannel(channel, NOTICE_STATUS.USER_KICK, [
        settedUser,
      ]);
      await this.channelModel.kick(user, channel, settedUser);
    } else if (status == 'ban') {
      if (!channel.banned.has(settedUser.id)) {
        await this.noticeToChannel(channel, NOTICE_STATUS.USER_BAN, [
          settedUser,
        ]);
        await this.channelModel.ban(user, channel, settedUser);
      }
    } else if (status == 'mute') {
      if (!channel.muted.has(settedUser.id)) {
        await this.noticeToChannel(channel, NOTICE_STATUS.USER_MUTE, [
          settedUser,
        ]);
        await this.channelModel.mute(user, channel, settedUser, 30);
        setTimeout(async () => {
          await this.noticeToChannel(channel, NOTICE_STATUS.USER_UNMUTE, [
            settedUser,
          ]);
        }, 30000);
      }
    }
  }

  getChannelMessages(user: ChannelUser, channel: Channel): ChannelMessageDto[] {
    channel.checkUserJoined(user);

    const data = [];
    this.messageModel.getAllMessages().forEach((message) => {
      const sender = message.senderId
        ? this.userModel.getUser(message.senderId)
        : null;

      if (message.channelId == channel.id) {
        const tarMessage = new ChannelMessageDto(
          message.id,
          message.text,
          sender,
          message.isLog
        );
        data.push(tarMessage);
      }
    });
    return data;
  }

  // 채널에 메세지를 보낸다.
  async messageToChannel(
    user: ChannelUser,
    channel: Channel,
    message: string
  ): Promise<Message> {
    channel.checkUserJoined(user);
    channel.checkUserMuted(user);

    // TODO: unmute 체크 지점을 서버의 타이머로 변경
    this.channelModel.unmute(channel, user);

    const newMessage = await this.messageModel.createMessage(
      channel,
      message,
      user
    );
    this.messageModel.sendMessage(channel, newMessage, user);
    return newMessage;
  }

  // 채널에 공지를 보낸다.
  async noticeToChannel(channel: Channel, code: number, users: ChannelUser[]) {
    for (const user of users) {
      const newMessage = await this.messageModel.createMessage(
        channel,
        user.name + ' ' + NOTICE_STATUS_MESSAGE[code]
      );
      await this.messageModel.sendNotice(channel.id, code, newMessage, users);
    }
  }

  // 유저 정보가 변경되었음을 유저가 속한 모든 채널에 알린다.
  async informToAllChannel(userId: number) {
    const user = this.userModel.getUser(userId);
    const channels = user.joined.keys();

    for (const channelId of channels) {
      await this.server.to(String(channelId)).emit('user', {});
    }
  }

}
