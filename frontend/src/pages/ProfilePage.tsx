import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUser } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import Profile from 'components/organisms/Profile';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function ProfilePage() {
  const { userId } = useParams() as { userId: string };

  const { data: user } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUser(Number(userId)),
  });

  return (
    <AppTemplate header={<HeaderGnb />}>
      {user && <Profile user={user} />}
    </AppTemplate>
  );
}
