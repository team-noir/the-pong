import { Injectable, StreamableFile, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { PROFILE_PATH } from '../../const';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

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
    const is_followed_by_myself = await this.prismaService.user
      .findUnique({
        where: { id: userId },
      })
      .followees({
        where: {
          followerId: myUserId,
        },
      })
      .then((followees) => followees.length > 0);

    const is_blocked_by_myself = await this.prismaService.user
      .findUnique({
        where: { id: userId },
      })
      .blockers({
        where: {
          blockerId: myUserId,
        },
      })
      .then((blockers) => blockers.length > 0);

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
