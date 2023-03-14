import { useEffect, useState } from 'react';
import AchievementList from './AchievementList';
import { UserType } from 'types/userType';
import { AchievementType } from 'types/achievementType';

const dummyAchievementData: AchievementType[] = [
  {
    id: '0',
    title: '업적 제목0',
    description: '업적 달성 조건에 대한 설명입니다.',
  },
  {
    id: '1',
    title: '업적 제목1',
    description: '업적 달성 조건에 대한 설명입니다.',
  },
  {
    id: '2',
    title: '업적 제목2',
    description: '업적 달성 조건에 대한 설명입니다.',
  },
];

export default function Achievements({ id: userId }: UserType) {
  const [achievements, setAchievements] = useState<AchievementType[] | null>(
    null
  );

  // TODO: 업적 목록 API에서 가져오기(userId 필요)
  useEffect(() => {
    setAchievements(dummyAchievementData);
  }, []);

  return (
    <>
      <h1>Achievements</h1>
      <AchievementList achievements={achievements} />
    </>
  );
}
