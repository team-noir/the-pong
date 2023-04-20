import { Injectable, HttpStatus, Inject, forwardRef, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core'

import { Player } from '../dtos/player.dto';
import { Game } from '../dtos/game.dto';
import { Socket } from 'socket.io';
import { PrismaService } from '@/prisma/prisma.service';
import { AppGateway } from '@/app.gateway';
import { PrismaClient } from '@prisma';

type gameId = number;
type playerId = number;

@Injectable()
export class GameModel implements OnModuleInit {
	private games = new Map<gameId, Game>();
	private players = new Map<playerId, Player>();	
	private invites = new Map<playerId, Game>();
	private queue = new Array<gameId>();
	private pongRecords = new Set<playerId>();

	private appGateway: AppGateway;
	private readyTime = 60000;

	constructor(
		private prismaService: PrismaService,
		private moduleRef: ModuleRef
	) {}

	async onModuleInit() {
		this.appGateway = await this.moduleRef.get(AppGateway, { strict: false });
	}

	isPlayerInGame(playerId: number): boolean {
		return this.players.has(playerId);
	}

	checkPlayersConnection() {
		const playerIdList = [...this.players.keys()];
		for (const playerId of playerIdList) {
			if (!this.pongRecords.has(playerId)) {
				this.disconnectPlayer(playerId);
			}
		};
		this.pongRecords.clear();
	}

	setReadyTime(time: number) {
		this.readyTime = time;
	}

	resetReadyTime() {
		this.readyTime = 60000;
	}

	addQueue(game: Game) {
		this.queue.push(game.gameId);
	}

	getGameId(): gameId {
		return this.games.size + 1;
	}

	getGame(gameId: number): Game {
		return this.games.get(gameId);
	}

	setGame(game: Game) {
		this.games.set(game.gameId, game);
	}

	addInvite(game: Game, invitedId: number) {
		this.invites.set(invitedId, game);
	}

	getInvite(invitedId: number) {
		return this.invites.get(invitedId);
	}
	
	isInvited(invitedId: number) {
		return this.invites.has(invitedId);
	}

	deleteInvite(invitedId: number) {
		this.invites.delete(invitedId);
	}

	async createPlayer(userId: number) {
		if (!this.appGateway.isUserOnline(userId)) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'This user is not online';
			throw { code, message };
		} else if (this.isPlayerInGame(userId) || this.isInvited(userId)) {
			const code = HttpStatus.CONFLICT;
			const message = 'This user is already in game';
			throw { code, message };
		}

		const socket = this.appGateway.getUserSocket(userId);
		const data = await this.prismaService.user.findUnique({
			where: { id: userId },
			select: {
				nickname: true,
				blockeds: { select: { blockedId: true } }
			}
		});

		if (!data) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'This user is not exist';
			throw { code, message };
		}

		const blocks = [];
		for (const blocked of data.blockeds) {
			blocks.push(blocked.blockedId);
		}

		return new Player(userId, data.nickname, socket, blocks);
	}

	getPlayer(playerId: number): Player {
		if (!this.isPlayerInGame(playerId)) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'This user is not in the game';
			throw { code, message };
		}

		return this.players.get(playerId);
	}

	setPlayer(player: Player) {
		this.players.set(player.userId, player);
		this.receivePong(player.userId);
	}

	async gameStatus(socket: Socket) {
		await socket.emit('gameStatus', {
			games: [...this.games.keys()],
			players: [...this.players.keys()],
			queue: this.queue,
			pongRecords: [...this.pongRecords.values()]
		})
	}

	async setGameRoomTimeout(gameId: number) {
		const game = this.games.get(gameId);

		game.readyTimeout = setTimeout(async () => {
			if (game.isFull()) { return; }
			if (game.invitedId) {
				await game.noticeToPlayers('gameInvite', { text: 'canceled'});
			} else {
				await game.noticeToPlayers('queue', { text: 'timeout'});
			}
			this.removeGame(game);
		}, this.readyTime);
	}

	async newQueue(player: Player, isLadder: boolean): Promise<gameId> {
		const newGame = new Game(this.getGameId(), isLadder);

		newGame.join(player, isLadder);
		player.joinGame(newGame);

		this.setPlayer(player);
		this.setGame(newGame);
		await this.setGameRoomTimeout(newGame.gameId);

		this.addQueue(newGame);
		return newGame.gameId;
	}

	async newInvite(player: Player, invited: Player): Promise<gameId> {
		const newGame = new Game(this.getGameId(), false);

		if (player.userId == invited.userId) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'You cannot invite this user';
			throw { code, message };
		}

		newGame.join(player, false);
		if (!newGame.canJoin(invited, false)) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'You cannot invite this user';
			throw { code, message };
		}
		
		player.joinGame(newGame);
		this.setPlayer(player);
		this.setGame(newGame);
		await this.setGameRoomTimeout(newGame.gameId);

		this.addQueue(newGame);
		this.addInvite(newGame, invited.userId);
		newGame.invitedId = invited.userId;

		return newGame.gameId;
	}

	removeInvitation(game: Game) {
		const invitedId = game.invitedId;
		const invitedSocket = this.appGateway.getUserSocket(invitedId);

		this.invites.delete(invitedId);
		invitedSocket.emit('gameInvite', {
			text: 'canceled'
		})

		this.removeGame(game);
	}

	findQueue(player: Player, isLadder: boolean) : Game | null {
		if (this.isPlayerInGame(player.userId)) {
			const code = HttpStatus.CONFLICT;
			const message = 'This user is already in queue';
			throw { code, message };
		}

		for (const id of this.queue) {
			const game = this.getGame(id);
			if (game.canJoin(player, isLadder)) {
				return game;
			}
		};

		return null;
	}

	joinQueue(player: Player, game: Game) {
		this.setPlayer(player);
		player.joinGame(game);
	}

	removeQueue(game: Game) {
		this.queue = this.queue.filter((id) => id != game.gameId);
	}

	removePlayers(game: Game) {
		const players = game.getPlayers();
		for (const player of players) {
			this.players.delete(player.userId);
		};
		game.removePlayers();
	}

	removeGame(game: Game) {
		this.removePlayers(game);
		this.removeQueue(game);
		this.games.delete(game.gameId);
		game.clearGameRoomTimeout();
	}

	disconnectPlayer(playerId: number) {
		const player = this.players.get(playerId);
		if (player.game) {
			this.removeGame(player.game);
		}
	}

	sendPingToAllPlayers() {
		if (this.players.size == 0) { return; }

		this.checkPlayersConnection();
		
		// Send ping
		const playerIdList = [...this.players.keys()];
		playerIdList.forEach((playerId) => {
			const player = this.players.get(playerId);
			if (player.socket) {
				player.socket.emit('ping', { userId: player.userId });
			}
		});
	}

	receivePong(userId: number) {
		if (userId) {
			this.pongRecords.add(userId);
		}
	}

}
