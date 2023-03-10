import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class FTStrategy extends PassportStrategy(Strategy, '42') {
	constructor(
		private authService: AuthService,
		private prismaService: PrismaService
	) {
		super({
			clientID: process.env.FT_UID,
			clientSecret: process.env.FT_SECRET,
			callbackURL: process.env.FT_CB,
		});
	}

	async validate(
		accessToken: string, 
		refreshToken: string, 
		profile: any, 
		done: any
	): Promise<any> {
		const { id, username, displayName } = profile;
		var user: User = await this.authService.validateUser(id);

		if (!user) {
			user = await this.prismaService.user.create({data: {
				ftId: id,
				ftUsername: username,
				ftDisplayName: displayName,
				ftAccessToken: accessToken,
				ftRefreshToken: refreshToken,
			}});
		}
		done(null, user);
	}
}
