import { Player } from './player.dto';
import { HttpStatus } from '@nestjs/common';
import { GAME_STATUS } from '@const';

type userId = number;
type indexKey = number;

export class Game {
  gameId: number;
  isLadder: boolean;
  status: number;
  mode: indexKey;
  theme: indexKey;
  createdAt: Date;
  score: Map<userId, number>;

  ownerId: number;
  players: Player[];
  viewers: Player[];
  viewerConnections: Set<userId>;
  private invitedId: userId;

  countPlayer: number;

  readyTimeout;

  constructor(gameId: number, isLadder?: boolean) {
    this.gameId = gameId;
    this.isLadder = isLadder ? true : false;
    this.status = GAME_STATUS.WAITING;
    this.mode = 0;
    this.theme = 0;
    this.countPlayer = 0;
    this.players = [];
    this.viewers = [];
    this.viewerConnections = new Set<userId>();
    this.score = new Map<userId, number>();
    this.createdAt = new Date();
  }

  async readyPlayer(player: Player) {
    if (!this.hasPlayer(player)) {
      return;
    }

    this.countPlayer++;
    if (this.countPlayer == 2) {
      await this.players[0].socket.emit('rtcInit', {
        userId: this.players[1].userId,
      });
    }
  }

  getName(): string {
    return `game-${this.gameId}`;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getOwnerPlayer(): Player {
    return this.players[0];
  }

  getNonOwnerPlayer(): Player {
    return this.players[1];
  }

  isFull(): boolean {
    return this.players.length > 1;
  }

  isFullViewer(): boolean {
    return this.viewers.length > 5;
  }

  /*  Invited user */

  getInvitedId(): number | null {
    return this.invitedId;
  }

  setInvitedId(userId: number) {
    this.invitedId = userId;
  }

  removeInvitedId() {
    this.invitedId = null;
  }

  hasPlayer(tarPlayer: Player): boolean {
    return this.players.includes(tarPlayer);
  }

  hasPlayerId(userId: number): boolean {
    for (const player of this.players) {
      if (player.userId == userId) {
        return true;
      }
    }
    return false;
  }

  getGameInfo() {
    return {
      id: this.gameId,
      players: this.getPlayersInfo(),
      mode: this.getMode(),
      theme: this.getTheme(),
      viewerCount: this.getViewerCount(),
      isLadder: this.isLadder,
      isPlaying: this.status == GAME_STATUS.PLAYING,
      createdAt: this.createdAt,
    };
  }

  getPlayersInfo() {
    const playersInfo = [];

    this.players.forEach((player) => {
      playersInfo.push({
        id: player.userId,
        nickname: player.username,
        level: player.level,
        isOwner: player.userId == this.ownerId,
        score: this.score.get(player.userId),
      });
    });
    return playersInfo;
  }

  hasViewer(tarPlayer: Player): boolean {
    this.viewers.forEach((player) => {
      if (player.userId == tarPlayer.userId) {
        return true;
      }
    });
    return false;
  }

  getViewerCount(): number {
    return this.viewers.length;
  }

  getMode() {
    return this.mode;
  }

  getTheme() {
    return this.theme;
  }

  setMode(mode: indexKey) {
    if (this.mode == mode) {
      return false;
    }
    this.mode = mode;
    return true;
  }

  setTheme(theme: indexKey) {
    if (this.theme == theme) {
      return false;
    }
    this.theme = theme;
    return true;
  }

  async setStart() {
    this.score.set(this.players[0].userId, 0);
    this.score.set(this.players[1].userId, 0);

    await this.noticeToPlayers('gameSetting', {
      text: 'done',
    });
  }

  setScore(player: Player, score: number) {
    this.score.set(player.userId, score);
  }

  // Check isFull, isLadder, isBlocked
  canJoin(tarPlayer: Player, isLadder: boolean): boolean {
    if (
      this.isFull() ||
      this.isLadder != isLadder ||
      (this.invitedId && this.invitedId != tarPlayer.userId)
    ) {
      return false;
    }
    return (!this.checkIsNotBlocked(tarPlayer));
  }

  checkIsNotBlocked(tarPlayer: Player): boolean {
    for (const player of this.players) {
      if (player.isBlockUser(tarPlayer.userId)) {
        return true;
      }
      if (tarPlayer.isBlockUser(player.userId)) {
        return true;
      }
    }
    return false;
  }

  reconnectPlayer(player: Player) {
    if (this.hasPlayer(player)) {
      player.socket.join(this.getName());
    }
  }

  removePlayers() {
    for (const player of this.players) {
      player.socket.leave(this.getName());
      player.leaveGame();
    }
    this.players = [];
  }

  removeViewer(viewerId: number): number {
    this.viewers = this.viewers.filter(async (viewer) => {
      if (viewer.userId == viewerId) {
        viewer.socket.leave(this.getName());
        viewer.leaveGame();
        return true;
      }
      return false;
    });
    this.viewerConnections.delete(viewerId);
    return this.getViewerCount();
  }

  clearGameRoomTimeout() {
    clearTimeout(this.readyTimeout);
  }

  async join(player: Player, isLadder: boolean): Promise<boolean> {
    if (!this.canJoin(player, isLadder)) {
      return false;
    }
    if (this.players.length == 0) {
      this.ownerId = player.userId;
    }
    this.players.push(player);
    player.socket.join(this.getName());
    if (this.isFull()) {
      this.status = GAME_STATUS.READY;
      await this.clearGameRoomTimeout();
      await this.noticeToPlayers('queue', {
        text: 'matched',
        gameId: this.gameId,
      });
    }
    return true;
  }

  async addViewer(viewer: Player): Promise<boolean> {
    if (this.isFullViewer()) {
      return false;
    }
    const viewerId = viewer.userId;
    this.viewers.push(viewer);

    viewer.game = this;
    viewer.socket.join(this.getName());

    await this.players[0].socket.emit('rtcInit', {
      userId: viewerId,
    });

    this.viewerConnections.add(viewerId);
    setTimeout(() => {
      if (this.viewerConnections.has(viewerId)) {
        this.players[0].socket.emit('rtcInit', {
          userId: viewerId,
        });
      }
    }, 2000);

    return true;
  }

  leave(tarPlayer: Player): void {
    if (this.hasPlayer(tarPlayer)) {
      this.players.forEach((player) => {
        player.socket.leave(this.getName());
        player.socket.emit('message', '대기열에서 나왔습니다.');
      });
    }
  }

  getWinnerLoser(giveupId?: number): { winner: Player; loser: Player } {
    let winner, loser;

    if (giveupId) {
      this.score.set(giveupId, 0);
    }

    if (
      this.score.get(this.players[0].userId) >
      this.score.get(this.players[1].userId)
    ) {
      winner = this.players[0];
      loser = this.players[1];
    } else {
      winner = this.players[1];
      loser = this.players[0];
    }
    return { winner, loser };
  }

  // Socket message
  async noticeToPlayers(event: string, data) {
    for (const player of this.players) {
      await player.socket.emit(event, data);
    }
    for (const viewer of this.viewers) {
      await viewer.socket.emit(event, data);
    }
  }
}
