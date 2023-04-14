import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, jest } from '@jest/globals';
import { GamesService, Player } from './games.service';
import { SocketServerMock } from 'socket.io-mock-ts';
import { AppGatway } from '../../app.gateway';
import { ChannelsModule } from '../channels/channels.module';
import { AuthModule } from '../auth/auth.module';
import { GamesModule } from './games.module';

import { io } from 'socket.io-client';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';






class FakeServer {
	private events = new Map();

	on(event: string, listener: (data) => void) {
		this.events.set(event, listener);
	}

	emit(event: string, data) {
		console.log('server: ', event, data);

		this.events.get(event)(data);
	}
};

class FakeSocket {
	private server;

	constructor(server) {
		this.server = server;
	}

	emit(event: string, data) {
		console.log('client: ', event, data);

		if (event == 'ping') {
			this.server.emit('pong', data);
		}
	};
	join = jest.fn();
	leave = jest.fn();
}

const fakeServer = new FakeServer();
const player1 = new Player(1, new FakeSocket(fakeServer));
const player2 = new Player(2, new FakeSocket(fakeServer));
const player3 = new Player(3, new FakeSocket(fakeServer), [1]);


it('Test Ping', (done) => {
	// jest.useFakeTimers();

	let app: INestApplication;
	let socket;

	let service;

	Test.createTestingModule({
		imports: [
			AuthModule,
			ChannelsModule,
			GamesModule,
		],
		providers: [AppGatway]
	  })
		.compile()
		.then((moduleFixture: TestingModule) => {
			const gateway = moduleFixture.get<AppGatway>(AppGatway);
			service = gateway.gamesService;
			app = moduleFixture.createNestApplication();
			app.useWebSocketAdapter(new IoAdapter(app.getHttpServer()));
			app.init();
	
			socket = io(`http://localhost:${app.getHttpServer().listen().address()}`, {
			extraHeaders: { cookie: `Authorization=${process.env.TEST_JWT}` },
			});
			socket.on('connect', () => {
				console.log("--------------------");
			done();
			});
		});
	

	// jest.spyOn(service.gameModel, 'sendPingToAllPlayers');
	// jest.spyOn(player1.socket, 'emit');

	// jest.advanceTimersByTime(10000);
	// expect(service.gameModel.sendPingToAllPlayers).toHaveBeenCalledTimes(2);
	
	// const gameId = (service.addUserToQueue(player1, false));
	// console.log('gameId: ', gameId);

	// jest.advanceTimersByTime(10000);
	// expect(player1.socket.emit).toHaveBeenCalledTimes(2);
});

it ('Test matched', async () => {
	jest.useFakeTimers();
	
	const module: TestingModule = await Test.createTestingModule({
		providers: [GamesService],
	}).compile();
	const service = module.get<GamesService>(GamesService);
	service.init(fakeServer);

	jest.spyOn(service.gameModel, 'sendPingToAllPlayers');
	jest.spyOn(player1.socket, 'emit');

	jest.advanceTimersByTime(10000);
	expect(service.gameModel.sendPingToAllPlayers).toHaveBeenCalledTimes(2);
	
	const gameId = (service.addUserToQueue(player1, false));

	jest.advanceTimersByTime(10000);
	expect(player1.socket.emit).toHaveBeenCalledTimes(2);

	
});
