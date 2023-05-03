import { Injectable, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as refresh from 'passport-oauth2-refresh';
import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@prisma';
import { Strategy } from 'passport-42';
import { Response } from 'express';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { JwtPayloadDto } from './dtos/jwtPayload.dto';
import { ONESECOND } from '@const';
import { MyDto } from '../my/dtos/my.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService
  ) {}

  async auth(@Req() req, @Res() res) {
    this.refreshToken(req.user.ftRefreshToken);
    const jwt = this.signJwt({
      id: req.user.id,
      nickname: req.user.nickname,
      isTwoFactor: req.user.isTwoFactor,
      isVerifiedTwoFactor: false,
    });
    await this.setJwt(res, jwt);
    if (req.user.isTwoFactor) {
      res.redirect(`${process.env.CLIENT_APP_URL}/2fa`);
    }
    res.redirect(process.env.CLIENT_APP_URL);
  }

  async logout(@Res() res) {
    await this.removeJwt(res);
  }

  generateRandomString(num) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
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

    while (
      (find = await this.prismaService.user.findUnique({
        where: { id: userId },
      }))
    ) {
      userId++;
    }

    const user = await this.prismaService.user.create({
      data: {
        id: userId,
        ftId: `${userId}`,
        nickname: this.generateRandomString(10),
      },
    });

    const jwt = this.signJwt({
      id: user.id,
      nickname: user.nickname,
      isTwoFactor: false,
      isVerifiedTwoFactor: false,
    });
    await this.setJwt(res, jwt);
    res.redirect(process.env.CLIENT_APP_URL);
  }

  signJwt(payload: JwtPayloadDto): string {
    return this.jwtService.sign(payload);
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
      isTwoFactor: payload['isTwoFactor'],
      isVerifiedTwoFactor: payload['isVerifiedTwoFactor'],
    };
    return result;
  }

  getJwtPayloadFromReq(@Req() req: Request) {
    const jwt: string = this.getJwt(req);
    if (!jwt) {
      return null;
    }
    return this.getJwtPayload(jwt);
  }

  async getUserFromJwt(@Req() req: Request): Promise<User> {
    const payload: JwtPayloadDto = this.getJwtPayloadFromReq(req);
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

  userToMyDto(user: User, isVerifiedTwoFactor: boolean): MyDto {
    return {
      id: user.id,
      nickname: user.nickname,
      level: user.level,
      isTwoFactor: user.isTwoFactor,
      isVerifiedTwoFactor,
      ftUsername: user.ftUsername,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async authWhoami(@Req() req): Promise<MyDto | null> {
    const payload = await this.getJwtPayloadFromReq(req);
    if (!payload) return null;
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
    });
    return this.userToMyDto(user, payload.isVerifiedTwoFactor);
  }

  /** 2FA */

  async generateTwoFaSecret(userId: number) {
    const secret = authenticator.generateSecret();

    const otpauthUrl = authenticator.keyuri(String(userId), 'The Pong', secret);

    await this.setTwoFaSecret(userId, secret);

    return {
      secret,
      otpauthUrl,
      qrCode: await toDataURL(otpauthUrl),
    };
  }

  async verifyTwoFa(userId: number, twoFaCode: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    return authenticator.verify({
      token: twoFaCode,
      secret: user.twoFactorSecret,
    });
  }

  async isTwoFaOn(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    return user.isTwoFactor;
  }

  async turnOnTwoFa(userId: number) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { isTwoFactor: true },
    });
  }

  async setTwoFaSecret(userId: number, secret: string) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { twoFactorSecret: secret },
    });
  }

  async turnOffTwoFa(userId: number) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: { isTwoFactor: false, twoFactorSecret: null },
    });
  }
}
