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
	score: Map<userId, number>;

	ownerId: number;
	players: Player[];
	viewers: Player[];
	invitedId: userId;

	countPlayer: number;

	readyTimeout;

	constructor(gameId: number, isLadder?: boolean) {
		this.gameId = gameId;
		this.isLadder = isLadder ? true : false;
		this.isStarted = false;
		this.mode = 0;
		this.theme = 0;
		this.countPlayer = 0;
		this.players = [];
		this.viewers = [];
		this.score = new Map<userId, number>();
		this.createdAt = new Date();
	}

	async readyPlayer(player: Player) {
		if (!this.hasPlayer(player)) { return }

		this.countPlayer++;
		if (this.countPlayer == 2) {
			await this.players[0].socket.emit('rtcInit', { 
				userId: this.players[1].userId,
			});
		}
	}

	getName() : string {
		return `game-${this.gameId}`;
	}

	getPlayers() : Player[] {
		return this.players;
	}

	getOwner() : Player {
		return this.players[0];
	}

	isFull() : boolean {
		return (this.players.length > 1);
	}

	hasPlayer(tarPlayer: Player) : boolean {
		this.players.forEach((player) => {
			if (player.userId == tarPlayer.userId) {
				return true;
			}
		});
		return false;
	}
	
	hasViewer(tarPlayer: Player) : boolean {
		this.viewers.forEach((player) => {
			if (player.userId == tarPlayer.userId) {
				return true;
			}
		});
		return false;
	}

	getMode() {
		return this.mode;
	}

	getTheme() {
		return this.theme;
	}

	setMode(mode: indexKey) {
		if (mode < 0 || mode >= GAME_MODES.size()) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'This is an invalid mode.';
			throw { code, message };
		}
		if (this.mode == mode) { return false; }
		this.mode = mode;
		return true;
	}
	
	setTheme(theme: indexKey) {
		if (theme < 0 || theme >= GAME_THEMES.size()) {
			const code = HttpStatus.BAD_REQUEST;
			const message = 'This is an invalid theme.';
			throw { code, message };
		}
		if (this.theme == theme) { return false; }
		this.theme = theme;
		return true;
	}

	async setStart() {
		this.isStarted = true;
		this.score.set(this.players[0].userId, 0);
		this.score.set(this.players[1].userId, 0);

		await this.noticeToPlayers('gameSetting', {
			text: 'done'
		});
	}

	setScore(player: Player, score: number) {
		this.score.set(player.userId, score);
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

	removeViewer(viewerId: number) {
		this.viewers = this.viewers.filter((viewer) => {
			if (viewer.userId == viewerId) {
				viewer.socket.leave(this.getName());
				return true;
			}
			return false;
		});
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
		if (this.hasPlayer(tarPlayer)) {
			this.players.forEach((player) => {
				player.socket.leave(this.getName());
				
				// socket message
				player.socket.emit('message', '대기열에서 나왔습니다.');
			});
		}
	}

	getWinnerLoser(loserId?: number): { winner: Player, loser: Player } {
		let winner, loser;

		if (loserId) {
			if (loserId != this.players[0].userId) {
				winner = this.players[0];
				loser = this.players[1];
			} else {
				winner = this.players[1];
				loser = this.players[0];
			}
			this.score.set(loserId, 0);
		} else {
			if (this.score.get(this.players[0].userId) 
				> this.score.get(this.players[1].userId)
			) {
				winner = this.players[0];
				loser = this.players[1];
			} else {
				winner = this.players[1];
				loser = this.players[0];
			}
		}
		return { winner, loser };
	}

	// Socket message
	async noticeToPlayers(event: string, data) {
		for (const player of this.players) {
			await player.socket.emit(event, data);
		}
	}

}
