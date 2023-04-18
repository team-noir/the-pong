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
    const { isVerifiedTwoFactor } = await this.authService.getJwtPayloadFromReq(
      req
    );
    const now: Date = new Date(Date.now());

    if (user === null) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return false;
    }

    // TODO: 임시로 익명 회원의 id는 10000번부터 시작
    if (user && user.id >= 10000) {
      req.user = user;
      const newJwt = this.authService.signJwt({
        id: user.id,
        nickname: user.nickname,
        isTwoFactor: false,
        isVerifiedTwoFactor: false,
      });
      this.authService.setJwt(res, newJwt);
      return true;
    }

    if (user.isTwoFactor && !isVerifiedTwoFactor) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return false;
    }

    if (now > user.ftRefreshExpiresAt) {
      res.status(HttpStatus.UNAUTHORIZED).send();
      return false;
    } else if (now > user.ftAccessExpiresAt && now < user.ftRefreshExpiresAt) {
      try {
        this.authService.refreshToken(user.ftRefreshToken);
      } catch (err) {
        console.log(err);
      }
    }
    req.user = user;
    const newJwt = this.authService.signJwt({
      id: user.id,
      nickname: user.nickname,
      isTwoFactor: user.isTwoFactor,
      isVerifiedTwoFactor,
    });
    this.authService.setJwt(res, newJwt);
    return true;
  }
}
