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

    const user: User = await this.authService.getUserFromJwt(req);
    const payload = await this.authService.getJwtPayloadFromReq(req);
    const now: Date = new Date(Date.now());

    if (!user || !payload) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return false;
    }

    if (user.isTwoFactor && !payload.isVerifiedTwoFactor) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return false;
    }

    // TODO: Refresh google oauth token
    if (user.googleRefreshToken && now > user.googleRefreshExpiresAt) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return false;
    } else if (user.googleRefreshToken && now > user.googleAccessExpiresAt && now < user.googleRefreshExpiresAt) {
      try {
        this.authService.refreshToken(user.googleRefreshToken);
      } catch (err) {
        console.log(err);
      }
    }

    req.user = user;
    const newJwt = this.authService.signJwt({
      id: user.id,
      nickname: user.nickname,
      isTwoFactor: user.isTwoFactor,
      isVerifiedTwoFactor: payload.isVerifiedTwoFactor,
    });
    this.authService.setJwt(res, newJwt);
    return true;
  }
}
