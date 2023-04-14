import { Game } from "./game.dto";

type playerId = number;

export class Player {
	userId: number;
	socket;
	game?: Game;
	blockUser?: Set<playerId>;

	constructor(userId: number, socket, blockUser?: playerId[]) {
		this.userId = userId;
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
