import { Injectable, HttpStatus } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Player } from './dtos/player.dto';
import { GameModel } from './models/game.model';

type gameId = number;
type intervalId = number;
type playerId = number;
type userId = number;

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
		// this.pingInterval = setInterval(() => {
		// 	this.gameModel.sendPingToAllPlayers(); 
		// }, 5000);
	}

	addUserToQueue(player: Player, isLadder: boolean) {
		if (this.gameModel.isPlayerInGame(player.userId)) {
			const code = HttpStatus.CONFLICT;
			const message = 'This user is already in queue';
			throw { code, message };
		}
		const gameId = this.gameModel.joinQueue(player, isLadder);

		if (gameId == 0) {
			return this.gameModel.addQueue(player, isLadder);
		}
		this.gameModel.removeQueue(player.game);
		return gameId;
	}



}
