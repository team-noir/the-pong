import { useSearchParams } from 'react-router-dom';
import SearchResult from 'components/organisms/SearchResult';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from 'api/api.v1';
import { UserType } from 'types/userType';
import { AxiosError } from 'axios';

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();

  const getUsersQuery = useQuery<UserType[], AxiosError>({
    queryKey: ['search', searchParams.get('q')],
    queryFn: () => getUsers(searchParams.get('q') || ''),
  });

  return (
    <>
      <h1>SearchResultPage</h1>
      <p>검색어: {searchParams.get('q')}</p>
      {getUsersQuery.isLoading && <div>Loading...</div>}
      {getUsersQuery.isError && <div>{getUsersQuery.error.message}</div>}
      {getUsersQuery.isSuccess && <SearchResult users={getUsersQuery.data} />}
    </>
  );
}
