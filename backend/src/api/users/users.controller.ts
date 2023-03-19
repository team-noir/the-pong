import { Controller, Res, Req, Get, Post, UseGuards, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/guards/authenticated.guard';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService
	) {}

	@Get()
	@UseGuards(AuthenticatedGuard)
	async requestProfile(@Query('userId') userId: number) {
		return this.usersService.getUser(userId);
	}

}
