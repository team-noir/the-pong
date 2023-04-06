import { HttpStatus } from '@nestjs/common';

import { ChannelUser } from './ChannelUserClass';

type userId = number;
type channelId = number;

export class Channel {
	id: number;
	title?: string;
	// channelCode: string;
	password?: string;
	isPrivate: boolean;       // isPublic
	isDm: boolean;
	createdAt: Date;
	// updatedAt: Date;
	// deletedAt: Date;

	owner?: userId;           // none
	users: Set<userId>;
	admin: Set<userId>;       // none
	banned: Set<userId>;      // none
	muted: Map<userId, Date>; // none

	// messages: Message[]

	constructor(id: number, isPrivate: boolean, isDm: boolean, title?: string, password?: string) {
		this.id = id;
		this.title = title;
		this.isDm = isDm;
		this.isPrivate = isPrivate;
		this.createdAt = new Date();
		this.password = password;

		this.owner = null;
		this.users = new Set<number>();
		this.admin = new Set<number>();
		this.muted = new Map<number, Date>();
		this.banned = new Set<number>();
	}

	isUserJoinedAssert(user: ChannelUser) {
		if (!this.users.has(user.id)) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'This user is not in the channel';
			throw { code, message };
		}
	}

	isUserJoined(user: ChannelUser): boolean {
		return this.users.has(user.id);
	}
}

export class ChannelClass {
	private channelMap = new Map<channelId, Channel>();
  
	// Getter
  
	// 채널 아이디로 채널을 가져온다.
	get(channelId: number) {
	  const channel = this.channelMap.get(channelId);
  
	  if (!channel) {
		const code = HttpStatus.BAD_REQUEST;
		const message = 'This channel does not exist.';
		throw { code, message };
	  } 
	  return channel;
	}
  
	// 채널 객체를 모두 가져온다.
	getAll() {
	  return [ ...this.channelMap.values() ];
	}
  
	// 채널 중에 dm 채널만 가져온다.
	getAllDms(user: ChannelUser): Channel[] {
	  const data = [];
  
	  user.joined.forEach((channelId) => {
		const channel: Channel = this.get(channelId);
		if (channel && channel.isDm) {
		  data.push(channel);
		}
	  });
	  return data;
	}
  
	// 채널을 리스팅할 수 있는 유저인지 확인
	checkCanListed(channel: Channel, userId: number): boolean {
	  const isJoined = channel.users.has(userId);
	  const isPrivate = channel.isPrivate;
	  const isDm = channel.isDm;
  
	  return ((isPrivate || isDm) && isJoined) || !isPrivate;
	}
  
	// 채널의 상세 정보를 유저가 볼 수 있는지 확인
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
  
	// 채널이 query에서 원하는 유형인지 알려준다.
	checkListedRange(channel: Channel, query) {
	  return (
		!(query.isPublic && !channel.isPrivate && !channel.isDm) &&
		!(query.isPriv && channel.isPrivate && !channel.isDm) &&
		!(query.isDm && !channel.isPrivate && channel.isDm)
	  );
	}
  
	// Setter
  
	// 채널 추가
	addChannel(channelId: number, channel: Channel) {
	  this.channelMap.set(channelId, channel);
	}
  
	// 채널 생성
	createChannel(data) {
	  const newChannel = new Channel(
		this.channelMap.size + 1,
		data.isPrivate,
		data.isDm,
		data.title,
		data.password
	  )
	  this.addChannel(newChannel.id, newChannel);
	  return newChannel;
	}
  
	// 채널에 들어간다.
	joinChannel(user: ChannelUser, channel: Channel) {
	  user.socket.join(String(channel.id));
	  user.joined.add(channel.id);
	  channel.users.add(user.id);
	}
  }
  