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

  async whoami(@Req() req): Promise<MyDto> {
    const user: User = await this.authService.getUserFromJwt(req);
    if (!user) {
      return null;
    }
    return this.userToMyDto(user);
  }

  async setMyProfile(@Req() req, newData: SettingDto): Promise<MyDto> {
    const user: User = await this.authService.getUserFromJwt(req);
    if (!user) {
      return null;
    }
    const newUser: User = await this.setUser(user.id, newData);
    return this.userToMyDto(newUser);
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

  async getFollowing(@Req() req) {
    const { id: userId } = await this.authService.getJwtPayload(req);
    if (!userId) {
      return null;
    }

    const following = await this.prismaService.followUser
      .findMany({
        where: { followerId: userId },
        select: {
          follewee: { select: { id: true, nickname: true } },
        },
      })
      .then((follows) => follows.map((follow) => follow.follewee));

    return following;
  }

  async putFollowing(@Req() req) {
    const { id: myId } = await this.authService.getJwtPayload(req);
    if (!myId) {
      throw new Error('not logged in');
    }

    // check if user exists
    const { userId } = req.params;
    const user = await this.prismaService.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      throw new Error('user not found');
    }

    const following = await this.prismaService.followUser.upsert({
      where: {
        id: {
          followerId: myId,
          followeeId: Number(userId),
        },
      },
      create: {
        followerId: myId,
        followeeId: Number(userId),
      },
      update: {
        followerId: myId,
        followeeId: Number(userId),
      },
    });
    return following;
  }
}
