import { useParams } from 'react-router-dom';
import AppTemplate from 'components/templates/AppTemplate';
import Profile from 'components/organisms/Profile';

import HeaderGnb from 'components/molecule/HeaderGnb';

export default function ProfilePage() {
  const { userId } = useParams() as { userId: string };

  return (
    <AppTemplate header={<HeaderGnb />}>
      <Profile userId={Number(userId)} />
    </AppTemplate>
  );
}
