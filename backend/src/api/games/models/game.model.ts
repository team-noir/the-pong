import { Injectable, HttpStatus, Inject, forwardRef, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core'

import { Player } from '../dtos/player.dto';
import { Game } from '../dtos/game.dto';
import { Socket } from 'socket.io';
import { PrismaService } from '../../../prisma/prisma.service';
import { AppGateway } from '../../../app.gateway';
import { PrismaClient } from '@prisma';

type gameId = number;
type playerId = number;

@Injectable()
export class GameModel implements OnModuleInit {
	private games = new Map<gameId, Game>();
	private players = new Map<playerId, Player>();	
	private queue = new Array<gameId>();
	private pongRecords = new Set<playerId>();

	private appGateway: AppGateway;

	constructor(
		private prismaService: PrismaService,
		private moduleRef: ModuleRef
	) {}

	onModuleInit() {
		this.appGateway = this.moduleRef.get(AppGateway, { strict: false });
	}

	isPlayerInGame(playerId: number): boolean {
		return this.players.has(playerId);
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

	async createPlayer(userId: number) {
		if (!this.appGateway.isUserOnline(userId)) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'This user is not online';
			throw { code, message };
		} else if (this.isPlayerInGame(userId)) {
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
			if (!this.queue.includes(gameId)) { return; }
			game.noticeToPlayers('queue', { text: 'timeout'});
			this.removeGame(game);
		}, 60000);
	}

	newQueue(player: Player, isLadder: boolean): gameId {
		const gameId = this.getGameId();
		const newGame = new Game(gameId, isLadder);

		newGame.join(player, isLadder);
		player.joinGame(newGame);

		this.setPlayer(player);
		this.setGame(newGame);
		this.addQueue(newGame);
		this.setGameRoomTimeout(newGame.gameId);
		return newGame.gameId;
	}

	newInvite(player: Player, invited: Player): gameId {
		const gameId = this.getGameId();
		const newGame = new Game(gameId, false, invited.userId);

		newGame.join(player, false);
		if (!newGame.canJoin(invited, false)) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'You cannot invite this user';
			throw { code, message };
		}
		player.joinGame(newGame);

		this.setPlayer(player);
		this.setGame(newGame);
		this.setGameRoomTimeout(newGame.gameId);
		return newGame.gameId;
	}

	removeInvite(game: Game) {
		const invitedId = game.invitedId;
		const invitedSocket = this.appGateway.getUserSocket(invitedId);

		invitedSocket.emit('gameInvite', {
			text: 'canceled'
		})

		this.removeGame(game);
	}

	findQueue(player: Player, isLadder: boolean) : Game | undefined {
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

		return undefined;
	}

	joinQueue(player: Player, game: Game) {
		this.setPlayer(player);
		player.joinGame(game);
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

}
