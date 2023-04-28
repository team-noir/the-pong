import AppTemplate from 'components/templates/AppTemplate';
import Main from 'components/organisms/Main';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function MainPage() {
  return (
    <AppTemplate header={<HeaderGnb />}>
      <Main />
    </AppTemplate>
  );
}
