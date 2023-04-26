import AchievementItem from 'components/organisms/Achievements/AchievementItem';
import { AchievementType } from 'types';

interface Props {
  achievements: AchievementType[] | null;
}

export default function AchievementList({ achievements }: Props) {
  return (
    <ul className="flex flex-col">
      {achievements &&
        achievements.map((achievement) => {
          return (
            <AchievementItem key={achievement.id} achievement={achievement} />
          );
        })}
    </ul>
  );
}
