import { AchievementType } from 'types';

interface Props {
  achievement: AchievementType;
}

export default function AchievementItem({ achievement }: Props) {
  return (
    <li>
      <div>{achievement.title}</div>
      <div>{achievement.description}</div>
    </li>
  );
}
