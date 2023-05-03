import { PrismaClient, Prisma } from './index';

const prisma = new PrismaClient();

const achievementData: Prisma.AchievementCreateInput[] = [
  {
    title: '돌이킬 수 없는 업보의 시작',
    condition: '처음으로 게임에서 승리했습니다.',
    description: '어둠의 세계에 발을 들인 이상 복수는 완성되어야 합니다.',
  },
  {
    title: '피도 눈물도 없는 자',
    condition: '상대가 0점인 상태로 게임에서 승리했습니다.',
    description: '강한 자만이 살아남는 세계에서 자비는 사치일 뿐.',
  },
  {
    title: '끝나지 않는 복수',
    condition: '일반 게임을 10회 플레이했습니다.',
    description:
      '피로 더럽혀진 손을 씻어도 냄새는 사라지지 않습니다. 복수의 끝이 멀지 않았군요.',
  },
  {
    title: '뒷골목의 새끼 고양이',
    condition: '승급전을 1회 플레이했습니다.',
    description: '복수의 서막이 열렸습니다. 아직은 애송이로군요.',
  },
  {
    title: '완전한 복수',
    condition: '42 레벨을 달성했습니다.',
    description: '“나는 악하지 않아. 세상이 날 그렇게 만들었지.”',
  },
  {
    title: '친구는 가까이, 적은 더 가까이',
    condition: '처음으로 다른 회원을 팔로우했습니다.',
    description: '그는 당신의 친구일까요, 적일까요?',
  },
  {
    title: '방어는 최고의 공격',
    condition: '2FA를 설정해서 계정의 보안 단계를 높였습니다.',
    description: '살아남는 자가 이기는 법.',
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const a of achievementData) {
    const id = achievementData.indexOf(a) + 1;
    const achievement = await prisma.achievement.upsert({
      where: { id },
      update: {},
      create: a,
    });
    console.log(`Created achievement with id: ${achievement.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
