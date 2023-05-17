import { Injectable, Req, Res } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ChannelsService } from '../channels/channels.service';
import { SettingDto } from './dtos/setting.dto';
import { MyDto } from './dtos/my.dto';
import { Prisma, User } from '@prisma';
import { AuthService } from '../auth/auth.service';
import { readdir, unlink, rmdir } from 'node:fs/promises';
import { PROFILE_PATH } from '@const';
import { JwtPayloadDto } from '../auth/dtos/jwtPayload.dto';
import { PageRequestDto } from '../dtos/pageRequest.dto';
import { PageDto } from '../dtos/page.dto';

@Injectable()
export class MyService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
    private channelService: ChannelsService
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
    if (!user) return null;
    return this.userToMyDto(user, payload.isVerifiedTwoFactor);
  }

  async setMyProfile(
    @Req() req,
    newData: SettingDto,
    @Res() res
  ): Promise<MyDto> {
    const newUser: User = await this.setUser(req.user.id, newData);
    const payload: JwtPayloadDto = this.authService.getJwtPayloadFromReq(req);

    payload.nickname = newUser.nickname;
    await this.authService.setJwt(res, this.authService.signJwt(payload));
    await this.channelService.informToAllChannel(newUser.id);
    this.channelService.updateChannelUser(newUser.id, newUser.nickname);
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

  async getFollowing(@Req() req, query: PageRequestDto) {
    const myUserId = req.user.id;
    if (!myUserId) {
      return null;
    }

    const data = await this.prismaService.followUser
      .findMany({
        where: { followerId: myUserId },
        take: query.getLimit(),
        ...(query.cursor && {
          cursor: { id: {
            followerId: myUserId,
            followeeId: Number(query.cursor)
          }}
        }),
        orderBy: { followeeId: query.getOrderBy() },
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

    const length = await this.prismaService.followUser.count({
      where: { followerId: myUserId },
    });

    const prevData = await this.prismaService.followUser.findMany({
      where: { followerId: Number(myUserId) },
      take: -query.getLimit(),
      skip: 1,
      ...(query.cursor && {
        cursor: { id: {
          followerId: myUserId,
          followeeId: Number(query.cursor)
        }}
      }),
      orderBy: { followeeId: query.getOrderBy() },
      select: {
        follewee: { select: { id: true, nickname: true } },
      },
    });

    let cursor = { prev: null, next: null };
    if (prevData.length == query.getLimit()) {
      cursor.prev = prevData[0].follewee.id;
    }
    if (data.length == query.getLimit()) {
      cursor.next = data[data.length - 1].id;
    }
    const result = new PageDto(length, data);
    result.setPaging(cursor.prev, cursor.next);
    return result;
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

  async getBlocks(@Req() req, query: PageRequestDto) {
    const myUserId = req.user.id;
    if (!myUserId) {
      return null;
    }
    const data = await this.prismaService.blockUser
      .findMany({
        where: { blockerId: myUserId },
        take: query.getLimit(),
        ...(query.cursor && {
          cursor: { id: {
            blockerId: myUserId,
            blockedId: Number(query.cursor)
          }}
        }),
        orderBy: { blockedId: query.getOrderBy() },
        select: {
          blocked: { select: { id: true, nickname: true } },
        },
      })
      .then((follows) => follows.map((follow) => follow.blocked));

      const length = await this.prismaService.blockUser.count({
        where: { blockerId: myUserId },
      });
  
    const prevData = await this.prismaService.blockUser.findMany({
      where: { blockerId: Number(myUserId) },
      take: -query.getLimit(),
      skip: 1,
      ...(query.cursor && {
        cursor: { id: {
          blockerId: myUserId,
          blockedId: Number(query.cursor)
        }}
      }),
      orderBy: { blockedId: query.getOrderBy() },
      select: {
        blocked: { select: { id: true, nickname: true } },
      },
    });

    let cursor = { prev: null, next: null };
    if (prevData.length == query.getLimit()) {
      cursor.prev = prevData[0].blocked.id;
    }
    if (data.length == query.getLimit()) {
      cursor.next = data[data.length - 1].id;
    }
    const result = new PageDto(length, data);
    result.setPaging(cursor.prev, cursor.next);
    return result;
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

    const channelUser = this.channelService.userModel.getUser(myUserId);
    channelUser.blockUser.add(Number(userId));
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
    
    const channelUser = this.channelService.userModel.getUser(myUserId);
    channelUser.blockUser.delete(Number(userId));
    return following;
  }
}
