import SearchResultItem from 'components/organisms/SearchResult/SearchResultItem';
import { UserType } from 'types';

interface Props {
  users: UserType[] | null;
}

export default function SearchResultList({ users }: Props) {
  return (
    <ul>
      {users &&
        users.map((user) => {
          return <SearchResultItem key={user.id} user={user} />;
        })}
    </ul>
  );
}
