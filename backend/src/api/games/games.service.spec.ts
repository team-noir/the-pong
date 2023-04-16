import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, jest, beforeAll, afterAll } from '@jest/globals';
import { GamesService } from './games.service';
import { AppGateway } from '../../app.gateway';
import { ChannelsModule } from '../channels/channels.module';
import { AuthModule } from '../auth/auth.module';
import { GamesModule } from './games.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { Player } from './dtos/player.dto';

import { SocketServerMock } from 'socket.io-mock-ts';
import { AppModule } from '../../app.module';

import { createServer } from 'http';
import { Server } from 'socket.io';
import { io } from 'socket.io-client';
import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

it('socket', () => {
	const socket = new SocketServerMock();

	socket.on('message', (message: string) => {
	  expect(message).toBe('Hello World!');
	});
  
	socket.clientMock.emit('message', 'Hello World!');
})



const getSocketDsn = (app: INestApplication) => {
	const { port } = app.getHttpServer().listen().address();
	return `http://localhost:${port}`;
};

let app: INestApplication;
let clientSocket;
let server;
let adapter;

afterAll(async () => {
	console.log('disconnect')
	await clientSocket.disconnect(true);
	await clientSocket.close();
	await app.close();
	await adapter.close();
	await server.close();
});

it('Text socket', (done) => {
	let module: TestingModule;

	Test.createTestingModule({
		imports: [AppModule]
	})
	.compile()
	.then((moduleFixture: TestingModule) => {
		module = moduleFixture;

		app = moduleFixture.createNestApplication();
		server = app.getHttpServer();
		adapter = new IoAdapter(server);
		app.useWebSocketAdapter(adapter);
		app.init();

		const address = getSocketDsn(app);
		clientSocket = io(address, {
			extraHeaders: { cookie: `Authorization=${process.env.TEST_JWT}` }
		});

		clientSocket.on('connect', () => {
			done();
		});



		// socket.on('connect', (socket) => {
		// 	serverSocket = socket;
		// 	done();
		// });
	});

	
	

	// const httpServer = createServer();
	// io = new Server(httpServer);

	// httpServer.listen(() => {
	// 	const address = httpServer.address();

	// 	clientSocket = new Client(`http://localhost:${address['port']}`);
		
	// 	io.on("connection", (socket) => {
	// 		serverSocket = socket;
	// 	});

	// 	clientSocket.on("connect", done);
	// });
  
	// afterAll(() => {
	//   io.close();
	//   clientSocket.close();
	// });



});
