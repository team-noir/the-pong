import {
  Injectable,
  HttpStatus,
  Inject,
  forwardRef,
  OnModuleInit,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { Player } from '../dtos/player.dto';
import { Game } from '../dtos/game.dto';
import { Socket } from 'socket.io';
import { PrismaService } from '@/prisma/prisma.service';
import { AppGateway } from '@/app.gateway';
import { PrismaClient } from '@prisma';
import { GAME_MODES, GAME_THEMES } from '@const';

type gameId = number;
type playerId = number;

@Injectable()
export class GameModel implements OnModuleInit {
  private games = new Map<gameId, Game>();
  private players = new Map<playerId, Player>();
  private invites = new Map<playerId, Game>();
  private queue = new Array<gameId>();

  private pongRecords = new Set<playerId>();
  private readyRecords = new Set<playerId>();

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
    if (!this.games.has(gameId)) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'This game does not exist';
      throw { code, message };
    }

    return this.games.get(gameId);
  }

  getGameList() {
    const gamelist = [];

    for (const game of this.games.values()) {
      const { gameId, isLadder, players, createdAt } = game;

      gamelist.push({
        id: gameId,
        players: players.map((player) => {
          return {
            id: player.userId,
            nickname: player.username,
            level: player.game,
          };
        }),
        viewerCount: game.getViewerCount(),
        isLadder: isLadder,
        createdAt: createdAt,
      });
    }
    return gamelist;
  }

  setGame(game: Game) {
    this.games.set(game.gameId, game);
  }

  addInvite(game: Game, invitedId: number) {
    this.invites.set(invitedId, game);
    game.setInvitedId(invitedId);
  }

  getInviteGame(invitedId: number): Game {
    return this.invites.get(invitedId);
  }

  isInvited(invitedId: number) {
    return this.invites.has(invitedId);
  }

  deleteInvite(invitedId: number) {
    const game = this.getInviteGame(invitedId);

    game.removeInvitedId();
    this.invites.delete(invitedId);
  }

  async createGameResult(gameId: number, loserId?: number) {
    const game = this.getGame(gameId);
    const { winner, loser } = game.getWinnerLoser(loserId);
    const winnerScore = game.score.get(winner.userId);
    const loserScore = game.score.get(loser.userId);

    const data = await this.prismaService.gameResult.create({
      data: {
        id: game.gameId,
        isLadder: game.isLadder,
        winnerId: winner.userId,
        loserId: loser.userId,
        winnerScore: winnerScore,
        loserScore: loserScore,
      },
      select: {
        id: true,
        winner: {
          select: {
            id: true,
            nickname: true,
            level: true,
          },
        },
        loser: {
          select: {
            id: true,
            nickname: true,
            level: true,
          },
        },
        winnerScore: true,
        loserScore: true,
        createdAt: true,
      },
    });

    return {
      id: data.id,
      winner: {
        id: data.winner.id,
        nickname: data.winner.nickname,
        level: data.winner.level,
        score: data.winnerScore,
      },
      loser: {
        id: data.loser.id,
        nickname: data.loser.nickname,
        level: data.loser.level,
        score: data.loserScore,
      },
      createdAt: data.createdAt,
    };
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
        level: true,
        blockeds: { select: { blockedId: true } },
      },
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

    return new Player(userId, data.nickname, data.level, socket, blocks);
  }

  getPlayer(playerId: number): Player {
    if (!this.isPlayerInGame(playerId)) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'This user is not in the game';
      throw { code, message };
    }

    return this.players.get(playerId);
  }

  async setPlayer(player: Player) {
    this.players.set(player.userId, player);
    await this.receivePong(player.userId);
  }

  reconnectPlayerSocket(playerId: number, socket) {
    const player = this.players.get(playerId);

    if (player) {
      player.reconnectSocket(socket);
      this.pongRecords.add(playerId);
    }
  }

  async gameStatus(socket: Socket) {
    await socket.emit('gameStatus', {
      games: [...this.games.keys()],
      players: [...this.players.keys()],
      queue: this.queue,
      pongRecords: [...this.pongRecords.values()],
    });
  }

  async setGameRoomTimeout(gameId: number) {
    const game = this.games.get(gameId);

    if (game.readyTimeout) {
      return;
    }
    game.readyTimeout = setTimeout(async () => {
      if (game.isFull()) {
        return;
      }
      const invitetId = game.getInvitedId();
      if (invitetId) {
        const invitedSocket = this.appGateway.getUserSocket(invitetId);
        if (invitedSocket) {
          await invitedSocket.emit('gameInvite', { text: 'canceled' });
        }
        await game.noticeToPlayers('gameInvite', { text: 'canceled' });
        this.deleteInvite(invitetId);
      } else {
        await game.noticeToPlayers('queue', { text: 'timeout' });
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
    newGame.setInvitedId(invited.userId);

    return newGame.gameId;
  }

  removeInvitation(game: Game): Socket | null {
    const invitedId = game.getInvitedId();
    const invitedSocket = this.appGateway.getUserSocket(invitedId);

    if (!invitedId || !invitedSocket) {
      return null;
    }
    this.deleteInvite(invitedId);
    return invitedSocket;
  }

  findQueue(player: Player, isLadder: boolean): Game | null {
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
    }

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
    }
    game.removePlayers();
  }

  removeGame(game: Game) {
    this.games.delete(game.gameId);
    this.removePlayers(game);
    const invitedSocket = this.removeInvitation(game);
    if (invitedSocket && !game.isStarted) {
      invitedSocket.emit('gameInvite', { text: 'canceled' });
    }
    this.removeQueue(game);
    game.clearGameRoomTimeout();
  }

  disconnectPlayer(playerId: number) {
    const player = this.players.get(playerId);

    if (!player) {
      return;
    }
    if (player.game) {
      this.removeGame(player.game);
    }
    if (this.isInvited(playerId)) {
      this.deleteInvite(playerId);
    }

    this.players.delete(player.userId);
  }

  sendPingToAllPlayers() {
    if (this.players.size == 0) {
      return;
    }

    this.checkPlayersConnection();
    const playerIdList = [...this.players.keys()];
    playerIdList.forEach((playerId) => {
      const player = this.players.get(playerId);
      if (player.socket) {
        player.socket.emit('ping', { userId: player.userId });
      }
    });
  }

  async receivePong(userId: number) {
    if (userId) {
      await this.checkPlayersReady(userId);
      this.pongRecords.add(userId);
    }
  }

  checkPlayersConnection() {
    const playerIdList = [...this.players.keys()];

    for (const playerId of playerIdList) {
      if (!this.pongRecords.has(playerId)) {
        this.disconnectPlayer(playerId);
      }
    }
    this.pongRecords.clear();
  }

  async checkPlayersReady(userId: number) {
    if (this.readyRecords.has(userId)) {
      this.readyRecords.delete(userId);
      const player = this.players.get(userId);
      if (player) {
        await player.readyGame();
      }
    }
  }

  async gameStart(game: Game) {
    this.removeQueue(game);
    this.removeInvitation(game);
    game.clearGameRoomTimeout();
    game.setStart();

    for (const player of game.players) {
      this.readyRecords.add(player.userId);
    }
  }

  async roundOver(gameId: number, winnerId: number) {
    const game = this.getGame(gameId);
    game.score.set(winnerId, game.score.get(winnerId) + 1);

    if (game.score.get(winnerId) == 11) {
      const data = this.createGameResult(gameId);
      await game.noticeToPlayers('gameOver', data);
    } else {
      await game.noticeToPlayers('roundOver', {
        winnerId: winnerId,
        score: game.score.get(winnerId),
      });
    }
  }
}
