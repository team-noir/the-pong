import { Game } from "./game.dto";
import { Socket } from "socket.io";

export class Player {
	userId: number;
	username: string;
	level: number;
	socket: Socket;
	blockUser?: Set<number>;
	
	game?: Game;
	gameInvited?: Game;

	constructor(userId: number, username: string, level: number, socket: Socket, blockUser?: number[]) {
		this.userId = userId;
		this.username = username;
		this.level = level;
		this.socket = socket;
		this.blockUser = new Set(blockUser);
	}

	isBlockUser(playerId: number) : boolean {
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

	leaveGame() {
		this.game = null;
	}

	setSocket(socket) {
		this.socket = socket;
	}
}
