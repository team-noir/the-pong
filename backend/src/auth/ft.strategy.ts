import { Strategy } from 'passport-42';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class FTStrategy extends PassportStrategy(Strategy, '42') {
	constructor(
		private authService: AuthService
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
		const user = {
			ftId: id,
			ftUsername: username,
			ftDisplayName: displayName,
			accessToken,
			refreshToken,
		};
		const isValidate = this.authService.validateUser(user.ftId);
		done(null, isValidate ? user : null);
	}
}
