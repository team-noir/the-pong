import { Injectable, HttpStatus } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Player } from './dtos/player.dto';
import { GameModel } from './models/game.model';

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
	}

	addUserToQueue(player: Player, isLadder: boolean) {
		if (this.gameModel.isPlayerInGame(player.userId)) {
			const code = HttpStatus.CONFLICT;
			const message = 'This user is already in queue';
			throw { code, message };
		}
		const game = this.gameModel.findQueue(player, isLadder);

		if (!game) {
			return this.gameModel.newQueue(player, isLadder);
		} else {
			this.gameModel.joinQueue(player, game);
			this.gameModel.removeQueue(game);
			return game.gameId;
		}
	}

	removeUserFromQueue(playerId: number) {
		if (this.gameModel.isPlayerInGame(playerId)) {
			const player = this.gameModel.getPlayer(playerId);
			if (player.game) {
				this.gameModel.removeGame(player.game);
			}
		}
	}

}
