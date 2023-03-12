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
			function(err, newAccessToken, newRefreshToken, results) {
				prisma.user.update({
					where: { ftRefreshToken: refreshToken },
					data: { 
						ftAccessToken: newAccessToken,
						ftRefreshToken: newRefreshToken,
						ftTokenExpiresAt: results.created_at + results.expires_in
					}
				});
			}
		);
	}
}

