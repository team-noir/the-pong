import SearchResultList from 'components/organisms/SearchResult/SearchResultList';
import { UserType } from 'types/userType';

interface Props {
  users: UserType[];
}

export default function SearchResult({ users }: Props) {
  return (
    <>
      <h1>검색 결과</h1>
      <SearchResultList users={users} />
    </>
  );
}
