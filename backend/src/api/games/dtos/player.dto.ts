import { Game } from './game.dto';
import { Socket } from 'socket.io';

export class Player {
  userId: number;
  username: string;
  level: number;
  socket: Socket;
  blockUser?: Set<number>;

  game?: Game;
  gameInvited?: Game;

  constructor(
    userId: number,
    username: string,
    level: number,
    socket: Socket,
    blockUser?: number[]
  ) {
    this.userId = userId;
    this.username = username;
    this.level = level;
    this.socket = socket;
    this.blockUser = new Set(blockUser);
  }

  isBlockUser(playerId: number): boolean {
    if (!this.blockUser) {
      return false;
    }
    return this.blockUser.has(playerId);
  }

  joinGame(game: Game): boolean {
    if (game && !this.game) {
      this.game = game;
      return true;
    }
    return false;
  }

  async readyGame() {
    if (this.game) {
      await this.game.readyPlayer(this);
    }
  }

  leaveGame() {
    this.game = null;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  reconnectSocket(newSocket: Socket) {
    if (this.socket) {
      this.socket.disconnect(true);
    }
    this.socket = newSocket;
    if (this.game) {
      this.game.reconnectPlayer(this);
    }
  }
}
