import { Injectable, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SettingDto } from './dtos/setting.dto';
import { MyDto } from './dtos/my.dto';
import { User } from '@prisma';

@Injectable()
export class MyService {
  constructor(private prismaService: PrismaService) {}

  async whoami(@Req() req): Promise<MyDto> {
    return this.userToMyDto(req.user);
  }

  async setMyProfile(@Req() req, newData: SettingDto): Promise<MyDto> {
    const newUser: User = await this.setUser(req.user.id, newData);
    return this.userToMyDto(newUser);
  }

  async uploadProfileImage(userId: number, file) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        imageUrl: file.filename,
        updatedAt: new Date(),
      },
    });
  }

  async setUser(userId: number, newData: SettingDto): Promise<User> {
    const { nickname } = newData;
    const user: User = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        nickname,
        updatedAt: new Date(),
      },
    });
    return user;
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
