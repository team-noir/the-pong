import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private prismaService: PrismaService,
		private authService: AuthService,
		private usersService: UsersService
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const jwt: string = this.usersService.getJwt(context.switchToHttp().getRequest());
		const user = await this.usersService.getUserFromJwt(jwt);
		const now: Date = new Date(Date.now());
		
		if (user == null || now > user.ftRefreshExpiresAt)
			return false;
		else if (now > user.ftAccessExpiresAt && now < user.ftRefreshExpiresAt)
			this.authService.refreshToken(user.ftRefreshToken);
		return true;
	}
}
