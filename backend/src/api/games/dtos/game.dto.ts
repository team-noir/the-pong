import { Player } from "./player.dto";
import { HttpStatus } from '@nestjs/common';
import { GAME_MODES, GAME_THEMES } from "@const";

type userId = number;
type indexKey = number;

export class Game {
	gameId: number;
	isLadder: boolean;
	isStarted: boolean;
	mode: indexKey;
	theme: indexKey;
	createdAt: Date;

	ownerId: number;
	players: Player[];
	invitedId: userId;

	readyTimeout;

	constructor(gameId: number, isLadder?: boolean) {
		this.gameId = gameId;
		this.isLadder = isLadder ? true : false;
		this.isStarted = false;
		this.mode = 0;
		this.theme = 0;
		this.players = [];
		this.createdAt = new Date();
	}

	getName() : string {
		return `game-${this.gameId}`;
	}

	getPlayers() : Player[] {
		return this.players;
	}

	isFull() : boolean {
		return (this.players.length > 1);
	}

	has(tarPlayer: Player) : boolean {
		this.players.forEach((player) => {
			if (player.userId == tarPlayer.userId) {
				return true;
			}
		});
		return false;
	}

	setMode(mode: indexKey) {
		if (mode < 0 || mode >= GAME_MODES.size()) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'This is an invalid mode.';
			throw { code, message };
		}
		this.mode = mode;
	}
	
	setTheme(theme: indexKey) {
		if (theme < 0 || theme >= GAME_THEMES.size()) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'This is an invalid theme.';
			throw { code, message };
		}
		this.theme = theme;
	}
	
	// Check isFull, isLadder, isBlocked
	canJoin(tarPlayer: Player, isLadder: boolean) : boolean {
		if (this.isFull() 
			|| (this.isLadder != isLadder)
			|| (this.invitedId && this.invitedId != tarPlayer.userId)
		) { 
			return false;
		}
		for (const player of this.players) {
			if (player.isBlockUser(tarPlayer.userId)) { return false; }
			if (tarPlayer.isBlockUser(player.userId)) { return false; }
		};
		return true;
	}

	removePlayers() {
		for (const player of this.players) {
			player.leaveGame();
			player.socket.emit('message', 'disconnected player');
		};
		this.players = [];
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
			await this.clearGameRoomTimeout();
			await this.noticeToPlayers('queue', {
				text: 'matched',
				gameId: this.gameId
			});
		}
		return true;
	}

	leave(tarPlayer: Player): void {
		if (this.has(tarPlayer)) {
			this.players.forEach((player) => {
				player.socket.leave(this.getName());
				
				// socket message
				player.socket.emit('message', '대기열에서 나왔습니다.');
			});
		}
	}

	// socket 

	async noticeToPlayers(event: string, data) {
		for (const player of this.players) {
			await player.socket.emit(event, data);
		}
	}
}
