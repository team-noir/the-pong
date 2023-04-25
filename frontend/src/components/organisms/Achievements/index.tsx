import { useQuery } from '@tanstack/react-query';
import AchievementList from 'components/organisms/Achievements/AchievementList';
import { getAchievements } from 'api/api.v1';
import { AchievementType } from 'types';

interface Props {
  userId: number;
}

export default function Achievements({ userId }: Props) {
  const { data: achievements, isSuccess } = useQuery<AchievementType[]>({
    queryKey: ['getAchievements', userId],
    queryFn: () => getAchievements(userId),
  });

  return (
    <>
      {isSuccess && achievements.length > 0 ? (
        <AchievementList achievements={achievements} />
      ) : (
        <p className="block mt-4 text-center text-gray">
          게임을 플레이하고 업적을 달성해보세요.
        </p>
      )}
    </>
  );
}
