import { Injectable } from '@nestjs/common';
import * as refresh from 'passport-oauth2-refresh';
import { PrismaService } from '../../prisma/prisma.service';
import { Strategy } from 'passport-42';
const ONESECOND = 1000;

@Injectable()
export class AuthService {
	constructor(
		private prismaService: PrismaService,
	) {}

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

