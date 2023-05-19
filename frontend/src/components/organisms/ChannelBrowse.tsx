import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { getChannels, joinChannel } from 'api/rest.v1';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChannelList from 'components/molecule/ChannelList';
import PasswordModal from 'components/molecule/PasswordModal';
import Spinner from 'components/atoms/Spinner';
import { ChannelType } from 'types';
import ROUTES from 'constants/routes';
import QUERY_KEYS from 'constants/queryKeys';

export default function ChannelBrowse() {
  const [isShowPasswordInput, setIsShowPasswordInput] = useState(false);
  const [protectedChannelId, setProtectedChannelId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.CHANNELS_BROWSE],
    queryFn: ({ pageParam = null }) =>
      getChannels({ paging: { cursor: pageParam } }),
    getNextPageParam: ({ paging }) => paging.nextCursor,
    refetchInterval: 1000 * 60, // 1분
  });

  const channels = data?.pages.flatMap((page) => page.data) ?? [];
  const hasMore = !!data?.pages[data.pages.length - 1].paging.nextCursor;

  const joinChannelMutation = useMutation(joinChannel);
  const joinProtectedChannelMutation = useMutation({
    mutationFn: joinChannel,
    onError: () => alert('비밀번호가 틀렸습니다.'),
  });

  const handleClickChannel = (channel: ChannelType) => {
    if (channel.isJoined) {
      navigate(ROUTES.CHANNEL.ROOM(channel.id));
      return;
    }

    if (!channel.isProtected) {
      joinChannelMutation.mutate(
        { id: channel.id },
        {
          onSuccess: () => navigate(ROUTES.CHANNEL.ROOM(channel.id)),
        }
      );
    }

    setIsShowPasswordInput(true);
    setProtectedChannelId(channel.id);
  };

  const handlePasswordSubmit = (password: string) => {
    protectedChannelId &&
      joinProtectedChannelMutation.mutate(
        { id: protectedChannelId, password },
        {
          onSuccess: () => navigate(ROUTES.CHANNEL.ROOM(protectedChannelId)),
        }
      );
  };

  return (
    <>
      {channels.length ? (
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasMore}
          dataLength={channels.length}
          loader={<Spinner className="flex justify-center pt-2 pb-8" />}
        >
          <ChannelList channels={channels} onClick={handleClickChannel} />
        </InfiniteScroll>
      ) : (
        <p className="text-center py-4">생성된 채널이 없습니다.</p>
      )}
      {isShowPasswordInput && (
        <PasswordModal
          onClose={() => setIsShowPasswordInput(false)}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </>
  );
}
