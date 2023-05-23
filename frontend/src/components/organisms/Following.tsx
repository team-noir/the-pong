import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getDmChannel, getMyFollowings, unfollowUser } from 'api/rest.v1';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserList from 'components/molecule/UserList';
import GameInviteButton from 'components/molecule/GameInviteButton';
import Button from 'components/atoms/Button';
import Spinner from 'components/atoms/Spinner';
import ROUTES from 'constants/routes';
import QUERY_KEYS from 'constants/queryKeys';

export default function Following() {
  const navigate = useNavigate();

  const { data, isFetching, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.FOLLOWINGS],
    queryFn: ({ pageParam = null }) => getMyFollowings({ cursor: pageParam }),
    getNextPageParam: ({ paging }) => paging.nextCursor,
    suspense: false,
  });

  const users = data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = !!data?.pages[data.pages.length - 1].paging.nextCursor;

  const getDmChannelMutation = useMutation({
    mutationFn: getDmChannel,
    onSuccess: (data) => navigate(ROUTES.CHANNEL.ROOM(data.id)),
  });

  const unfollowUserMutation = useMutation({
    mutationFn: unfollowUser,
    onSuccess: () => refetch(),
  });

  const handleClickDm = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;
    getDmChannelMutation.mutate(Number(userId));
  };

  const handleClickUnfollow = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;
    unfollowUserMutation.mutate(Number(userId));
  };

  return (
    <section className="section">
      <h2 className="section-title">팔로잉</h2>
      {isFetching && !data ? (
        <Spinner className="flex justify-center mt-2 mb-8" />
      ) : users.length ? (
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasMore}
          dataLength={users.length}
          loader={<Spinner className="flex justify-center pt-2 pb-8" />}
        >
          <UserList
            users={users}
            imageSize={52}
            hasStatus={true}
            buttons={[
              <GameInviteButton key="gameInviteButton" />,
              <Button
                onClick={handleClickDm}
                key="dmButton"
                primary
                size="small"
              >
                메시지 보내기
              </Button>,
              <Button
                key="unfollowButton"
                onClick={handleClickUnfollow}
                linkStyle
                className="text-red"
                size="small"
              >
                언팔로우
              </Button>,
            ]}
          />
        </InfiniteScroll>
      ) : (
        <p className="text-center py-4">팔로우한 회원이 없습니다.</p>
      )}
    </section>
  );
}
