import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';
import { ChannelUser } from '../channels/models/user.model';
import { ChannelsService } from '../channels/channels.service';

type gameId = number;
type intervalId = number;



class Game {
	gameId: number;
	players: ChannelUser[];
	isLadder: boolean;

	readyInterval: intervalId;

	constructor(gameId: number, isLadder?: boolean) {
		this.gameId = gameId;
		this.isLadder = isLadder ? true : false;
	}

	getName() : string {
		return `game-${this.gameId}`;
	}

	join(player: ChannelUser, isLadder?: boolean) : boolean {
		if (!this.canJoin(player, isLadder)) { 
			return false; 
		}
		this.players.push(player);
		player.socket.join(this.getName());
		return true;
	}

	// Check isFull, isLadder, isBlocked
	canJoin(tarPlayer: ChannelUser, isLadder?: boolean) : boolean {
		if (this.isFull() || (this.isLadder != isLadder)) { 
			return false; 
		}
		this.players.forEach((player) => {
			if (player.isBlockUser(tarPlayer.id) || tarPlayer.isBlockUser(player.id)) {
				return false;
			}
		});
		return true;
	}

	leave(tarPlayer: ChannelUser) : void {
		if (this.has(tarPlayer)) {
			this.players.forEach((player) => {
				player.socket.leave(this.getName());
				
				// socket message
				player.socket.emit('message', '대기열에서 나왔습니다.');
			});
		}
	}

	has(tarPlayer: ChannelUser) : boolean {
		this.players.forEach((player) => {
			if (player.id == tarPlayer.id) {
				return true;
			}
		});
		return false;
	}

	isFull() : boolean {
		return (this.players.length > 1);
	}
}



class GameModel {
	private games = new Map<gameId, Game>();
	private queue = new Array<gameId>();

	findQueue(player: ChannelUser) : number {
		this.queue.forEach((id) => {
			const game = this.games.get(id);
			if (game.join(player)) {
				return id;
			}
		});
		return 0;
	}

	addQueue(player: ChannelUser, isLadder?: boolean) : number {
		const gameId = this.games.size + 1;
		const newGame = new Game(gameId, isLadder);

		newGame.join(player);
		this.games.set(newGame.gameId, newGame);
		this.queue.push(newGame.gameId);
		return newGame.gameId;
	}

}



@Injectable()
export class GamesService {
	@WebSocketServer() server: Server;
	private gameModel: GameModel;
	private pingInterval: intervalId;

	constructor(private channelsService: ChannelsService) {
		this.gameModel = new GameModel();
	}

	addUserToQueue(userId: number, isLadder: boolean) {
		const user = this.channelsService.userModel.getUser(userId);
		const gameId = this.gameModel.findQueue(user);

		if (gameId == 0) {
			return this.gameModel.addQueue(user, isLadder);
		}
		return gameId;
	}

}
