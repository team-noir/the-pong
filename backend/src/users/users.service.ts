import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
	login(): string {
		return 'Login';
	}

	auth(): string {
		return 'auth';
	}

	findFtUser(ftId: string) {

		/*
		prisma.user.findUnique({
			where: userWhereUniqueInput,
		});
		*/

		return true;
	}
}
