import styles from 'assets/styles/Achievement.module.css';
import { AchievementType } from 'types/achievementType';

interface Props {
  achievement: AchievementType;
}

export default function AchievementItem({ achievement }: Props) {
  return (
    <li className={styles.li}>
      <div>{achievement.title}</div>
      <div>{achievement.description}</div>
    </li>
  );
}
