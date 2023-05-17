import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FtOauthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activate: boolean = (await super.canActivate(context)) as boolean;
    return activate;
  }
}
