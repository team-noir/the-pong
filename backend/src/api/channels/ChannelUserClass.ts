import { Socket } from 'socket.io';
import { HttpStatus } from '@nestjs/common';
import { Channel } from './ChannelClass';

type userId = number;
type channelId = number;

export interface ChannelUser {
	id: number;
	name: string;               // nickname: string
  
	joined: Set<channelId>;     // channels: channel
	blockUser: Set<channelId>;  // blockeds: user
  
	socket;
}

export class ChannelUserClass {
	private channelUserMap = new Map<userId, ChannelUser>();
  
	// Getter
  
	has(userId: number): boolean {
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
  
	// Setter
  
  
	setUser(userId: number, user: ChannelUser): void {
	  this.channelUserMap.set(userId, user);
	}
  
	setUserLeave(user: ChannelUser, channel: Channel) {
	  user.socket.leave(String(channel.id));
	  user.joined.delete(channel.id);
	  channel.users.delete(user.id);
	  channel.admin.delete(user.id);
	}
  
  
  
  }
