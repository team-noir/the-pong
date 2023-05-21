import { useInfiniteQuery } from '@tanstack/react-query';
import { getGames } from 'api/rest.v1';
import InfiniteScroll from 'react-infinite-scroll-component';
import GameButtons from 'components/organisms/GameButtons';
import GameList from 'components/organisms/GameList';
import Spinner from 'components/atoms/Spinner';
import QUERY_KEYS from 'constants/queryKeys';

export default function GameLobby() {
  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.GAMES, 'lobby'],
    queryFn: ({ pageParam = null }) => getGames({ cursor: pageParam }),
    getNextPageParam: ({ paging }) => paging.nextCursor,
    suspense: false,
  });

  const games = data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = !!data?.pages[data?.pages.length - 1].paging.nextCursor;

  return (
    <>
      <section className="section">
        <h2 className="section-title">게임</h2>
        <GameButtons />
      </section>
      <section className="section">
        <h2 className="section-title">라이브 게임</h2>
        {isFetching && !data ? (
          <Spinner className="flex justify-center mt-2 mb-8" />
        ) : games.length ? (
          <InfiniteScroll
            next={fetchNextPage}
            hasMore={hasMore}
            dataLength={games.length}
            loader={<Spinner className="flex justify-center pt-2 pb-8" />}
            style={{ overflow: 'unset' }}
          >
            <GameList games={games} />
          </InfiniteScroll>
        ) : (
          <p className="text-center py-4">진행중인 게임이 없습니다.</p>
        )}
      </section>
    </>
  );
}
