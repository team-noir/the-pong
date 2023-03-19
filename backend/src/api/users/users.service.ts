import { Injectable, Res, Req } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(
		private prismaService: PrismaService,
	) {}	

	async getUser(userId: number) {
		const user = await this.prismaService.user.findUnique({ 
			where: { id: Number(userId) }
		});
		
		return {
			id: user.id,
			nickname: user.nickname,
			rank: user.rank,
			achievements: [],
			games: []
		}
	}
}
