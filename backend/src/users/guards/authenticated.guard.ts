import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
		private jwtService: JwtService,
    private prismaService: PrismaService,
    private authService: AuthService,
	) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const jwt: string = req.cookies['Authorization'];
    if (!jwt)
      return false;

    const userId: number = this.jwtService.decode(jwt)['id'];    
    const user = await this.prismaService.user.findUnique({ where: { id: userId }});
    const now: Date = new Date(Date.now());

    if (now > user.ftATExpiresAt && now < user.ftRTExpiresAt)
      this.authService.refreshToken(user.ftRefreshToken);
    else if (now > user.ftRTExpiresAt)
      return false;
    return true;
  }
}
