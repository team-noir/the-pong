import { Controller, Res, Req, Get, Post, UseGuards, } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService
	) {}

}
