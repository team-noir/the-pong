import { Injectable, StreamableFile } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async getUser(userId: number) {
    if (!userId) {
      return null;
    }
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
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
    };
  }

  async downloadProfileImage(userId: number, res: Response) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return;
    }
    const file = createReadStream(
      join(process.cwd(), `profile-images/${user.imageUrl}`)
    );
    const mimetype = user.imageUrl.split('.')[1];
    res.set({
      'Content-Type': `image/${mimetype}`,
      'Content-Disposition': `attachment; filename="${user.imageUrl}"`,
    });
    return new StreamableFile(file);
  }
}
