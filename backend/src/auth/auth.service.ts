import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	){}

	async validateUser(ftId: string): Promise<any> {
		const user = await this.usersService.findFtUser(ftId);
		return user;
	}

	async login(user: any) {
		const payload = { 
			id: user.ftId,
			username: user.ftUsername,
		};
		return { jwtToken: this.jwtService.sign(payload) };
	}
}

