import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../api/auth/auth.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	constructor(
		private authService: AuthService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const jwt: string = this.authService.getJwt(context.switchToHttp().getRequest());
		const user = await this.authService.getUserFromJwt(jwt);
		const now: Date = new Date(Date.now());
		
		if (user == null || now > user.ftRefreshExpiresAt)
			return false;
		else if (now > user.ftAccessExpiresAt && now < user.ftRefreshExpiresAt)
			this.authService.refreshToken(user.ftRefreshToken);
		return true;
	}
}
