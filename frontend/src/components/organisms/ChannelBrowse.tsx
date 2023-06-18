import { useInfiniteQuery } from '@tanstack/react-query';
import { getChannels } from 'api/rest.v1';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChannelList from 'components/molecule/ChannelList';
import Spinner from 'components/atoms/Spinner';
import QUERY_KEYS from 'constants/queryKeys';

export default function ChannelBrowse() {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.CHANNELS_BROWSE],
    queryFn: ({ pageParam = null }) =>
      getChannels({ paging: { cursor: pageParam } }),
    getNextPageParam: ({ paging }) => paging.nextCursor,
    refetchInterval: 1000 * 60, // 1분
  });

  const channels = data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = !!data?.pages[data.pages.length - 1].paging.nextCursor;

  return (
    <>
      {channels.length ? (
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasMore}
          dataLength={channels.length}
          loader={<Spinner className="flex justify-center pt-2 pb-8" />}
        >
          <ChannelList channels={channels} />
        </InfiniteScroll>
      ) : (
        <p className="text-center py-4">생성된 채널이 없습니다.</p>
      )}
    </>
  );
}
