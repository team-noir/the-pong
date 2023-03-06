import { PrismaClient, Prisma, User } from '@prisma/client';
const prisma = new PrismaClient();

// 모델 입력을 위한 데이터 정의
const userData: User[] = [
  {
    id: '1',
	key: 'key',
	imageUrl: 'imageUrl',
	nickname: 'nickname',
	rank: 1,
	isTwoFactor: false,
    createdAt: new Date('2022-02-26T11:14:22+09:00')
  },
  {
    id: '2',
	key: 'key',
	imageUrl: 'imageUrl',
	nickname: 'nickname',
	rank: 1,
	isTwoFactor: false,
    createdAt: new Date('2022-02-26T11:14:22+09:00')
  },
  
];

const doSeed = async () => {
  const users = [];
  for (const user of userData) {
    const createusers = prisma.user.create({
      data: user,
    });
    users.push(createusers);
  }
  return await prisma.$transaction(users);
};

const main = async () => {
  console.log(`Start seeding ...`);

  await doSeed();

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
