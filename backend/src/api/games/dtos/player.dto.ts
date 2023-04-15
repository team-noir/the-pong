import { Game } from "./game.dto";

type playerId = number;

export class Player {
	userId: number;
	username: string;
	socket;
	game?: Game;
	blockUser?: Set<playerId>;

	constructor(userId: number, username: string, socket, blockUser?: playerId[]) {
		this.userId = userId;
		this.username = username;
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
}
