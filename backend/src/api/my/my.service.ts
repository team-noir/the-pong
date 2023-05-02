import { Injectable, Req } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { SettingDto } from './dtos/setting.dto';
import { MyDto } from './dtos/my.dto';
import { Prisma, User } from '@prisma';
import { AuthService } from '../auth/auth.service';
import { readdir, unlink, rmdir } from 'node:fs/promises';
import { PROFILE_PATH } from '@const';

@Injectable()
export class MyService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService
  ) {}

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

  async whoami(@Req() req): Promise<MyDto | null> {
    const payload = await this.authService.getJwtPayloadFromReq(req);
    if (!payload) return null;
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
    });
    return this.userToMyDto(user, payload.isVerifiedTwoFactor);
  }

  async setMyProfile(@Req() req, newData: SettingDto): Promise<MyDto> {
    const newUser: User = await this.setUser(req.user.id, newData);
    const payload = await this.authService.getJwtPayloadFromReq(req);
    return this.userToMyDto(newUser, payload.isVerifiedTwoFactor);
  }

  async checkMyProfile(field: string, value: any): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { [field]: value },
    });
    // return true if there is no duplicate data
    return !user;
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

  async deleteProfileImage(userId: number) {
    this.deleteProfileImageFile(userId);
    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        imageUrl: null,
        updatedAt: new Date(),
      },
    });
  }

  async deleteProfileImageFile(userId: number) {
    try {
      const dir = `${PROFILE_PATH}/${userId}`;
      for (const file of await readdir(dir)) {
        await unlink(`${dir}/${file}`);
      }
      await rmdir(dir);
    } catch (e) {
      // if there is no directory, do nothing
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }
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
    const myUserId = req.user.id;
    if (!myUserId) {
      return null;
    }

    const following = await this.prismaService.followUser
      .findMany({
        where: { followerId: myUserId },
        select: {
          follewee: { select: { id: true, nickname: true } },
        },
      })
      .then((follows) =>
        follows.map((follow) => ({
          ...follow.follewee,
          status: 'offline', // TODO: implement ("online", "offline", "game")
        }))
      );

    return following;
  }

  async putFollowing(@Req() req) {
    const myUserId = req.user.id;

    if (!myUserId) {
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
          followerId: myUserId,
          followeeId: Number(userId),
        },
      },
      create: {
        followerId: myUserId,
        followeeId: Number(userId),
      },
      update: {
        followerId: myUserId,
        followeeId: Number(userId),
      },
    });
    return following;
  }

  async deleteFollowing(@Req() req) {
    const myUserId = req.user.id;
    if (!myUserId) {
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

    const following = await this.prismaService.followUser
      .delete({
        where: {
          id: {
            followerId: myUserId,
            followeeId: Number(userId),
          },
        },
      })
      .catch((e) => {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2025' // NOTE: Record to delete does not exist
        ) {
          throw new Error('not following');
        }
      });
    return following;
  }

  async getBlocks(@Req() req) {
    const myUserId = req.user.id;
    if (!myUserId) {
      return null;
    }
    const following = await this.prismaService.blockUser
      .findMany({
        where: { blockerId: myUserId },
        select: {
          blocked: { select: { id: true, nickname: true } },
        },
      })
      .then((follows) => follows.map((follow) => follow.blocked));
    return following;
  }
  async putBlocks(@Req() req) {
    const myUserId = req.user.id;
    if (!myUserId) {
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
    const following = await this.prismaService.blockUser.upsert({
      where: {
        id: {
          blockerId: myUserId,
          blockedId: Number(userId),
        },
      },
      create: {
        blockerId: myUserId,
        blockedId: Number(userId),
      },
      update: {
        blockerId: myUserId,
        blockedId: Number(userId),
      },
    });
    return following;
  }

  async deleteBlocks(@Req() req) {
    const myUserId = req.user.id;
    if (!myUserId) {
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

    const following = await this.prismaService.blockUser
      .delete({
        where: {
          id: {
            blockerId: myUserId,
            blockedId: Number(userId),
          },
        },
      })
      .catch((e) => {
        if (
          e instanceof Prisma.PrismaClientKnownRequestError &&
          e.code === 'P2025' // NOTE: Record to delete does not exist
        ) {
          throw new Error('not blocked');
        }
      });
    return following;
  }
}
