import { Injectable, Res, Req } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

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
		const jwt = this.signJwt(req.user.userId, req.user.username);
		await this.setJwt(res, jwt);
		return { id : req.user.id };
	}

	/* my */

	async whoami(@Req() req) {
		const jwt: string = this.getJwt(req);
		const user = await this.getUserFromJwt(jwt);
		return user;
	}

	/* methods */

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

	
}
