import { Injectable, Res, Req } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
	constructor(
		private jwtService: JwtService,
		private prismaService: PrismaService,
		private authService: AuthService,
	) {}

	/* users */

	async auth(@Req() req, @Res({ passthrough: true }) res) {
		this.authService.refreshToken(req.user.ftRefreshToken);
		const jwt = this.authService.signJwt(req.user.userId, req.user.username);
		await this.authService.setJwt(res, jwt);
		res.redirect(process.env.CLIENT_APP_URL);
	}
	
}
