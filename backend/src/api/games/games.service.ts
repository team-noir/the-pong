import { Injectable, HttpStatus } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Player } from './dtos/player.dto';
import { GameModel } from './models/game.model';
import { GameListDto, GameSettingInfoDto } from './dtos/games.dto';
import { GAME_STATUS } from '@/const';
import { PageRequestDto } from '@/api/dtos/pageRequest.dto';

@Injectable()
export class GamesService {
  @WebSocketServer() server;
  private pingInterval;

  constructor(public gameModel: GameModel) {}

  init(server) {
    this.server = server;
    this.pingInterval = setInterval(async () => {
      await this.gameModel.sendPingToAllPlayers();
    }, 2000);
  }

  clearPingInverval() {
    clearInterval(this.pingInterval);
  }

  getGameList(query: GameListDto) {
    return this.gameModel.getGameList(query);
  }

  async addUserToQueue(userId: number, isLadder: boolean) {
    if (this.gameModel.isPlayerInGame(userId)) {
      const game = this.gameModel.getPlayer(userId).game;
      this.gameModel.removeGame(game);
    }

    const player = await this.gameModel.createPlayer(userId);
    const game = this.gameModel.findQueue(player, isLadder);

    if (game == null) {
      return await this.gameModel.newQueue(player, isLadder);
    } else {
      await game.join(player, isLadder);
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
    if (this.gameModel.isPlayerInGame(userId)) {
      const game = this.gameModel.getPlayer(userId).game;
      this.gameModel.removeGame(game);
    }

    const user = await this.gameModel.createPlayer(userId);
    const invited = await this.gameModel.createPlayer(invitedUserId);
    const gameId = await this.gameModel.newInvite(user, invited);

    if (invited.socket) {
      await invited.socket.emit('gameInvite', {
        text: 'invited',
        gameId: gameId,
        user: {
          id: user.userId,
          nickname: user.username,
        },
      });
    }
  }

  cancelInvitation(userId: number) {
    const player = this.gameModel.getPlayer(userId);
    const game = player.game;

    if (game) {
      this.gameModel.removeGame(game);
    }
  }

  async answerInvitation(userId: number, gameId: number, isAccepted: boolean) {
    this.gameModel.deleteInvite(userId);

    const invited = await this.gameModel.createPlayer(userId);
    const game = this.gameModel.getGame(gameId);

    if (!game.canJoin(invited, false)) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'You cannot join this game';
      throw { code, message };
    }

    if (isAccepted) {
      await game.join(invited, false);
      game.removeInvitedId();
      this.gameModel.joinQueue(invited, game);
      this.gameModel.removeQueue(game);
    } else {
      await game.noticeToPlayers('queue', {
        text: 'rejected',
      });
      this.gameModel.removeGame(game);
    }
  }

  gameSettingInfo(gameId: number) {
    const game = this.gameModel.getGame(gameId);

    return new GameSettingInfoDto(game);
  }

  async setGameSettings(
    userId: number,
    gameId: number,
    mode: number,
    theme: number
  ) {
    const player = this.gameModel.getPlayer(userId);
    const game = this.gameModel.getGame(gameId);

    if (game.ownerId != player.userId) {
      const code = HttpStatus.FORBIDDEN;
      const message = 'You do not have permission to change game settings.';
      throw { code, message };
    } else if (!game.isFull()) {
      const code = HttpStatus.BAD_REQUEST;
      const message = "Your opponent hasn't entered yet.";
      throw { code, message };
    } else if (game.status != GAME_STATUS.READY) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'The game is not ready.';
      throw { code, message };
    }

    game.setMode(mode);
    game.setTheme(theme);

    await game.noticeToPlayers('gameSetting', {
      text: 'change',
      mode: game.getMode(),
      theme: game.getTheme(),
    });
  }

  async startGame(userId: number, gameId: number) {
    const player = this.gameModel.getPlayer(userId);
    const game = this.gameModel.getGame(gameId);

    if (game.ownerId != player.userId) {
      const code = HttpStatus.FORBIDDEN;
      const message = 'You do not have permission to change game settings.';
      throw { code, message };
    } else if (!game.isFull()) {
      const code = HttpStatus.BAD_REQUEST;
      const message = "Your opponent hasn't entered yet.";
      throw { code, message };
    } else if (game.status != GAME_STATUS.READY) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'The game has already started.';
      throw { code, message };
    }

    await this.gameModel.gameStart(game);
  }

  async watchGame(userId: number, gameId: number) {
    const player = await this.gameModel.createPlayer(userId);
    let game;

    try {
      game = this.gameModel.getGame(gameId);
    } catch (error) {
      const code = HttpStatus.NOT_FOUND;
      const message = error.message;
      throw { code, message };
    }

    if (game.hasPlayer(player)) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'You are already in this game.';
      throw { code, message };
    } else if (game.status != GAME_STATUS.PLAYING) {
      const code = HttpStatus.BAD_REQUEST;
      const message = 'The game has not started yet.';
      throw { code, message };
    }

    player.game = game;
    this.gameModel.setPlayer(player);
    await game.addViewer(player);
    await game.noticeToPlayers('gameViewer', {
      viewerCount: game.getViewerCount(),
    });
  }

  async leaveGame(userId: number, gameId: number) {
    const player = this.gameModel.getPlayer(userId);
    const game = this.gameModel.getGame(gameId);

    // player가 게임의 플레이어인 경우
    if (game.hasPlayer(player)) {
      await this.gameModel.createGameResult(game.gameId, player.userId);
      await this.gameModel.disconnectPlayer(player.userId);
    }

    // player가 게임의 관전자인 경우
    if (game.hasViewer(player)) {
      game.removeViewer(player.userId);
    }
  }

  async getGameInfo(userId: number, gameId: number) {
    const game = this.gameModel.getGame(gameId);

    return game.getGameInfo();
  }
}
