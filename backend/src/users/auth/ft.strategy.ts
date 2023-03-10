import { Strategy, Profile, VerifyCallback } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FTStrategy extends PassportStrategy(Strategy, '42') {
	constructor(
		private prismaService: PrismaService
	) {
		var options = {
			clientID: process.env.FT_UID,
			clientSecret: process.env.FT_SECRET,
			callbackURL: process.env.FT_CB,
			passReqToCallback: true,
		};
		super(options);
	}

	async validate(
		request: Object,
		accessToken: string, 
		refreshToken: string, 
		profile: Profile, 
		done: VerifyCallback
	): Promise<any> {
		const { id, username } = profile;
		const user = await this.prismaService.user.upsert({
			create: {
				ftId: id,
				ftUsername: username,
				ftAccessToken: accessToken,
				ftRefreshToken: refreshToken,
			},
			update: {
				ftAccessToken: accessToken,
				ftRefreshToken: refreshToken,
			},
			where: {
				ftId: id
			}
		})

		done(null, user);
	}
}
