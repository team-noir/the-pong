import AchievementItem from './AchievementItem';
import styles from 'assets/styles/Achievement.module.css';
import { AchievementType } from 'types/achievementType';

interface Props {
  achievements: AchievementType[] | null;
}

export default function AchievementList({ achievements }: Props) {
  return (
    <ul className={styles.ul}>
      {achievements &&
        achievements.map((achievement) => {
          return (
            <AchievementItem key={achievement.id} achievement={achievement} />
          );
        })}
    </ul>
  );
}
