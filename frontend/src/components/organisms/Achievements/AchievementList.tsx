import AchievementItem from 'components/organisms/Achievements/AchievementItem';
import { AchievementType } from 'types';
import styles from 'assets/styles/Achievement.module.css';

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
