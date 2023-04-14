import { Player } from "./player.dto";

export class Game {
	gameId: number;
	players: Player[];
	isLadder: boolean;
	isInvite: boolean;
	readyTimeout;

	constructor(gameId: number, isLadder?: boolean, isInvite?: boolean) {
		this.gameId = gameId;
		this.isLadder = isLadder ? true : false;
		this.isInvite = isInvite ? true : false;
		this.players = [];
	}

	getName() : string {
		return `game-${this.gameId}`;
	}

	getPlayers() : Player[] {
		return this.players;
	}

	removePlayers() {
		for (const player of this.players) {
			player.leaveGame();
	
			// socket message
			player.socket.emit('message', 'disconnected player');
		};
		this.players = [];
	}

	noticeToPlayers(event: string, data) {
		this.players.forEach((player) => {
			player.socket.emit(event, data);
		})
	}

	has(tarPlayer: Player) : boolean {
		this.players.forEach((player) => {
			if (player.userId == tarPlayer.userId) {
				return true;
			}
		});
		return false;
	}

	isFull() : boolean {
		return (this.players.length > 1);
	}

	join(player: Player, isLadder: boolean) : boolean {
		if (!this.canJoin(player, isLadder)) { 
			return false; 
		}
		this.players.push(player);
		player.socket.join(this.getName());
		if (this.isFull()) {
			this.noticeToPlayers('queue', {
				text: 'matched',
				gameId: this.gameId
			});
		}
		return true;
	}

	// Check isFull, isLadder, isBlocked
	canJoin(tarPlayer: Player, isLadder: boolean) : boolean {
		if (this.isFull() || (this.isLadder != isLadder)) { 
			return false; 
		}
		this.players.forEach((player) => {
			if (player.isBlockUser(tarPlayer.userId) || tarPlayer.isBlockUser(player.userId)) {
				return false;
			}
		});
		return true;
	}

	leave(tarPlayer: Player) : void {
		if (this.has(tarPlayer)) {
			this.players.forEach((player) => {
				player.socket.leave(this.getName());
				
				// socket message
				player.socket.emit('message', '대기열에서 나왔습니다.');
			});
		}
	}
}
