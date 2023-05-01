import { useQuery } from '@tanstack/react-query';
import { getMyFollowings } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import Following from 'components/organisms/Following';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function FollowingPage() {
  const { data: followings, isSuccess } = useQuery({
    queryKey: ['myFollowings'],
    queryFn: getMyFollowings,
  });

  return (
    <AppTemplate header={<HeaderGnb />}>
      {isSuccess && <Following users={followings} />}
    </AppTemplate>
  );
}
