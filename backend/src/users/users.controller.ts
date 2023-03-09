import { Controller, Get, Post, Res, Req, Session, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
	constructor(private authService: AuthService) {}

	@Get('42')
	@UseGuards(AuthGuard('42'))
	async ftAuth() {}

	@Get('42/return')
	@UseGuards(AuthGuard('42'))
	async auth(@Req() req, @Res({ passthrough: true }) res) {
		const access_token = await (await this.authService.login(req.user)).access_token;
		await res.cookie('Authorization', access_token);
		return req.user;
	}

	@Get('whoami')
	@UseGuards(AuthGuard('jwt'))
	async whoami(@Req() req) {
		return req.user;
	}
}
