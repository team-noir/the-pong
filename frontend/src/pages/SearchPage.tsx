import { useSearchParams } from 'react-router-dom';
import AppTemplate from 'components/templates/AppTemplate';
import Search from 'components/organisms/Search';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function SearchPage() {
  return (
    <AppTemplate header={<HeaderGnb />}>
      <Search />
    </AppTemplate>
  );
}
