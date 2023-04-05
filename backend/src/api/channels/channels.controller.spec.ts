import { io } from 'socket.io-client';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsModule } from './channels.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { expect, jest, describe, afterEach, beforeEach, beforeAll, it, afterAll, test } from '@jest/globals';
import { ChannelsService, ChannelUser } from './channels.service';
import { ChannelClass, Channel } from './ChannelClass';
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
	blockUser: new Set(),
};

const user2: ChannelUser = {
	id: 5,
	name: 'user2',
	socket: fakeSocket,
	joined: new Set(),
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

	const removeNoticeListeners = () => {
		const listeners = socket.listeners('notice');
		listeners.forEach((listener) => socket.off('notice', listener));
	}
	
	const removeMessageListeners = () => {
		const listeners = socket.listeners('message');
		listeners.forEach((listener) => socket.off('message', listener));
	}
	
	const removeAllListeners = () => {
		socket.removeAllListeners();
	}

	const connectSocket = (done) => {
		socket.on('connect', () => {
			done();
		});
		socket = io(getSocketDsn(), {
			extraHeaders: {"cookie": `Authorization=${process.env.TEST_JWT}`}
		});
	}
	
	const initChannels = () => {
		const publicObj = service.create(user.id, publicChannelData);
		const privateObj = service.create(user.id, privateChannelData);
		channel = service.channelClass.get(publicObj.id);
		privateChannel = service.channelClass.get(privateObj.id);
	}

	const initSocketUser = () => {
		socketUser = service.getUser(1);
		socketUser.joined.forEach((channelId) => {
			service.leave(socketUser.id, channelId);
		})
	}

	beforeAll((done) => {
		
        Test.createTestingModule({
            imports: [ChannelsModule],
        }).compile()
		.then((moduleFixture: TestingModule) => {
			service = moduleFixture.get<ChannelsService>(ChannelsService);
			app = moduleFixture.createNestApplication();
			app.useWebSocketAdapter(new IoAdapter(app.getHttpServer()));
			app.init();

			service.setUser(user.id, user);
			service.setUser(user2.id, user2);
			socket = io(getSocketDsn(), {
				extraHeaders: {"cookie": `Authorization=${process.env.TEST_JWT}`}
			})
			socket.on('connect', () => {
				socketUser = service.getUser(1);
				done();
			});
		})
    });

	afterAll(() => {
		// socket.disconnect();
		// app.getHttpServer().close();
		// app.close();
	})

	describe('init', () => {
		beforeAll(() => { initSocketUser(); initChannels(); });
		afterAll(() => { removeNoticeListeners(); });
		
		it('public 채널에 유저가 참가', (done) => {	
			try {
				service.join(1, channel.id, null);
				done();
			} catch (error) {
				console.log(error);
			}
		});
	});

	describe('channel setting', () => {
		beforeAll(() => { initSocketUser(); });
		beforeEach(() => { initChannels(); });

		it('채널장이 public 채널을 protected로 수정', () => {
			const newTitle = "protected";
			service.setChannelInfo(user.id, channel.id, {
				title: newTitle,
				password: "",
			});
			expect(channel.title).toBe(newTitle);
			
			service.setChannelInfo(user.id, channel.id, {
				password: "1234",
			});
			const channelInfo = service.getChannelInfo(user.id, channel.id);
			expect(channelInfo.isProtected).toBe(true);
		});
		
		it('채널장이 protected 채널을 public으로 수정', () => {
			service.setChannelInfo(user.id, channel.id, {
				password: "1234",
			});
			const channelInfo1 = service.getChannelInfo(user.id, channel.id);
			expect(channelInfo1.isProtected).toBe(true);

			const newTitle = "public";
			service.setChannelInfo(user.id, channel.id, {
				title: newTitle,
				password: "",
			});
			expect(channel.title).toBe(newTitle);
			const channelInfo2 = service.getChannelInfo(user.id, channel.id);
			expect(channelInfo2.isProtected).toBe(false);
		});
		
		it('채널장이 private 채널의 title 수정', () => {
			const newTitle = "public";
			service.setChannelInfo(user.id, privateChannel.id, {
				title: newTitle,
			});
			expect(privateChannel.title).toBe(newTitle);
			const channelInfo = service.getChannelInfo(user.id, privateChannel.id);
			expect(channelInfo.isPrivate).toBe(true);
		});
		
		it('[error] 채널장이 private 채널의 password 수정하는 경우', () => {
			try {
				service.setChannelInfo(user.id, privateChannel.id, {
					title: "public",
					password: "1234",
				});
				expect(true).toBe(false);
			} catch (error) {
				expect(error.code).toBe(400);
			}
			expect(privateChannel.title).toBe("private");
			const channelInfo = service.getChannelInfo(user.id, privateChannel.id);
			expect(channelInfo.isPrivate).toBe(true);
		});
		it('[error] 채널장이 private 채널의 password 수정하는 경우', () => {
			try {
				service.setChannelInfo(user.id, privateChannel.id, {
					title: "public",
					password: "1234",
				});
				expect(true).toBe(false);
			} catch (error) {
				expect(error.code).toBe(400);
			}
			expect(privateChannel.title).toBe("private");
			const channelInfo = service.getChannelInfo(user.id, privateChannel.id);
			expect(channelInfo.isPrivate).toBe(true);
		});
	})

	describe('Message', () => {
		beforeAll(() => { initSocketUser(); });
		beforeEach(() => { initChannels(); });
		afterAll(() => { removeAllListeners(); });

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
		beforeAll(() => { initSocketUser(); });
		beforeEach(() => { initChannels(); });
		afterAll(() => { removeAllListeners(); });

		it('참여 중인 채널의 owner가 유저를 mute', (done) => {
			const time = new Date(new Date().getTime() + 1000);
			service.join(socketUser.id, channel.id, null);
	
			socket.on('message', (data) => {
				if (data.text == 'hello 2') {
					done();
				}
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
		beforeAll(() => { initSocketUser(); });
		beforeEach(() => { initChannels(); });
		afterAll(() => { removeAllListeners(); });

		it('채널장이 유저를 초대', (done) => {
			socket.on('invited', (data) => {
				expect(data.channelId).toBe(privateChannel.id);
				done();
			});

			try {
				service.invite(user.id, privateChannel.id, [socketUser.id, user2.id]);
			} catch(error) {
				console.log(error);
				expect(true).toBe(false);
			}
	
			const channelInfo = service.getChannelInfo(user.id, privateChannel.id);

			expect(channelInfo.userCount).toBe(3);
		});
		
		it('권한 없는 유저가 다른 유저를 초대', (done) => {
			socket.on('invited', (data) => {
				expect(data.channelId).toBe(privateChannel.id);
			});
	
			try {
				service.invite(user.id, privateChannel.id, [user2.id]);
				service.invite(user2.id, privateChannel.id, [socketUser.id]);
			} catch (error) {
				expect(error.code).toBe(403);
				done();
			}
		});
	})




});
