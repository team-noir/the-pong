import { useSearchParams } from 'react-router-dom';
import SearchResult from 'components/organisms/SearchResult';

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <h1>SearchResultPage</h1>
      <p>검색어: {searchParams.get('q')}</p>
      <SearchResult />
    </>
  );
}
