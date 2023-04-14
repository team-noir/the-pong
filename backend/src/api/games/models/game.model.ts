import { Player } from '../dtos/player.dto';
import { Game } from '../dtos/game.dto';
import { Socket } from 'socket.io';

type gameId = number;
type playerId = number;

export class GameModel {
	private games = new Map<gameId, Game>();
	private players = new Map<playerId, Player>();
	
	private queue = new Array<gameId>();
	private pongRecords = new Set<playerId>();

	gameStatus(socket: Socket) {
		socket.emit('gameStatus', {
			games: [...this.games.keys()],
			players: [...this.players.keys()],
			queue: this.queue,
			pongRecords: [...this.pongRecords.values()]
		})
	}

	setGameRoomTimeout(gameId: number) {
		const game = this.games.get(gameId);
		
		game.readyTimeout = setTimeout(() => {
			if (this.queue.includes(gameId)) { return; }
			game.noticeToPlayers('queue', { text: 'timeout'});
			this.removeGame(game);
		}, 10000);
	}

	addQueue(player: Player, isLadder: boolean) : number {
		const gameId = this.games.size + 1;
		const newGame = new Game(gameId, isLadder);
		newGame.join(player, isLadder);

		player.joinGame(newGame);
		this.players.set(player.userId, player);
		this.games.set(newGame.gameId, newGame);
		this.queue.push(newGame.gameId);
		this.receivePong(player.userId);
		this.setGameRoomTimeout(newGame.gameId);
		return newGame.gameId;
	}

	joinQueue(player: Player, isLadder: boolean) : number {
		for (const id of this.queue) {
			const game = this.games.get(id);
			if (game.canJoin(player, isLadder)) {
				this.players.set(player.userId, player);
				player.joinGame(game);
				this.receivePong(player.userId);
				return id;
			}
		};
		return 0;
	}

	removeQueue(game: Game) {
		this.queue = this.queue.filter((id) => id != game.gameId);
	}

	removePlayers(game: Game) {
		game.getPlayers().forEach((player) => {
			this.players.delete(player.userId);
		});
		game.removePlayers();
	}

	removeGame(game: Game) {
		this.removePlayers(game);
		this.removeQueue(game);
		this.games.delete(game.gameId);
	}

	disconnectPlayer(playerId: number) {
		const player = this.players.get(playerId);
		if (player.game) {
			this.removeGame(player.game);
		}
	}

	checkPlayersConnection() {
		const playerIdList = [...this.players.keys()];
		playerIdList.forEach((playerId) => {
			if (!this.pongRecords.has(playerId)) {
				this.disconnectPlayer(playerId);
			}
		});
		this.pongRecords.clear();
	}

	sendPingToAllPlayers() {
		if (this.players.size == 0) { return; }
		const playerIdList = [...this.players.keys()];

		this.checkPlayersConnection();

		// Send ping
		playerIdList.forEach((playerId) => {
			console.log('ping : ', playerId);
			const player = this.players.get(playerId);
			player.socket.emit('ping', { userId: player.userId });
		});
	}

	receivePong(userId: number) {
		console.log('pong : ', userId);
		if (userId) {
			this.pongRecords.add(userId);
		}
	}

	isPlayerInGame(playerId: number): boolean {
		return this.players.has(playerId);
	}
}
