import { Injectable, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { PrismaService } from '@/prisma/prisma.service';
import { createReadStream } from 'fs';
import { readdir } from 'node:fs/promises';

import { join } from 'path';
import { PROFILE_PATH } from '@const';

import { AppGateway } from '@/app.gateway';

interface getUsersQuery {
  q?: string;
  page?: number;
  per_page?: number;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private appGateway: AppGateway;

  constructor(
    private prismaService: PrismaService,
    private moduleRef: ModuleRef
  ) {}

  async onModuleInit() {
    this.appGateway = await this.moduleRef.get(AppGateway, { strict: false });
  }

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

  async getUsers(myUserId: number, { q, page, per_page }: getUsersQuery) {
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
          level: true,
        },
      })
      .then((users) =>
        Promise.all(
          users.map(async (user) => ({
            id: user.id,
            nickname: user.nickname,
            level: user.level,
            achievements: [],
            games: [],
            isFollowedByMyself: await this.checkFollowed(myUserId, user.id),
            isBlockedByMyself: await this.checkBlocked(myUserId, user.id),
          }))
        )
      );
  }

  async getUser(myUserId: number, userId: number) {
    if (!userId) {
      return null;
    }
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nickname: true,
        level: true,
      },
    });
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      nickname: user.nickname,
      level: user.level,
      achievements: [],
      games: [],
      isFollowedByMyself: await this.checkFollowed(myUserId, userId),
      isBlockedByMyself: await this.checkBlocked(myUserId, userId),
    };
  }

  async downloadProfileImage(userId: number) {
    const files = await readdir(
      join(process.cwd(), `${PROFILE_PATH}/${userId}/`)
    ).catch((e) => {
      if (e.code === 'ENOENT') {
        return null;
      }
      throw e;
    });

    const filename: string = files[0];
    const file = createReadStream(
      join(process.cwd(), `${PROFILE_PATH}/${userId}/${filename}`)
    );
    const ext = filename.split('.').pop();

    return {
      file,
      filename,
      mimetype: `image/${ext}`,
    };
  }

  /** Achievements */

  async getAchievements(userId: number) {
    return await this.prismaService.achievement_User
      .findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          achievement: {
            select: {
              title: true,
              condition: true,
              description: true,
            },
          },
          createdAt: true,
        },
      })
      .then((achievements) =>
        achievements.map((achievement) => ({
          id: achievement.id,
          title: achievement.achievement.title,
          condition: achievement.achievement.condition,
          description: achievement.achievement.description,
          createdAt: achievement.createdAt,
        }))
      );
  }

  async addAchievement(userId: number, achievementId: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const achievement = await this.prismaService.achievement.findUnique({
      where: {
        id: achievementId,
      },
    });
    if (!achievement) {
      throw new Error('Achievement not found');
    }
    return await this.prismaService.achievement_User.upsert({
      where: {
        unique: {
          userId,
          achievementId,
        },
      },
      update: {},
      create: {
        userId,
        achievementId,
      },
    });
  }

  getUserStatus(userId: number) {
    const isOnline = this.appGateway.isUserOnline(userId);
    const isPlaying = this.appGateway.isUserPlaying(userId);
    let status = 'offline';

    if (isPlaying) {
      status = 'game';
    } else if (isOnline) {
      status = 'online';
    }

    return {
      id: userId,
      status: status,
    };
  }
}
