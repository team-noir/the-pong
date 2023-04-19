import { Test, TestingModule } from '@nestjs/testing';
import { describe, it, expect, jest, beforeAll, afterAll, afterEach } from '@jest/globals';
import { GamesService } from './games.service';
import { AppGateway } from '@/app.gateway';
import { ChannelsModule } from '../channels/channels.module';
import { AuthModule } from '../auth/auth.module';
import { GamesModule } from './games.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { Player } from './dtos/player.dto';
import { AppModule } from '@/app.module';

import { io } from 'socket.io-client';
import { INestApplication } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';

const jwt1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJjcGFrIiwiaWF0IjoxNjgwMjQzMTQ0LCJleHAiOjE2ODAyNDY3NDR9.L3liN0o6rRVoVvDVtjX1P8ELCQ3eh5P94FnaoJjVg98";
const jwt2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwibmlja25hbWUiOiJjcGFrIiwiaWF0IjoxNjgwMjQzMTQ0LCJleHAiOjE2ODAyNDY3NDR9.3R1NiWi5NXqSwCFYSRdmcaXIvGb6UFM9DKQg9qteYE8";
const jwt3 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywibmlja25hbWUiOiJjcGFrIiwiaWF0IjoxNjgwMjQzMTQ0LCJleHAiOjE2ODAyNDY3NDR9.ZT9J8Oku9BMm7nezrxJzbFv8MYgBjeMO4y0ihSUqnjY";

// it('Test socket', (done) => {
// 	let module: TestingModule;
// 	let app: INestApplication;
// 	let clientSocket;
// 	let server, serverAddr;
// 	let adapter;
	
// 	Test.createTestingModule({
// 		imports: [AppModule]
// 	})
// 	.compile()
// 	.then((moduleFixture: TestingModule) => {
// 		module = moduleFixture;

// 		app = moduleFixture.createNestApplication();
// 		server = app.getHttpServer();
// 		serverAddr = `http://localhost:${server.listen().address().port}`;
// 		adapter = new IoAdapter(server);
// 		app.useWebSocketAdapter(adapter);
// 		app.init();

// 		clientSocket = io(serverAddr, {
// 			extraHeaders: { cookie: `Authorization=${jwt1}` }
// 		});

// 		clientSocket.on('connect', () => {
// 			clientSocket.disconnect(true);
// 			done();
// 		});
// 	});
// });

const connectSocket = (serverAddr: string, jwt) => {
	const clientSocket = io(serverAddr, {
		extraHeaders: { cookie: `Authorization=${jwt}` }
	});

	clientSocket.on('connect', () => { 
	});
	return clientSocket;
}

