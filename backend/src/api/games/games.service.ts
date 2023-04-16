import { Injectable, HttpStatus } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Player } from './dtos/player.dto';
import { GameModel } from './models/game.model';

@Injectable()
export class GamesService {
	@WebSocketServer() server;
	private pingInterval;

	constructor(public gameModel: GameModel) {}

	init(server) {
		this.server = server;
		this.pingInterval = setInterval(() => {
			this.gameModel.sendPingToAllPlayers(); 
		}, 5000);
	}

	async addUserToQueue(userId: number, isLadder: boolean) {
		const player = await this.gameModel.createPlayer(userId);
		const game = this.gameModel.findQueue(player, isLadder);

		if (game == null) {
			return this.gameModel.newQueue(player, isLadder);
		} else {
			this.gameModel.joinQueue(player, game);
			this.gameModel.removeQueue(game);
			return game.gameId;
		}
	}

	removeUserFromQueue(userId: number) {
		const player = this.gameModel.getPlayer(userId);
		if (player.game) {
			this.gameModel.removeGame(player.game);
		}
	}

	async inviteUserToGame(userId: number, invitedUserId: number) {
		const user = await this.gameModel.createPlayer(userId);
		const invited = await this.gameModel.createPlayer(invitedUserId);
		const gameId = this.gameModel.newInvite(user, invited);
		
		invited.socket.emit('gameInvite', {
			text: "invited",
			gamdId: gameId,
			user: {
				id: user.userId,
				nickname: user.username
			}
		});
	}

	cancelInvitation(userId: number) {
		const player = this.gameModel.getPlayer(userId);
		const game = player.game;

		if (game) {
			this.gameModel.removeInvitation(game);
		}
	}

	async answerInvitation(userId: number, gameId: number, isAccepted: boolean) {
		this.gameModel.deleteInvite(userId);

		const invited = await this.gameModel.createPlayer(userId);
		const game = this.gameModel.getGame(gameId);

		if (!game) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'This game does not exist';
			throw { code, message };
		} else if (!game.canJoin(invited, false)) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'You cannot join this game';
			throw { code, message };
		}

		if (isAccepted) {
			game.join(invited, false);
		} else {
			await game.noticeToPlayers('queue', {
				text: 'rejected'
			});
			this.gameModel.removeGame(game);
		}
	}

}
