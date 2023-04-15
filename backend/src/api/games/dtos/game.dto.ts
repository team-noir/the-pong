import { Player } from "./player.dto";

type userId = number;

export class Game {
	gameId: number;
	players: Player[];
	isLadder: boolean;
	invitedId: userId;
	readyTimeout;

	constructor(gameId: number, isLadder?: boolean, invitedId?: userId) {
		this.gameId = gameId;
		this.isLadder = isLadder ? true : false;
		this.invitedId = invitedId ? invitedId : 0;
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
			|| (this.invitedId != 0 && this.invitedId != tarPlayer.userId)
		) { 
			return false;
		}
		for (const player of this.players) {
			if (player.isBlockUser(tarPlayer.userId) 
				|| tarPlayer.isBlockUser(player.userId)
			) {
				return false;
			}
		};
		return true;
	}

	removePlayers() {
		for (const player of this.players) {
			player.leaveGame();
	
			// socket message
			player.socket.emit('message', 'disconnected player');
		};
		this.players = [];
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

	leave(tarPlayer: Player) : void {
		if (this.has(tarPlayer)) {
			this.players.forEach((player) => {
				player.socket.leave(this.getName());
				
				// socket message
				player.socket.emit('message', '대기열에서 나왔습니다.');
			});
		}
	}

	// socket 

	noticeToPlayers(event: string, data) {
		this.players.forEach((player) => {
			player.socket.emit(event, data);
		})
	}
}
