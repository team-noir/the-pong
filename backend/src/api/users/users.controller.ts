import { Controller, Res, Req, Get, Post, UseGuards, } from '@nestjs/common';
import { FtOauthGuard } from '../../guards/ft-oauth.guard';
import { ApiOperation, ApiTags, ApiResponse, ApiProperty, ApiHeader, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(
		private usersService: UsersService
	) {}

	@Get('42')
	@ApiBearerAuth()
	@ApiOperation({ summary: 'Sign in 42 api' })
	@UseGuards(FtOauthGuard)
	async ftAuth() {}

	@Get('42/return')
	@ApiOperation({ summary: '42 api callback' })
	@ApiResponse({ status: 200, description: 'Get access token' })
	@ApiHeader({ name: 'Authorization', description: 'jwt' })
	@UseGuards(FtOauthGuard)
	async auth(@Req() req, @Res({ passthrough: true }) res) {
		return this.usersService.auth(req, res);
	}
}
