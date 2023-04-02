import { io } from 'socket.io-client';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ChannelsModule } from './channels.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { expect, jest, describe, beforeEach, it, afterAll } from '@jest/globals';
import { ChannelsService, Channel, ChannelUser } from './channels.service';
import { CreateChannelDto } from './dtos/channel.dto';

const fakeSocket = {
	emit: jest.fn(),
	join: jest.fn(),
};

const user: ChannelUser = {
	id: 3,
	name: 'user',
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

describe('Chat connection', () => {
    let app: INestApplication;
	let service: ChannelsService;
	let socketUser: ChannelUser;
	let channel: Channel;
	let socket;

    const getSocketDsn = () => {
       const { port } = app.getHttpServer().listen().address();
       return `http://localhost:${port}`;
   }

    // @ts-ignore
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
		const result = service.create(user.id, publicChannelData);
		channel = service.getChannel(result.id);
    });

	beforeEach(() => {
		const noticeListeners = socket.listeners('notice');
		noticeListeners.forEach((listener) => socket.off('notice', listener));
		
		const messageListeners = socket.listeners('message');
		messageListeners.forEach((listener) => socket.off('message', listener));
	})

	afterAll(async () => {
		app.getHttpServer().close();
		socket.disconnect();
	})

    it('소켓 서버에 연결합니다.', (done) => {
        socket.on('connect', () => {
            done();
        });
    });

	it('public 채널에 유저가 참가합니다.', (done) => {
		socketUser = service.getUser(1);
        socket.on('notice', (data) => {
			expect(data.channelId).toBe(channel.id);
			expect(data.senderId).toBe(undefined);
            done();
        });

		try {
			service.join(socketUser.id, channel.id, undefined);
		} catch (error) {
			console.log(error);
		}
    });
	
	it('참여 중인 채널에서 메세지를 받습니다.', (done) => {
        socket.on('message', (data) => {
			expect(data.channelId).toBe(channel.id);
			expect(data.senderId).toBe(user.id);
			expect(data.text).toBe("hello");
            done();
        });

		service.messageToChannel(user.id, channel.id, "hello");
    });

	it('참여 중인 채널에서 메세지를 가져옵니다.', () => {
		const messages = service.getChannelMessages(socketUser.id, channel.id);
		expect(messages.length).toBe(2);
	})

	it('참여 중인 채널의 owner가 유저를 mute 시킵니다.', (done) => {
		const time = new Date(new Date().getTime() + 1000);

		// socket.on('notice', (data) => {
		// 	console.log('notice', data);
		// });

		socket.on('message', (data) => {
			const msgCreatedAt = new Date(data.createdAt);

			expect(msgCreatedAt.getTime()).toBeGreaterThan(time.getTime());
			done();
        });

		service.mute(user, channel, socketUser, 1);
		try {
			service.messageToChannel(socketUser.id, channel.id, "hello");
		} catch (error) {
			expect(error.code).toBe(403);
		}

		setTimeout(() => {
			try {
				service.messageToChannel(socketUser.id, channel.id, "hello");
			} catch (error) {
				expect(error.code).toBe(403);
			}
		}, 500)
		
		setTimeout(() => {
			try {
				service.messageToChannel(socketUser.id, channel.id, "hello");
				expect(true).toBe(true);
			} catch (error) {
				console.log(error);
			}
		}, 1500)
	})





});
