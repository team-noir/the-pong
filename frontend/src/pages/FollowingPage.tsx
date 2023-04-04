import { useQuery, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getMyFollowings, unfollowUser } from 'api/api.v1';
import Following from 'components/organisms/Following';
import { UserType } from 'types';

export default function FollowingPage() {
  const getMyFollowingQuery = useQuery<UserType[], AxiosError>({
    queryKey: ['getMyFollowing'],
    queryFn: getMyFollowings,
  });

  const unfollowUserMutation = useMutation(unfollowUser);

  const handleClickUnfollow = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;

    const answer = confirm('언팔로우하시겠습니까?');
    if (!answer) return;
    unfollowUserMutation.mutate(Number(userId));
  };

  return (
    <>
      <h1>FollowingPage</h1>
      {getMyFollowingQuery.isLoading && <div>Loading...</div>}
      {getMyFollowingQuery.isError && (
        <div>{getMyFollowingQuery.error.message}</div>
      )}
      {getMyFollowingQuery.isSuccess && (
        <>
          <Following
            users={getMyFollowingQuery.data}
            onClickUnfollow={handleClickUnfollow}
          />
        </>
      )}
    </>
  );
}
