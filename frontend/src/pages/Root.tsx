import { Outlet } from 'react-router-dom';
import AppTemplate from 'components/templates/AppTemplate';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function Root() {
  return (
    <>
      <AppTemplate header={<HeaderGnb />}>
        <Outlet />
      </AppTemplate>
    </>
  );
}
