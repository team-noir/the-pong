import { Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { SettingDto } from './dtos/setting.dto';
import { MyDto } from './dtos/my.dto';
import { User } from '@prisma';

@Injectable()
export class MyService {
  constructor(
    private authService: AuthService,
    private prismaService: PrismaService
  ) {}

  async whoami(@Req() req): Promise<MyDto> {
    const user: User = await this.authService.getUserFromJwt(req);
    if (!user) {
      return null;
    }
    return this.userToMyDto(user);
  }

  async setMyProfile(@Req() req, data: SettingDto): Promise<MyDto> {
    const user: User = await this.authService.getUserFromJwt(req);

    return this.userToMyDto(user);
  }

  async setUser(userId: number, content: SettingDto): Promise<User> {
    const result: User = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...content,
        updatedAt: new Date(),
      },
    });
    return result;
  }

  userToMyDto(user: User): MyDto {
    const my: MyDto = {
      id: user.id,
      nickname: user.nickname,
      rank: user.rank,
      isTwoFactor: user.isTwoFactor,
      ftUsername: user.ftUsername,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
    return my;
  }
}
