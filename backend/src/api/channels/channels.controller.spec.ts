import { io } from 'socket.io-client';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ChannelsModule } from './channels.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { expect, jest, describe, beforeEach, it, afterAll } from '@jest/globals';
import { ChannelsService, ChannelUser } from './channels.service';
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
	password: undefined,
};

describe('Chat connection', () => {
    let app: INestApplication;
	let service: ChannelsService;
	let socket, channel;

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
				"cookie": "Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJjcGFrIiwiaWF0IjoxNjgwMjQzMTQ0LCJleHAiOjE2ODAyNDY3NDR9.L3liN0o6rRVoVvDVtjX1P8ELCQ3eh5P94FnaoJjVg98"
			}
		});
    });

	afterAll(async () => {
		app.getHttpServer().close();
		socket.disconnect();
	})

    it('I can connect to the socket server', (done) => {
        socket.on('connect', () => {
            done();
        });
    });

	it('I can connect to the socket server', (done) => {
        socket.on('message', (data) => {
            done();
        });

		service.setUser(user.id, user);
		channel = service.create(user.id, publicChannelData);
		service.join(1, channel.id, undefined);
    });
	
	it('I can connect to the socket server', (done) => {
		socket.off('message', socket.listeners('message')[0]);
        socket.on('message', (data) => {
			expect(data.channelId).toBe(channel.id);
			expect(data.sender.id).toBe(user.id);
			expect(data.text).toBe("hello");
            done();
        });

		service.messageToChannel(user.id, channel.id, "hello");
    });

	it('get message', () => {
		const messages = service.getChannelMessages(1, 0);
		expect(messages.length).toBe(2);
	})





});
