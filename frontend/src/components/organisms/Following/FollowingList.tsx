import FollowingItem from './FollowingItem';
import styles from 'assets/styles/Following.module.css';
import { UserType } from 'types/userType';

interface FollowingListProps {
  followings: UserType[] | null;
}

export default function FollowingList({ followings }: FollowingListProps) {
  return (
    <ul className={styles.ul}>
      {followings &&
        followings.map((following) => {
          return <FollowingItem key={following.id} following={following} />;
        })}
    </ul>
  );
}
