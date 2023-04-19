import {
	Controller,
	Get,
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
import {
	ApiBody,
	ApiTags,
	ApiOperation,
	ApiOkResponse,
	ApiCreatedResponse,
	ApiUnauthorizedResponse,
	ApiConflictResponse,
	ApiBadRequestResponse,
	ApiNoContentResponse,
} from '@nestjs/swagger';
import { 
	AddUserToQueueDto, 
	InviteUserToGameDto, 
	AnswerInvitationDto, 
	GameSettingInfoDto,
	SetGameSettingDto,
} from './dtos/games.dto';
import { AuthenticatedGuard } from '@/guards/authenticated.guard';
import { GamesService } from './games.service';

@ApiTags('games')
@Controller('games')
export class GamesController {
	constructor(
		private gamesService: GamesService,
	) {}

	@Post('queue')
	@ApiOperation({ summary: 'Add user to queue.' })
	@ApiCreatedResponse({ description: 'The user has been added to the queue.' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
	@ApiConflictResponse({ description: 'The user is already playing the game.' })
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
	@ApiOperation({ summary: 'Cancel game queue.' })
	@ApiNoContentResponse({ description: 'Cancel game queue.' })
	@ApiBadRequestResponse({ description: 'This user is not waiting for a game.' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
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
	@ApiOperation({ summary: 'Invite users to your game.' })
	@ApiCreatedResponse({ description: 'Invite users to your game.' })
	@ApiBadRequestResponse({ description: 'This user cannot be invited.' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
	@ApiConflictResponse({ description: 'This user cannot be invited.' })
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
			res.status(HttpStatus.CREATED);
			return;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}
	
	@Delete('invite')
	@ApiOperation({ summary: 'Cancel the invitation.' })
	@ApiNoContentResponse({ description: 'The invitation has been canceled.' })
	@ApiBadRequestResponse({ description: 'You have not invited other users.' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
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
	@ApiOperation({ summary: 'Respond to the invitation.' })
	@ApiNoContentResponse({ description: 'You have responded to the invitation.' })
	@ApiBadRequestResponse({ description: 'This is not a valid invitation.' })
	@ApiUnauthorizedResponse({ description: 'Unauthorized JWT' })
	@ApiConflictResponse({ description: 'You are participating in another game.' })
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

	@Get(':gameId/setting')
	@ApiOperation({ summary: 'Get game settings.' })
	@ApiOkResponse({ description: 'Get game settings.', type: GameSettingInfoDto })
	@ApiBadRequestResponse({ description: 'This is not a valid invitation.' })
	@UseGuards(AuthenticatedGuard)
	gameSettingInfo(
		@Param('gameId') gameId: number,
		@Res({ passthrough: true }) res
	) {
		try {
			const info = this.gamesService.gameSettingInfo(gameId);
			res.status(HttpStatus.OK);
			return info;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

	@Patch(':gameId/setting')
	@ApiOperation({ summary: 'Change game settings.' })
	@ApiOkResponse({ description: 'Change game settings.', type: GameSettingInfoDto })
	@ApiBadRequestResponse({ description: 'This is not a valid invitation.' })
	@UseGuards(AuthenticatedGuard)
	async setGameSettings(
		@Req() req,
		@Param('gameId') gameId: number,
		@Body() body: SetGameSettingDto,
		@Res({ passthrough: true }) res
	) {
		try {
			const userId = req.user.id;
			await this.gamesService.setGameSettings(userId, gameId, body.mode, body.theme);
			res.status(HttpStatus.NO_CONTENT);
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}


	

}
