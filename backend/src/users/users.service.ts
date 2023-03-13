import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(
		private prismaService: PrismaService
	) {}

	login(): string {
		return 'Login';
	}

	auth(): string {
		return 'auth';
	}
}
