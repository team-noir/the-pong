import { useQuery } from '@tanstack/react-query';
import { getMyFollowings } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import Following from 'components/organisms/Following';
import HeaderGnb from 'components/molecule/HeaderGnb';
import QUERY_KEYS from 'constants/queryKeys';

export default function FollowingPage() {
  const { data: followings, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.FOLLOWINGS],
    queryFn: getMyFollowings,
  });

  return (
    <AppTemplate header={<HeaderGnb />}>
      {isSuccess && <Following users={followings} />}
    </AppTemplate>
  );
}