describe('Test invite', () => {
	let gamesService;
	let app, server;
	let serverAddr;

	let socket1, socket2, socket3;

	let invitedGameId;

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		gamesService = module.get<GamesService>(GamesService);
		app = module.createNestApplication();
		server = app.getHttpServer();
		serverAddr = `http://localhost:${server.listen().address().port}`;
		app.useWebSocketAdapter(new IoAdapter(server));
		await app.init();
		gamesService.clearPingInverval();
	});

	afterEach(async () => {
		if (socket1) { 
			await socket1.off('gameInvite'); 
			await socket1.off('gameStatus'); 
			await socket1.off('queue'); 
		};
		if (socket2) { 
			await socket2.off('gameInvite'); 
			await socket2.off('gameStatus'); 
			await socket2.off('queue'); 
		};
		if (socket3) { 
			await socket3.off('gameInvite'); 
			await socket3.off('gameStatus'); 
			await socket3.off('queue'); 
		};
	})

	afterAll(async () => {
		if (socket1) { await socket1.close(); }
		if (socket2) { await socket2.close(); }
		if (socket3) { await socket3.close(); }
		await server.close();
		await app.close();
	});

	it('Invite unconnected user', (done) => {
		socket1 = connectSocket(serverAddr, jwt1);
		socket1.on('ping', () => {
			console.log('ping : 1');
			socket1.emit('pong');
		});

		socket1.on('gameInvite', (data) => {
			done();
		});

		socket1.emit('gameInvite', { userId: 2 });
	});

	it('Invite user', (done) => {
		socket2 = connectSocket(serverAddr, jwt2);
		socket2.on('ping', () => {
			console.log('ping : 2');
			socket2.emit('pong');
		});

		socket1.on('gameInvite', (data) => {
			console.log(data);
		});
		
		socket2.on('connect', () => {
			socket1.emit('gameInvite', { userId: 2 });
		})

		socket2.on('gameInvite', (data) => {
			expect(data.user.id).toBe(1);
			invitedGameId = data.gameId;
			done();
		});
	});

	it('Reject invitation', (done) => {
		socket1.on('queue', (data) => {
			expect(data.text).toBe('rejected');
			done();
		});

		socket2.emit('gameInviteAnswer', {
			gameId: invitedGameId,
			isAccepted: false,
		});
	});

	it('Check game status', (done) => {
		socket1.on('gameStatus', (data) => {
			expect(data.games.length).toBe(0);
			expect(data.players.length).toBe(0);
			expect(data.queue.length).toBe(0);
			done();
		})
		socket1.emit('gameStatus');
	});

	it('Cancel invitation', (done) => {
		socket2.on('gameInvite', (data) => {
			if (data.text == 'invited') {
				expect(data.user.id).toBe(1);
				socket1.emit('cancelInvite');
			}
			if (data.text == 'canceled') {
				done();
			}
		});
		socket1.emit('gameInvite', { userId: 2 });
	})
	
	it('Timeout invitation', (done) => {
		gamesService.gameModel.setReadyTime(3000);
		socket1.on('gameInvite', (data) => {
			expect(data.text).toBe('canceled');
			gamesService.gameModel.setReadyTime(60000);
			done();
		});

		socket2.on('gameInvite', (data) => {
			if (data.text == 'invited') {
				expect(data.user.id).toBe(1);
				invitedGameId = data.gameId;
			}
		});

		socket1.emit('gameInvite', { userId: 2 });
	})

	it('Accept invalid invitation', (done) => {
		socket2.on('gameInvite', (data) => {
			expect(data.code).toBe(400);
			done();
		});

		socket2.emit('gameInviteAnswer', {
			gameId: invitedGameId,
			isAccepted: true,
		});
	});

	it('Check game status', (done) => {
		socket1.on('gameStatus', (data) => {
			expect(data.games.length).toBe(0);
			expect(data.players.length).toBe(0);
			expect(data.queue.length).toBe(0);
			done();
		})
		socket1.emit('gameStatus');
	});

	it('Accept valid invitation', (done) => {		
		socket2.on('gameInvite', (data) => {
			invitedGameId = data.gameId;
			if (data.text == 'invited') {
				socket2.emit('gameInviteAnswer', {
					gameId: invitedGameId,
					isAccepted: true
				});
			}
		});

		socket1.on('queue', (data) => {
			expect(data.gameId).toBe(invitedGameId);
			socket1.emit('gameStatus');
		});

		socket1.on('gameStatus', async (data) => {
			expect(data.games.length).toBe(1);
			expect(data.players.length).toBe(2);
			expect(data.queue.length).toBe(0);
			await socket1.emit('removeQueue');
			done();
		})

		socket1.emit('gameInvite', { userId: 2 });
	});

	it('Game status', (done) => {
		socket1.on('gameStatus', (data) => {
			console.log(data);
			done();
		});
		socket1.emit('gameStatus');
	});

	// it('Blocked invited', async (done) => {
	// 	console.log('blocked');

	// 	socket2.on('gameInvite', (data) => {
	// 		console.log('socket2', data);
	// 		done();
	// 	});
		
	// 	socket1.on('gameInvite', (data) => {
	// 		console.log('socket1', data);
	// 		done();
	// 	});

	// 	await socket1.emit('addBlocked', { userId: 2 });
	// 	await socket1.emit('gameInvite', { userId: 2 });
	// });

	// it('Game status', (done) => {
	// 	socket1.on('gameStatus', (data) => {
	// 		console.log(data);
	// 		done();
	// 	});
	// 	socket1.emit('gameStatus');
	// });

});


