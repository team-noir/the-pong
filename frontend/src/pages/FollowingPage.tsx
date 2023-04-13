import { useQuery, useMutation } from '@tanstack/react-query';
import { getMyFollowings, unfollowUser } from 'api/api.v1';
import Following from 'components/organisms/Following';

export default function FollowingPage() {
  const getMyFollowingQuery = useQuery({
    queryKey: ['getMyFollowing'],
    queryFn: getMyFollowings,
  });

  const unfollowUserMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => getMyFollowingQuery.refetch(),
  });

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
      {getMyFollowingQuery.isSuccess && (
        <Following
          users={getMyFollowingQuery.data}
          onClickUnfollow={handleClickUnfollow}
        />
      )}
    </>
  );
}
