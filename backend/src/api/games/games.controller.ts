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
import { AuthenticatedGuard } from '../../guards/authenticated.guard';
import { GamesService } from './games.service';
import { AddUserToQueueDto } from './dtos/games.dto';
import { ChannelsService } from '../channels/channels.service';
import { Player } from './games.service';

@Controller('games')
export class GamesController {
	constructor(
		private gamesService: GamesService,
		private channelsService: ChannelsService
	) {}

	@Post('queue')
	@UseGuards(AuthenticatedGuard)
	addUserToQueue(
		@Req() req,
		@Body() body : AddUserToQueueDto,
		@Res({ passthrough: true }) res
	) {
		try {
			const user = this.channelsService.userModel.getUser(req.user.id);
			const player = new Player(user.id, user.socket);
			const isLadder = body.isLadder;
			this.gamesService.addUserToQueue(player, isLadder);
			res.status(HttpStatus.NO_CONTENT);
			return;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

}
