import { ChannelModel, Channel } from './channel.model';
import { UserModel, ChannelUser } from './user.model';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { HttpStatus } from '@nestjs/common';
import { ChannelMessageDto } from '../dtos/channel.dto'

type messageId = number;

export interface Message {
	id: number;
	text: string;
	createdAt: Date;
	sender: ChannelUser;
	channel: Channel;
	isLog: boolean;
}
  
export class MessageModel {
	private messageMap = new Map<messageId, Message>();
	@WebSocketServer() server: Server;
  
	initServer(server: Server) {
	  this.server = server;
	}
  
	// 채널에 공지를 보낸다.
	noticeToChannel(channel: Channel, message: string): Message {
  
	  const newMessage: Message = {
		id: this.messageMap.size + 1,
		sender: null,
		channel: channel,
		isLog: true,
		text: message,
		createdAt: new Date(),
	  };
	  this.messageMap.set(newMessage.id, newMessage);
  
	  // socket message
	  this.server.to(String(channel.id)).emit('notice', {
		id: newMessage.id,
		channelId: newMessage.channel.id,
		text: newMessage.text,
		createdAt: newMessage.createdAt,
	  });
	  return newMessage;
	}
  
	// 채널에 메세지를 보낸다.
	messageToChannel(
	  user: ChannelUser,
	  channel: Channel,
	  message: string
	): Message {
	  channel.isUserJoinedAssert(user);
  
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
		sender: user,
		channel: channel,
		isLog: false,
		text: message,
		createdAt: new Date(),
	  };
	  this.messageMap.set(newMessage.id, newMessage);
  
	  // socket message
	  this.server.to(String(channel.id)).emit('message', {
		id: newMessage.id,
		channelId: newMessage.channel.id,
		senderId: user.id,
		senderNickname: user.name,
		isLog: newMessage.isLog,
		text: newMessage.text,
		createdAt: newMessage.createdAt,
	  });
  
	  return newMessage;
	}
  
	// Message getter
  
	getChannelMessages(user: ChannelUser, channel: Channel): ChannelMessageDto[] {
	  channel.isUserJoinedAssert(user);
  
	  const data = [];
	  [ ...this.messageMap.values() ].forEach((message) => {
		if (message.channel.id == channel.id) {
		  const tarMessage = new ChannelMessageDto(
			message.id,
			message.text,
			message.sender,
			message.isLog
		  )
		  data.push(tarMessage);
		}
	  });
	  return data;
	}
  
  
  }
