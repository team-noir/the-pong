import { ChannelModel, Channel } from './channel.model';
import { UserModel, ChannelUser } from './user.model';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HttpStatus } from '@nestjs/common';
import { ChannelMessageDto } from '../dtos/channel.dto'

import { PrismaService } from '../../../prisma/prisma.service'

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

	constructor(id: number, text: string, createdAt: Date, channel: userId, sender?: channelId) {
		this.id = id;
		this.text = text;
		this.createdAt = createdAt;
		this.channelId = channel;
		this.senderId = sender;
		this.isLog = sender ? false : true;
	}
}
  
export class MessageModel {
	private messageMap = new Map<messageId, Message>();
	@WebSocketServer() server: Server;

	constructor(private prismaService: PrismaService) {}
  
	async initServer(server: Server) {
	  this.server = server;
		const dbMessages = await this.prismaService.message.findMany({
			select: {
				id: true, 
				text: true,
				createdAt: true,
				senderId: true,
				channelId: true
			}
		});

		dbMessages.forEach((dbMessage) => {
			const message = new Message(
				dbMessage.id,
				dbMessage.text,
				dbMessage.createdAt,
				dbMessage.channelId,
				dbMessage.senderId,
			)
			this.messageMap.set(message.id, message);
		})

	}
  
	// 채널에 공지를 보낸다.
	async noticeToChannel(channel: Channel, message: string): Promise<Message> {
		const created = await this.prismaService.message.create({
			data: {
				senderId: null,
				channelId: channel.id,
				text: message
			}
		});

		const newMessage: Message = {
			id: created.id,
			senderId: null,
			channelId: channel.id,
			isLog: true,
			text: created.text,
			createdAt: created.createdAt,
		};
		this.messageMap.set(newMessage.id, newMessage);

		// socket message
		if (!this.server) { return; }
		this.server.to(String(channel.id)).emit('notice', {
			id: newMessage.id,
			channelId: newMessage.channelId,
			text: newMessage.text,
			createdAt: newMessage.createdAt,
		});
		return newMessage;
	}
  
	// 채널에 메세지를 보낸다.
	async messageToChannel(
	  user: ChannelUser,
	  channel: Channel,
	  message: string
	): Promise<Message> {
	  channel.checkUserJoined(user);
  
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

	const created = await this.prismaService.message.create({
		data: {
			senderId: user.id,
			channelId: channel.id,
			text: message
		}
	});
  
	const newMessage: Message = {
		id: created.id,
		senderId: null,
		channelId: channel.id,
		isLog: false,
		text: created.text,
		createdAt: created.createdAt,
	};

	  this.messageMap.set(newMessage.id, newMessage);
  
	  // socket message
	  this.server.to(String(channel.id)).emit('message', {
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

	getAllMessages() {
		return [...this.messageMap.values()];
	}
  
  
  }
