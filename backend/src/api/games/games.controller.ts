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
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { GamesService } from './games.service';
import { AddUserToQueueDto } from './dtos/games.dto';

@Controller('games')
export class GamesController {
	constructor(private gamesService: GamesService) {}

	@Post('queue')
	@UseGuards(AuthenticatedGuard)
	addUserToQueue(
		@Req() req,
		@Body() body : AddUserToQueueDto,
		@Res({ passthrough: true }) res
	) {
		try {
			const isLadder = body.isLadder;
			this.gamesService.addUserToQueue(req.user.id, isLadder);
			res.status(HttpStatus.NO_CONTENT);
			return;
		} catch (error) {
			throw new HttpException(error.message, error.code);
		}
	}

}
