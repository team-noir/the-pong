import BlocksItem from './BlocksItem';
import styles from 'assets/styles/Blocks.module.css';
import { UserType } from 'types/userType';

interface Props {
  blockedUsers: UserType[] | null;
}

export default function BlocksList({ blockedUsers }: Props) {
  return (
    <ul className={styles.ul}>
      {blockedUsers &&
        blockedUsers.map((user) => {
          return <BlocksItem key={user.id} user={user} />;
        })}
    </ul>
  );
}
