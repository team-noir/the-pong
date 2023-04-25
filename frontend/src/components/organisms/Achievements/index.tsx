import { useQuery } from '@tanstack/react-query';
import AchievementList from 'components/organisms/Achievements/AchievementList';
import { getAchievements } from 'api/api.v1';
import { AchievementType } from 'types';

interface Props {
  userId: number;
}

export default function Achievements({ userId }: Props) {
  const { data: achievements } = useQuery<AchievementType[]>({
    queryKey: ['getAchievements', userId],
    queryFn: () => getAchievements(userId),
  });

  return <>{achievements && <AchievementList achievements={achievements} />}</>;
}
