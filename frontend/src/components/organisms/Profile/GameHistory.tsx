import { useInfiniteQuery } from '@tanstack/react-query';
import { getGameHistories } from 'api/rest.v1';
import InfiniteScroll from 'react-infinite-scroll-component';
import GameHistoryList from 'components/molecule/GameHistoryList';
import Spinner from 'components/atoms/Spinner';
import QUERY_KEYS from 'constants/queryKeys';

interface Props {
  userId: number;
}

export default function GameHistory({ userId }: Props) {
  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GAME_HISTORY, String(userId)],
    queryFn: ({ pageParam = null }) =>
      getGameHistories({ userId, paging: { cursor: pageParam } }),
    getNextPageParam: ({ paging }) => paging.nextCursor,
    suspense: false,
  });

  const histories = data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = !!data?.pages[data.pages.length - 1].paging.nextCursor;

  return (
    <section className="section">
      <h2 className="section-title">게임 히스토리</h2>
      {isFetching && !data ? (
        <Spinner className="flex justify-center mt-2 mb-8" />
      ) : histories.length ? (
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasMore}
          dataLength={histories.length}
          loader={<Spinner className="flex justify-center pt-2 pb-8" />}
          style={{ overflow: 'unset' }}
        >
          <GameHistoryList histories={histories} userId={userId} />
        </InfiniteScroll>
      ) : (
        <p className="block mt-4 text-center text-gray">
          게임 히스토리가 없습니다.
        </p>
      )}
    </section>
  );
}
