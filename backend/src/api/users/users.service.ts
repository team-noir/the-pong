import { Injectable, StreamableFile, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { PROFILE_PATH } from '../../const';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async checkFollowed(
    followerId: number,
    followeeId: number
  ): Promise<boolean> {
    const isFollowed = await this.prismaService.followUser.findUnique({
      where: {
        id: {
          followerId,
          followeeId,
        },
      },
    });
    return !!isFollowed;
  }

  async checkBlocked(blockerId: number, blockedId: number): Promise<boolean> {
    const isBlocked = await this.prismaService.blockUser.findUnique({
      where: {
        id: {
          blockerId,
          blockedId,
        },
      },
    });
    return !!isBlocked;
  }

  async getUser(@Req() req, userId: number) {
    const myUserId = req.user.id;

    if (!userId) {
      return null;
    }
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nickname: true,
        rank: true,
      },
    });
    if (!user) {
      return null;
    }
    const is_followed_by_myself = await this.checkFollowed(myUserId, userId);
    const is_blocked_by_myself = await this.checkBlocked(myUserId, userId);

    return {
      id: user.id,
      nickname: user.nickname,
      rank: user.rank,
      achievements: [],
      games: [],
      is_followed_by_myself,
      is_blocked_by_myself,
    };
  }

  async downloadProfileImage(userId: number, res: Response) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user || !user.imageUrl) {
      return;
    }
    const file = createReadStream(
      join(process.cwd(), `${PROFILE_PATH}${user.imageUrl}`)
    );
    const mimetype = user.imageUrl.split('.')[1];
    res.set({
      'Content-Type': `image/${mimetype}`,
      'Content-Disposition': `attachment; filename="${user.imageUrl}"`,
    });
    return new StreamableFile(file);
  }
}
