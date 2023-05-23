import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getMyBlocks, unblockUser } from 'api/rest.v1';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserList from 'components/molecule/UserList';
import Button from 'components/atoms/Button';
import Spinner from 'components/atoms/Spinner';
import QUERY_KEYS from 'constants/queryKeys';

export default function SettingBlocks() {
  const { data, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.BLOCKS],
    queryFn: ({ pageParam = null }) => getMyBlocks({ cursor: pageParam }),
    getNextPageParam: ({ paging }) => paging.nextCursor,
  });

  const users = data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = !!data?.pages[data.pages.length - 1].paging.nextCursor;

  const unblockUserMutation = useMutation({
    mutationFn: unblockUser,
    onSuccess: () => refetch(),
  });

  const handleClickUnblock = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;
    unblockUserMutation.mutate(Number(userId));
  };

  return (
    <>
      {users.length ? (
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasMore}
          dataLength={users.length}
          loader={<Spinner className="flex justify-center pt-2 pb-8" />}
        >
          <UserList
            users={users}
            imageSize={52}
            buttons={[
              <Button
                key="unblockButton"
                onClick={handleClickUnblock}
                secondary
                size="small"
              >
                차단 해제
              </Button>,
            ]}
          />
        </InfiniteScroll>
      ) : (
        <p className="text-center py-4">차단한 회원이 없습니다.</p>
      )}
    </>
  );
}
