import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../api/auth/auth.service';
import { User } from '@prisma';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const jwt: string = this.authService.getJwt(req);

    if (!await this.authService.verifyJwt(res, jwt)) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return false;
    }
  
    const user: User = await this.authService.getUserFromJwt(req);
    const now: Date = new Date(Date.now());

    if (user == null || now > user.ftRefreshExpiresAt) {
      return false;
    } else if (now > user.ftAccessExpiresAt && now < user.ftRefreshExpiresAt) {
      this.authService.refreshToken(user.ftRefreshToken);
    }
    req.user = user;

    const newJwt = this.authService.signJwt(user.id, user.nickname);
    this.authService.setJwt(res, newJwt);

    return true;
  }
}
