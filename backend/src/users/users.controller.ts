import { Controller, Get, Post, Res, Req, Session, Param, UseGuards, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { Request, Response } from 'express';
import { FtOauthGuard } from './guards/ft-oauth.guard';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { ApiOperation, ApiTags, ApiResponse, ApiCookieAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(
		private authService: AuthService,
		private jwtService: JwtService,
	) {}

	@ApiOperation({ summary: '42 api 로그인 요청' })
	@Get('42')
	@UseGuards(FtOauthGuard)
	async ftAuth() {}

	@ApiOperation({ summary: '42 api 리턴 위치' })
	@ApiResponse({
		status: 200,
		description: '성공적으로 로그인되어 cookie에 jwt가 생성됩니다.',
	})
	@Get('42/return')
	@UseGuards(FtOauthGuard)
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
	@UseGuards(AuthenticatedGuard)
	async whoami(@Req() req) {
		return req.user;
	}
}
