import { Injectable, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MyService {
  constructor(private authService: AuthService) {}

  async whoami(@Req() req) {
    const jwt: string = this.authService.getJwt(req);
    const user = await this.authService.getUserFromJwt(jwt);
    return user;
  }
}
