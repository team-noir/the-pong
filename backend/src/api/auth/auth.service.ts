import { Injectable, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as refresh from 'passport-oauth2-refresh';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../../../prisma/index';
import { Strategy } from 'passport-42';
import { Response } from 'express';
import { JwtPayloadDto } from './dtos/jwtPayload.dto';
import { ONESECOND } from '../../const';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}

  async auth(@Req() req, @Res() res) {
    this.refreshToken(req.user.ftRefreshToken);
    const userId = req.user.id;
    const username = req.user.nickname;
    const jwt = this.signJwt(userId, username);
    await this.setJwt(res, jwt);
    res.redirect(process.env.CLIENT_APP_URL);
  }

  async logout(@Res() res) {
    await this.removeJwt(res);
  }

  generateRandomString(num) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async login(@Res() res) {
    // TODO: 임시로 익명 회원의 id는 10000번부터 시작
    let userId = 10000; 
    let find;
    
    while (find = await this.prismaService.user.findUnique({ where: { id: userId }}))
    { userId++; }

    let user = await this.prismaService.user.create({
      data: {
        id: userId,
        ftId: `${userId}`,
        nickname: this.generateRandomString(10),
      }
    });

    const jwt = this.signJwt(user.id, user.nickname);
    await this.setJwt(res, jwt);
    res.redirect(process.env.CLIENT_APP_URL);
  }

  signJwt(id: number, nickname: string): string {
    return this.jwtService.sign({ id, nickname });
  }

  getJwt(@Req() req): string {
    return req.cookies['Authorization'];
  }

  async setJwt(@Res() res: Response, jwt: string) {
    await res.cookie('Authorization', jwt);
  }

  async verifyJwt(@Res() res: Response, jwt: string): Promise<boolean> {
    try {
      await this.jwtService.verify(jwt);
      return true;
    } catch (error) {
      await this.removeJwt(res);
      return false;
    }
  }

  async removeJwt(@Res() res) {
    await res.clearCookie('Authorization', { path: '/' });
  }

  getJwtPayload(jwt: string) {
    const payload = this.jwtService.decode(jwt);
    if (!payload) {
      return null;
    }
    const result = {
      id: payload['id'],
      nickname: payload['nickname'],
    };
    return result;
  }

  async getJwtPayloadFromReq(@Req() req: Request): Promise<JwtPayloadDto> {
    const jwt: string = this.getJwt(req);
    if (!jwt) {
      return null;
    }
    return await this.getJwtPayload(jwt);
  }

  async getUserFromJwt(@Req() req: Request): Promise<User> {
    const payload: JwtPayloadDto = await this.getJwtPayloadFromReq(req);
    if (!payload) {
      return null;
    }
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
    });
    return user;
  }

  refreshToken(refreshToken: string) {
    const prisma = this.prismaService;

    refresh.use(
      'refresh-42',
      new Strategy(
        {
          clientID: process.env.FT_UID,
          clientSecret: process.env.FT_SECRET,
          callbackURL: process.env.FT_CB,
        },
        () => {
          return;
        }
      )
    );

    refresh.requestNewAccessToken(
      'refresh-42',
      refreshToken,
      async (err, newAccessToken, newRefreshToken, results) => {
        if (err) {
          throw err;
        }
        const accessExpiresAt = new Date(
          (results.created_at + results.expires_in) * ONESECOND
        ); // 2 hours later
        const refreshExpiresAt = new Date(
          (results.created_at + results.expires_in * 84) * ONESECOND
        ); // 7 days later

        await prisma.user.update({
          where: { ftRefreshToken: refreshToken },
          data: {
            ftAccessToken: newAccessToken,
            ftRefreshToken: newRefreshToken,
            ftAccessExpiresAt: accessExpiresAt,
            ftRefreshExpiresAt: refreshExpiresAt,
          },
        });
      }
    );
  }
}
