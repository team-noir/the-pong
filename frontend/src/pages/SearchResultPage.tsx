import { useSearchParams } from 'react-router-dom';

export default function SearchResultPage() {
  const [searchParams] = useSearchParams();

  return (
    <>
      <h1>SearchResultPage</h1>
      <p>{searchParams.get('q')}</p>
    </>
  );
}
