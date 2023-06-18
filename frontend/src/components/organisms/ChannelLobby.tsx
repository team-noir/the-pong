import { useInfiniteQuery } from '@tanstack/react-query';
import { getChannels } from 'api/rest.v1';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChannelButtons from 'components/organisms/ChannelButtons';
import ChannelList from 'components/molecule/ChannelList';
import Spinner from 'components/atoms/Spinner';
import QUERY_KEYS from 'constants/queryKeys';

export default function ChannelLobby() {
  const { data, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.CHANNELS],
    queryFn: ({ pageParam = null }) =>
      getChannels({
        enter: '',
        kind: ['public', 'private', 'dm'],
        paging: { cursor: pageParam },
      }),
    getNextPageParam: ({ paging }) => paging.nextCursor,
    suspense: false,
  });

  const channels = data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = !!data?.pages[data.pages.length - 1].paging.nextCursor;

  return (
    <>
      <section className="section">
        <h2 className="section-title">채널</h2>
        <ChannelButtons />
      </section>
      <section className="section">
        <h2 className="section-title">참여 중인 채널 목록</h2>
        {isFetching && !data ? (
          <Spinner className="flex justify-center mt-2 mb-8" />
        ) : channels.length ? (
          <InfiniteScroll
            next={fetchNextPage}
            hasMore={hasMore}
            dataLength={channels.length}
            loader={<Spinner className="flex justify-center pt-2 pb-8" />}
          >
            <ChannelList channels={channels} />
          </InfiniteScroll>
        ) : (
          <p className="text-center py-4">입장 중인 채널이 없습니다.</p>
        )}
      </section>
    </>
  );
}
