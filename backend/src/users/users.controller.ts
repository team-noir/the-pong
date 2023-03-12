import { Controller, Get, Post, Res, Req, Session, Param, UseGuards, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
	constructor(
		private authService: AuthService,
		private jwtService: JwtService,
	) {}

	@Get('42')
	@UseGuards(AuthGuard('42'))
	async ftAuth() {}

	@Get('42/return')
	@UseGuards(AuthGuard('42'))
	async auth(@Req() req, @Res({ passthrough: true }) res) {
		this.authService.refreshToken(req.user.ftRefreshToken);
		const jwt = this.jwtService.sign({ 
			id: req.user.id, 
			username: req.user.username 
		});
		await res.cookie('Authorization', jwt);
		
		return { id : req.user.id };
	}

	@Get('whoami')
	@UseGuards(AuthGuard('jwt'))
	async whoami(@Req() req) {
		return req.user;
	}
}