describe('Test queue', () => {
	let gamesService;
	let app, server;
	let serverAddr;

	let socket1, socket2, socket3;

	beforeAll(async () => {
		const module = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		gamesService = module.get<GamesService>(GamesService);
		app = module.createNestApplication();
		server = app.getHttpServer();
		serverAddr = `http://localhost:${server.listen().address().port}`;
		app.useWebSocketAdapter(new IoAdapter(server));
		await app.init();
		gamesService.clearPingInverval();
	});

	afterEach(async () => {
		if (socket1) { 
			await socket1.off('gameInvite'); 
			await socket1.off('gameStatus'); 
			await socket1.off('removeQueue'); 
			await socket1.off('queue'); 
		};
		if (socket2) { 
			await socket2.off('gameInvite'); 
			await socket2.off('gameStatus'); 
			await socket2.off('removeQueue'); 
			await socket2.off('queue'); 
		};
		if (socket3) { 
			await socket3.off('gameInvite'); 
			await socket3.off('gameStatus'); 
			await socket3.off('removeQueue'); 
			await socket3.off('queue'); 
		};
	})

	afterAll(async () => {
		if (socket1) { await socket1.close(); }
		if (socket2) { await socket2.close(); }
		if (socket3) { await socket3.close(); }
		await server.close();
		await app.close();
	});

	it('Join queue', (done) => {
		socket1 = connectSocket(serverAddr, jwt1);

		socket1.on('gameStatus', (data) => {
			expect(data.games.length).toBe(1);
			expect(data.players.length).toBe(1);
			expect(data.queue.length).toBe(1);
			done();
		})

		socket1.on('queue', (data) => {
			socket1.emit('gameStatus');
		});

		socket1.emit('queue', { isLadder: false });
	});
	
	it('Leave queue', (done) => {
		socket1.on('gameStatus', (data) => {
			expect(data.games.length).toBe(0);
			expect(data.players.length).toBe(0);
			expect(data.queue.length).toBe(0);
			done();
		});

		socket1.emit('removeQueue');
		socket1.emit('gameStatus');
	});

	it('Leave queue', (done) => {
		socket1.on('gameStatus', (data) => {
			expect(data.games.length).toBe(0);
			expect(data.players.length).toBe(0);
			expect(data.queue.length).toBe(0);
			done();
		});

		socket1.emit('removeQueue');
		socket1.emit('gameStatus');
	});

	it('Timeout queue', (done) => {
		gamesService.gameModel.setReadyTime(3000);

		socket1.on('queue', (data) => {
			if (data.text == 'timeout') {
				gamesService.gameModel.resetReadyTime();
				socket1.emit('gameStatus');
			}
		})

		socket1.on('gameStatus', (data) => {
			expect(data.games.length).toBe(0);
			expect(data.players.length).toBe(0);
			expect(data.queue.length).toBe(0);
			done();
		})

		socket1.emit('queue', { isLadder: false });
	});

	it('Matched queue', (done) => {
		socket2 = connectSocket(serverAddr, jwt2);

		socket2.on('gameStatus', (data) => {
			expect(data.games.length).toBe(1);
			expect(data.players.length).toBe(2);
			expect(data.queue.length).toBe(0);
		})

		socket2.on('queue', (data) => {
			if (data.text == 'created') {
				socket2.emit('gameStatus');
			}
			if (data.text == 'matched') {
				socket1.emit('removeQueue');
				done();
			}
		});

		socket1.on('queue', (data) => {
			if (data.text == 'created') {
				socket2.emit('queue', { isLadder: false });
			}
		});

		socket1.emit('queue', { isLadder: false });
	});

	it('Game status', (done) => {
		socket1.on('gameStatus', (data) => {
			console.log(data);
			done();
		});
		socket1.emit('gameStatus');
	});

	it('Ladder queue', (done) => {
		let is = true;

		socket2.on('queue', async (data) => {
			if (is && data.text == 'created') {
				is = false;
				await socket2.emit('removeQueue');
				await socket2.emit('queue', { isLadder: true });
			} else if (data.text == 'matched') {
				await socket2.emit('removeQueue');
				done();
			}

		});

		socket1.on('queue', (data) => {
			if (data.text == 'created') {
				socket2.emit('queue', { isLadder: false });
			}
		});

		socket1.emit('queue', { isLadder: true });
	});

	it('Game status', (done) => {
		socket1.on('gameStatus', (data) => {
			console.log(data);
			done();
		});
		socket1.emit('gameStatus');
	});

	it('Blocked queue', (done) => {
		socket2.on('removeQueue', async (data) => {
			await socket1.emit('removeBlocked', { userId: 2 });
			done();
		});

		socket2.on('queue', (data) => {
			expect(data.text).toBe('created');
			socket1.emit('gameStatus');
		});

		socket1.on('gameStatus', async (data) => {
			console.log(data);
			expect(data.games.length).toBe(2);
			expect(data.players.length).toBe(2);
			expect(data.queue.length).toBe(2);
			await socket1.emit('removeQueue');
			await socket2.emit('removeQueue');
		});

		socket1.on('queue', async (data) => {
			if (data.text == 'created') {
				await socket1.emit('addBlocked', { userId: 2 });
				await socket2.emit('queue', { isLadder: false });
			}
		});

		socket1.emit('queue', { isLadder: false });
	});

	



});
