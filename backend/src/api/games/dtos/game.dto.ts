import { Player } from "./player.dto";

type userId = number;

export class Game {
	gameId: number;
	players: Player[];
	isLadder: boolean;
	invitedId: userId;
	readyTimeout;

	constructor(gameId: number, isLadder?: boolean) {
		this.gameId = gameId;
		this.isLadder = isLadder ? true : false;
		this.players = [];
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
