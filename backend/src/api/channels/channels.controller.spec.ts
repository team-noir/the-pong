import { io } from 'socket.io-client';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ChannelsModule } from './channels.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { expect, jest, describe, afterEach, beforeEach, beforeAll, it, afterAll } from '@jest/globals';
import { ChannelsService, Channel, ChannelUser } from './channels.service';
import { CreateChannelDto } from './dtos/channel.dto';

const fakeSocket = {
	emit: jest.fn(),
	join: jest.fn(),
	leave: jest.fn(),
};

const user: ChannelUser = {
	id: 3,
	name: 'user',
	socket: fakeSocket,
	joined: new Set(),
	invited: new Set(),
	blockUser: new Set(),
};

const user2: ChannelUser = {
	id: 5,
	name: 'user2',
	socket: fakeSocket,
	joined: new Set(),
	invited: new Set(),
	blockUser: new Set(),
};

const publicChannelData: CreateChannelDto = {
	title: 'public',
	isPrivate: false,
	password: null,
};

const privateChannelData: CreateChannelDto = {
	title: 'private',
	isPrivate: true,
	password: null,
  };

describe('Chat connection', () => {
    let app: INestApplication;
	let service: ChannelsService;
	let socketUser: ChannelUser;
	let channel: Channel;
	let privateChannel: Channel;
	let socket;

    const getSocketDsn = () => {
       const { port } = app.getHttpServer().listen().address();
       return `http://localhost:${port}`;
   }

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [ChannelsModule],
        }).compile();

		service = moduleFixture.get<ChannelsService>(ChannelsService);
        app = moduleFixture.createNestApplication();
        app.useWebSocketAdapter(new IoAdapter(app.getHttpServer()));
        await app.init();

		socket = io(getSocketDsn(), {
			extraHeaders: {
				"cookie": `Authorization=${process.env.TEST_JWT}`
			}
		});

		service.setUser(user.id, user);
		service.setUser(user2.id, user2);
    });

	beforeEach(() => {
		const noticeListeners = socket.listeners('notice');
		noticeListeners.forEach((listener) => socket.off('notice', listener));
		
		const messageListeners = socket.listeners('message');
		messageListeners.forEach((listener) => socket.off('message', listener));

		const result = service.create(user.id, publicChannelData);
		channel = service.getChannel(result.id);
		
		const result2 = service.create(user.id, privateChannelData);
		privateChannel = service.getChannel(result2.id);
	})

	afterAll(async () => {
		app.getHttpServer().close();
		socket.disconnect();
	})

	describe('init', () => {
		it('소켓 서버에 연결', (done) => {
			socket.on('connect', () => {
				socketUser = service.getUser(1);
				done();
			});
		});
	
		it('public 채널에 유저가 참가', (done) => {
			socket.on('notice', (data) => {
				expect(data.channelId).toBe(channel.id);
				expect(data.senderId).toBe(undefined);
				done();
			});
	
			try {
				service.join(socketUser.id, channel.id, null);
			} catch (error) {
				console.log(error);
			}
		});
	});

	describe('Message', () => {
		it('참여 중인 채널에서 메세지 수신', (done) => {
			socket.on('message', (data) => {
				expect(data.channelId).toBe(channel.id);
				expect(data.senderId).toBe(user.id);
				expect(data.text).toBe("hello");
				done();
			});
	
			service.join(socketUser.id, channel.id, null);
			service.messageToChannel(user.id, channel.id, "hello");
		});
	
		it('참여 중인 채널에서 메세지를 가져오기', () => {
			service.join(socketUser.id, channel.id, null);
			service.messageToChannel(user.id, channel.id, "hello");
	
			const messages = service.getChannelMessages(socketUser.id, channel.id);
			expect(messages.length).toBe(2);
		})
	});
	
	describe('mute', () => {

		it('참여 중인 채널의 owner가 유저를 mute', (done) => {
			const time = new Date(new Date().getTime() + 1000);
			service.join(socketUser.id, channel.id, null);
	
			socket.on('notice', (data) => {
				console.log(data);
			})
	
			socket.on('message', (data) => {
				
				console.log(data);
	
				done();
			});
	
			service.mute(user, channel, socketUser, 1);
			try {
				service.messageToChannel(socketUser.id, channel.id, "hello 0");
			} catch (error) {
				expect(error.code).toBe(403);
			}
	
			setTimeout(() => {
				try {
					service.messageToChannel(socketUser.id, channel.id, "hello 1");
				} catch (error) {
					expect(error.code).toBe(403);
				}
			}, 500)
			
			setTimeout(() => {
				try {
					service.messageToChannel(socketUser.id, channel.id, "hello 2");
				} catch (error) {
					expect(error.code).toBe(false);
				}
			}, 2000)
		})
	});

	describe('invite', () => {

		it('채널장이 유저를 초대', (done) => {
			socket.on('invited', (data) => {
				expect(data.channelId).toBe(privateChannel.id);
				done();
			});
			service.invite(user.id, privateChannel.id, [socketUser.id, user2.id]);
	
			const channelInfo = service.getChannelInfo(user.id, channel.id);
			expect(channelInfo.userCount).toBe(1);
			expect(socketUser.invited.size).toBe(1);
			expect(user2.invited.size).toBe(1);
		});
		
		it('권한 없는 유저가 다른 유저를 초대', (done) => {
			socket.on('invited', (data) => {
				console.log(data);
				expect(data.channelId).toBe(privateChannel.id);
			});
	
			service.invite(user.id, privateChannel.id, [user2.id]);
			service.join(user2.id, privateChannel.id, null);
	
			try {
				service.invite(user2.id, privateChannel.id, [socketUser.id]);
			} catch (error) {
				console.log(error);
				expect(error.code).toBe(403);
				done();
			}
		});
	})




});
