import { Injectable, StreamableFile, Req, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { PrismaService } from 'src/prisma/prisma.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { PROFILE_PATH } from '../../const';

interface RequestWithUser extends Request {
  user: any;
}

interface getUsersQuery {
  q?: string;
  page?: number;
  per_page?: number;
}

@Injectable({ scope: Scope.REQUEST })
export class UsersService {
  constructor(
    @Inject(REQUEST) private readonly request: RequestWithUser,
    private prismaService: PrismaService
  ) {}

  async checkFollowed(
    followerId: number,
    followeeId: number
  ): Promise<boolean> {
    return await this.prismaService.followUser
      .findUnique({
        where: {
          id: {
            followerId,
            followeeId,
          },
        },
      })
      .then((follow) => !!follow);
  }

  async checkBlocked(blockerId: number, blockedId: number): Promise<boolean> {
    return await this.prismaService.blockUser
      .findUnique({
        where: {
          id: {
            blockerId,
            blockedId,
          },
        },
      })
      .then((block) => !!block);
  }

  async getUsers({ q, page, per_page }: getUsersQuery) {
    const myUserId = this.request.user.id;

    const where = q && {
      nickname: {
        contains: q,
      },
    };

    return await this.prismaService.user
      .findMany({
        where,
        skip: (page - 1) * per_page,
        take: per_page,
        select: {
          id: true,
          nickname: true,
          rank: true,
        },
      })
      .then((users) =>
        Promise.all(
          users.map(async (user) => ({
            id: user.id,
            nickname: user.nickname,
            rank: user.rank,
            achievements: [],
            games: [],
            is_followed_by_myself: await this.checkFollowed(myUserId, user.id),
            is_blocked_by_myself: await this.checkBlocked(myUserId, user.id),
          }))
        )
      );
  }

  async getUser(userId: number) {
    const myUserId = this.request.user.id;

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

    return {
      id: user.id,
      nickname: user.nickname,
      rank: user.rank,
      achievements: [],
      games: [],
      is_followed_by_myself: await this.checkFollowed(myUserId, userId),
      is_blocked_by_myself: await this.checkBlocked(myUserId, userId),
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
