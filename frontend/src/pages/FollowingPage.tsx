import { useQuery } from '@tanstack/react-query';
import { getMyFollowings } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import Following from 'components/organisms/Following';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function FollowingPage() {
  const { data: followings } = useQuery({
    queryKey: ['getMyFollowing'],
    queryFn: getMyFollowings,
  });

  return (
    <AppTemplate header={<HeaderGnb />}>
      {followings && <Following users={followings} />}
    </AppTemplate>
  );
}
