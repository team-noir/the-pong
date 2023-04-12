import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { WebSocketServer } from '@nestjs/websockets';

type gameId = number;
type intervalId = number;
type playerId = number;
type userId = number;

export class Player {
	userId: number;
	socket;
	game?: Game;
	blockUser?: Set<playerId>;

	constructor(userId: number, socket, blockUser?: playerId[]) {
		this.userId = userId;
		this.socket = socket;
		this.blockUser = new Set(blockUser);
	}

	isBlockUser(playerId: number) : boolean {
		if (!this.blockUser) {
			return false;
		}
		return this.blockUser.has(playerId);
	}

	setGame(game: Game) {
		this.game = game;
	}
}

class Game {
	gameId: number;
	players: Player[];
	isLadder: boolean;
	isInvite: boolean;
	readyInterval;

	constructor(gameId: number, isLadder?: boolean, isInvite?: boolean) {
		this.gameId = gameId;
		this.isLadder = isLadder ? true : false;
		this.isInvite = isInvite ? true : false;
		this.players = [];
	}

	noticeToPlayers(event: string, message: string) {
		this.players.forEach((player) => {
			player.socket.emit(event, {
				message: message
			})
		})
	}

	getName() : string {
		return `game-${this.gameId}`;
	}

	getPlayers() : Player[] {
		return this.players;
	}

	removePlayers() {
		this.players = [];
	}

	join(player: Player, isLadder: boolean) : boolean {
		if (!this.canJoin(player, isLadder)) { 
			return false; 
		}
		this.players.push(player);
		player.socket.join(this.getName());
		if (this.isFull()) {
			this.noticeToPlayers('queue', 'matched');
		}
		return true;
	}

	// Check isFull, isLadder, isBlocked
	canJoin(tarPlayer: Player, isLadder: boolean) : boolean {
		if (this.isFull() || (this.isLadder != isLadder)) { 
			return false; 
		}
		this.players.forEach((player) => {
			if (player.isBlockUser(tarPlayer.userId) || tarPlayer.isBlockUser(player.userId)) {
				return false;
			}
		});
		return true;
	}

	leave(tarPlayer: Player) : void {
		if (this.has(tarPlayer)) {
			this.players.forEach((player) => {
				player.socket.leave(this.getName());
				
				// socket message
				player.socket.emit('message', '대기열에서 나왔습니다.');
			});
		}
	}

	has(tarPlayer: Player) : boolean {
		this.players.forEach((player) => {
			if (player.userId == tarPlayer.userId) {
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
	private players = new Map<playerId, Player>();
	
	private queue = new Array<gameId>();
	private pongRecords = new Set<playerId>();

	setGameRoomTimeout(gameId: number) {
		const game = this.games.get(gameId);
		
		game.readyInterval = setTimeout(() => {
			game.noticeToPlayers('queue', 'timeout');
			this.removePlayers(game);
			if (!game.isInvite) {
				this.removeQueue(game);
			} 
			this.removeGame(game);
		}, 60000);
	}

	addQueue(player: Player, isLadder: boolean) : number {
		const gameId = this.games.size + 1;
		const newGame = new Game(gameId, isLadder);
		newGame.join(player, isLadder);

		player.setGame(newGame);
		this.players.set(player.userId, player);
		this.games.set(newGame.gameId, newGame);
		this.queue.push(newGame.gameId);
		this.receivePong({ userId: player.userId });
		return newGame.gameId;
	}

	joinQueue(player: Player, isLadder: boolean) : number {
		this.queue.forEach((id) => {
			const game = this.games.get(id);
			if (game.join(player, isLadder)) {
				player.setGame(game);
				this.receivePong({ userId: player.userId });
				return id;
			}
		});
		return 0;
	}

	removeQueue(game: Game) {
		this.queue = this.queue.filter((id) => id != game.gameId);
	}

	removeGame(game: Game) {
		this.games.delete(game.gameId);
	}

	removePlayers(game: Game) {
		game.getPlayers().forEach((player) => {
			this.players.delete(player.userId);
		});
		game.removePlayers();
	}

	sendPingToAllPlayers() {
		if (this.players.size == 0) { return; }
		const playerIdList = [...this.players.keys()];

		playerIdList.forEach((playerId) => {
			if (!this.pongRecords.has(playerId)) {
				// no pong
				
				const player = this.players.get(playerId);
				player.socket.emit('message', '연결되어있지 않습니다.');
			}
		})
		this.pongRecords.clear();
		playerIdList.forEach((playerId) => {
			const player = this.players.get(playerId);
			player.socket.emit('ping', { userId: player.userId });
		})
	}

	receivePong(data) {
		if (data && data.userId) {
			this.pongRecords.add(data.userId);
		}
	}
}


@Injectable()
export class GamesService {
	@WebSocketServer() server;
	public gameModel: GameModel;
	private pingInterval;

	constructor() {
		this.gameModel = new GameModel();
	}

	init(server) {
		this.server = server;
		this.pingInterval = setInterval(() => {
			this.gameModel.sendPingToAllPlayers(); 
		}, 5000);
		this.server.on('pong', (data) => this.gameModel.receivePong(data));
	}

	addUserToQueue(player: Player, isLadder: boolean) {
		const gameId = this.gameModel.joinQueue(player, isLadder);

		if (gameId == 0) {
			return this.gameModel.addQueue(player, isLadder);
		}
		return gameId;
	}



}
