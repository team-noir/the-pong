import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
