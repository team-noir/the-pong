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
		const jwtToken = await (await this.authService.login(req.user)).jwtToken;
		await res.cookie('Authorization', jwtToken);
		const user = {
			ftId: req.user.ftId,
			ftUsername: req.user.ftUsername,
			ftDisplayName: req.user.ftDisplayName,
			nickname: req.user.nickname,
			imageUrl: req.user.imageUrl,
			rank: req.user.rank,
			isTwoFactor: req.user.isTwoFactor,
		};
		return user;
	}

	@Get('whoami')
	@UseGuards(AuthGuard('jwt'))
	async whoami(@Req() req) {
		return req.user;
	}
}
