import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

const fromAuthCookie = function () {
	return function (request) {
		let token = null;
		if (request && request.cookies) {
			token = request.cookies['Authorization'];
		}
		return token;
	}
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: fromAuthCookie(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub, nickname: payload.nickname };
	}
}
