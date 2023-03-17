import { Controller, Get, Post, Res, Req, Session, Param, UseGuards, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';
import { FtOauthGuard } from './guards/ft-oauth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('users')
export class UsersController {
	constructor(
		private authService: AuthService,
		private jwtService: JwtService,
	) {}

	@Get('42')
	@UseGuards(FtOauthGuard)
	async ftAuth() {}

	@Get('42/return')
	@UseGuards(FtOauthGuard)
	async auth(@Req() req, @Res({ passthrough: true }) res) {
		this.authService.refreshToken(req.user.ftRefreshToken);
		const jwt = this.jwtService.sign({ 
			id: req.user.id, 
			username: req.user.username 
		});
		await res.cookie('Authorization', jwt, { httpOnly: true });
		res.redirect(process.env.REACT_APP_API_URL);
	}

	@Get('whoami')
	@UseGuards(AuthenticatedGuard)
	async whoami(@Req() req) {
		return req.user;
	}
}
