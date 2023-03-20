import { Injectable, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as refresh from 'passport-oauth2-refresh';
import { PrismaService } from '../../prisma/prisma.service';
import { Strategy } from 'passport-42';
const ONESECOND = 1000;

@Injectable()
export class AuthService {
	constructor(
		private jwtService: JwtService,
		private prismaService: PrismaService,
	) {}

	async auth(@Req() req, @Res({ passthrough: true }) res) {
		this.refreshToken(req.user.ftRefreshToken);
		const jwt = this.signJwt(req.user.userId, req.user.username);
		await this.setJwt(res, jwt);
		res.redirect(process.env.CLIENT_APP_URL);
	}

	signJwt(id: number, username: string): string {
		return this.jwtService.sign({ id, username });
	}

	getJwt(@Req() req): string {
		return req.cookies['Authorization'];
	}

	async setJwt(@Res({ passthrough: true }) res, jwt: string) {
		await res.cookie('Authorization', jwt);
	}

	async getUserFromJwt(jwt: string) {
		if (jwt.length == 0) { return null; }
		const userId: number = this.jwtService.decode(jwt)['id'];    
		const user = await this.prismaService.user.findUnique({ 
			where: { id: userId }
		});
		return user;
	}

	refreshToken(refreshToken: string) {
		const prisma = this.prismaService;

		refresh.use(
			'refresh-42', 
			new Strategy({
				clientID: process.env.FT_UID,
				clientSecret: process.env.FT_SECRET,
				callbackURL: process.env.FT_CB,
			}, function() {} )
		);

		refresh.requestNewAccessToken(
			'refresh-42', 
			refreshToken, 
			async (err, newAccessToken, newRefreshToken, results) => {
				const accessExpiresAt = new Date((results.created_at + results.expires_in) * ONESECOND);	// 2 hours later
				const refreshExpiresAt = new Date((results.created_at + results.expires_in * 84) * ONESECOND);	// 7 days later

				await prisma.user.update({
					where: { ftRefreshToken: refreshToken },
					data: { 
						ftAccessToken: newAccessToken,
						ftRefreshToken: newRefreshToken,
						ftAccessExpiresAt: accessExpiresAt,
						ftRefreshExpiresAt: refreshExpiresAt
					}
				});
			}
		);
	}
}

