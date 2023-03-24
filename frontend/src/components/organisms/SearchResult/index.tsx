import { UserType } from 'types/userType';
import SearchResultList from './SearchResultList';

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
