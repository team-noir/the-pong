import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import * as refresh from 'passport-oauth2-refresh';
import { PrismaService } from '../../prisma/prisma.service';
import { Strategy } from 'passport-42';
import { Response } from 'express';

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
				const atExpiresAt = new Date((results.created_at + results.expires_in) * 1000);
				const rtExpiresAt = new Date((results.created_at + results.expires_in * 84) * 1000);
				const result = await prisma.user.update({
					where: { ftRefreshToken: refreshToken },
					data: { 
						ftAccessToken: newAccessToken,
						ftRefreshToken: newRefreshToken,
						ftATExpiresAt: atExpiresAt,
						ftRTExpiresAt: rtExpiresAt
					}
				});
			}
		);
	}
}

