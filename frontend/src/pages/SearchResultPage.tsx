import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import SearchResult from 'components/organisms/SearchResult';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();

  const getUsersQuery = useQuery({
    queryKey: ['search', searchParams.get('q')],
    queryFn: () => getUsers(searchParams.get('q') || ''),
  });

  return (
    <AppTemplate header={<HeaderGnb />}>
      <h1>SearchResultPage</h1>
      <p>검색어: {searchParams.get('q')}</p>
      {getUsersQuery.isSuccess && <SearchResult users={getUsersQuery.data} />}
    </AppTemplate>
  );
}
