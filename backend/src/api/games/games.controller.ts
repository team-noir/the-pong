import {
	Controller,
	Post,
	Patch,
	Delete,
	Req,
	Body,
	Param,
	Res,
	UseGuards,
	HttpException,
	HttpStatus
} from '@nestjs/common';
import { AuthenticatedGuard } from '@/guards/authenticated.guard';
import { GamesService } from './games.service';
import { AddUserToQueueDto, InviteUserToGameDto, AnswerInvitationDto } from './dtos/games.dto';

@Controller('games')
export class GamesController {
	constructor(
		private gamesService: GamesService,
	) {}

	@Post('queue')
	@UseGuards(AuthenticatedGuard)
	async addUserToQueue(
		@Req() req,
		@Body() body : AddUserToQueueDto,
		@Res({ passthrough: true }) res
	) {
		try {
			const isLadder = body.isLadder;
			await this.gamesService.addUserToQueue(req.user.id, isLadder);
			res.status(HttpStatus.CREATED);
			return;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}
	
	@Delete('queue')
	@UseGuards(AuthenticatedGuard)
	removeUserFromQueue(
		@Req() req,
		@Res({ passthrough: true }) res
	) {
		try {
			this.gamesService.removeUserFromQueue(req.user.id);
			res.status(HttpStatus.NO_CONTENT);
			return;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	@Post('invite')
	@UseGuards(AuthenticatedGuard)
	async inviteUserToGame(
		@Req() req,
		@Body() body : InviteUserToGameDto,
		@Res({ passthrough: true }) res
	) {
		try {
			const userId = req.user.id;
			const invitedUserId = body.userId;
			await this.gamesService.inviteUserToGame(userId, invitedUserId);
			res.status(HttpStatus.NO_CONTENT);
			return;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}
	
	@Delete('invite')
	@UseGuards(AuthenticatedGuard)
	cancelInvitation(
		@Req() req,
		@Res({ passthrough: true }) res
	) {
		try {
			const userId = req.user.id;
			this.gamesService.cancelInvitation(userId);
			res.status(HttpStatus.NO_CONTENT);
			return;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	@Patch(':gameId/invite')
	@UseGuards(AuthenticatedGuard)
	async answerInvitation(
		@Req() req,
		@Param('gameId') gameId: number,
		@Body() body: AnswerInvitationDto,
		@Res({ passthrough: true }) res
	) {
		try {
			const userId = req.user.id;
			await this.gamesService.answerInvitation(userId, gameId, body.isAccepted);
			res.status(HttpStatus.NO_CONTENT);
			return;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	

}
