import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { CreateQueueDto } from './dtos/games.dto';
import { ChannelUser } from '../channels/models/user.model';
import { ChannelsService } from '../channels/channels.service';

type gameId = number;

// 게임에 들어오는 사람이 

class Game {
	gameId: number;
	player1: ChannelUser;
	player2?: ChannelUser;
	isLadder: boolean;

	constructor(gameId: number, player: ChannelUser, isLadder?: boolean) {
		this.gameId = gameId;
		this.isLadder = isLadder ? true : false;

		this.player1 = player;
		player.socket.join(this.getName());

		// socket message
		player.socket.emit('message', '대기열에 들어왔습니다.');

		this.pingInterval = setTimeout(() => {
			const gameArray = [...this.games.values()];
			gameArray.forEach((game) => {
				game.player1.socket.
			})

			
		}, 5000);
	}

	getName() : string {
		return `game-${this.gameId}`;
	}

	join(player: ChannelUser) : void {
		this.player2 = player;
		player.socket.join();

		// socket message
		player.socket.emit('message', '대기열에 들어왔습니다.');

		this.player1.socket.emit('message', '상대가 방에 들어왔습니다.');
	}

	leave(player: ChannelUser) : void {
		if (player.id == this.player1.id) {
			this.player1.socket.leave(this.getName());
			this.player2.socket.leave(this.getName());

			// socket message
			this.player1.socket.emit('message', '대기열에서 나왔습니다.');
			this.player2.socket.emit('message', '대기열에서 나왔습니다.');

		} else if (player.id == this.player2.id) {
			this.player2.socket.leave(this.getName());

			// socket message
			this.player2.socket.emit('message', '대기열에서 나왔습니다.');
		}
	}

	isFull() : boolean {
		return (this.player2 != null);
	}
}

// 게임에 참가 중이거나 대기열에 있는 유저들의 연결 상태를 확인한다.
// 인터벌에서 모든 유저에게 ping 메세지를 보낸다.
// 유저들은 ping 메세지에 pong으로 응답한다.
// 만약에 서버가 다음 ping을 보낼때 pong 응답을 보내지 않은 유저가 있다면 연결이 끊어진 것이다.
// 연결이 끊어졌다면 게임 방에 있는 다른 유저에게 메세지를 보낸다.
// 

class Queue {
	private games = new Map<gameId, Game>();
	private queue = new Array<gameId>();
	private pingInterval;

	getJoinableGameId(player: ChannelUser, isLadder?: boolean) : gameId {
		this.queue.forEach((id) => {
			const game = this.games.get(id);
			const isBlocked = game.player1.isBlockUser(player.id);
			const hasBlocked = player.isBlockUser(game.player1.id);
			isLadder = isLadder ? true : false;
			if (
				!isBlocked && !hasBlocked 
				&& (game.isLadder == isLadder)
				&& !game.isFull()
			) {
				return id;
			}
		})
		return 0;
	}

	createGame(player: ChannelUser, isLadder?: boolean) {
		const gameId = this.games.size + 1;
		const newGame = new Game(gameId, player, isLadder);

		this.games.set(gameId, newGame);
		this.queue.push(gameId);
		return 
	}

	joinGame(player: ChannelUser, gameId: number) {
		const game = this.games.get(gameId);
		game.join(player);
	}

}

@Injectable()
export class GamesService {
	@WebSocketServer() server: Server;
	private queue: Queue;

	constructor(private channelsService: ChannelsService) {
		this.queue = new Queue();
	}


	// 대기열을 확인한다.
	//  - 대기열의 방에 자신을 block하거나 자신이 block한 사람이 있다면 들어가지 않는다.
	// 참가할 수 있는 방이 없다면 새로운 방을 만든다.
	// 참가할 수 있는 방이 있다면 참가한다.
	addUserToQueue(userId: number, isLadder: boolean) {
		const user = this.channelsService.userModel.getUser(userId);
		const gameId = this.queue.getJoinableGameId(user, isLadder);

		if (gameId != 0) {
			this.queue.joinGame(user, gameId);
		} else {
			this.queue.createGame(user, isLadder);
		}
	}
	
	removeUserToQueue(userId: number, isLadder: boolean) {
		const user = this.channelsService.userModel.getUser(userId);
		const gameId = this.queue.getJoinableGameId(user, isLadder);

		if (gameId != 0) {
			this.queue.joinGame(user, gameId);
		} else {
			this.queue.createGame(user, isLadder);
		}
	}

	 




}
