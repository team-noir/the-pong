import { ChannelModel, Channel } from './channel.model';
import { UserModel, ChannelUser } from './user.model';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HttpStatus } from '@nestjs/common';
import { ChannelMessageDto } from '../dtos/channel.dto';

import { PrismaService } from '../../../prisma/prisma.service';

type messageId = number;
type userId = number;
type channelId = number;

export class Message {
  id: number;
  text: string;
  createdAt: Date;
  senderId: userId;
  channelId: channelId;
  isLog: boolean;

  constructor(
    id: number,
    text: string,
    createdAt: Date,
    channelId: channelId,
    senderId?: userId
  ) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.channelId = channelId;
    this.senderId = senderId;
    this.isLog = senderId ? false : true;
  }
}

export class MessageModel {
  private messageMap = new Map<messageId, Message>();
  @WebSocketServer() server: Server;

  constructor(private prismaService: PrismaService) {}

  initServer(server: Server) {
    this.server = server;
  }

  async initMessage() {
    const dbMessages = await this.prismaService.message.findMany({
      select: {
        id: true,
        text: true,
        createdAt: true,
        senderId: true,
        channelId: true,
      },
    });

    dbMessages.forEach((dbMessage) => {
      const message = new Message(
        dbMessage.id,
        dbMessage.text,
        dbMessage.createdAt,
        dbMessage.channelId,
        dbMessage.senderId
      );
      this.addMessage(message);
    });
  }

  addMessage(message: Message) {
    this.messageMap.set(message.id, message);
  }

  async createMessage(channel: Channel, text: string, sender?: ChannelUser) : Promise<Message> {
    const created = await this.prismaService.message.create({
      data: {
        senderId: sender ? sender.id : null,
        channelId: channel.id,
        text: text,
      },
    });

    const newMessage: Message = {
      id: created.id,
      senderId: null,
      channelId: sender ? sender.id : null,
      isLog: false,
      text: created.text,
      createdAt: created.createdAt,
    };

    this.addMessage(newMessage);
    return newMessage;
  }

  sendMessage(channel: Channel, message: Message, sender?: ChannelUser) {
    this.server.to(String(channel.id)).emit('message', {
      id: message.id,
      channelId: message.channelId,
      senderId: sender ? sender.id : null,
      senderNickname: sender ? sender.name : null,
      isLog: message.isLog,
      text: message.text,
      createdAt: message.createdAt,
    });
  }

  getAllMessages() {
    return [...this.messageMap.values()];
  }
}
