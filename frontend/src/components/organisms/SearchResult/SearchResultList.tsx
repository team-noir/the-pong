import SearchResultItem from 'components/organisms/SearchResult/SearchResultItem';
import styles from 'assets/styles/SearchResult.module.css';
import { UserType } from 'types/userType';

interface Props {
  users: UserType[] | null;
}

export default function SearchResultList({ users }: Props) {
  return (
    <ul className={styles.ul}>
      {users &&
        users.map((user) => {
          return <SearchResultItem key={user.id} user={user} />;
        })}
    </ul>
  );
}
