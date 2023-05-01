import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { getChannel } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import AppTemplate from 'components/templates/AppTemplate';
import Channel from 'components/organisms/Channel';
import Header from 'components/molecule/Header';
import QUERY_KEYS from 'constants/queryKeys';

export default function ChannelPage() {
  const myUserId = useUser((state) => state.id);
  const { channelId } = useParams() as { channelId: string };
  const [isShowDetail, setIsShowDetail] = useState(false);

  const { data: channel } = useQuery({
    queryKey: [QUERY_KEYS.CHANNEL, channelId],
    queryFn: () => getChannel(Number(channelId)),
    refetchInterval: 1000 * 60, // 1분
  });

  return (
    <AppTemplate
      header={
        <Header
          title={channel?.title}
          noTitle={!channel?.title}
          button={
            <div role="button" onClick={() => setIsShowDetail(true)}>
              <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
            </div>
          }
          hasBackButton
        />
      }
    >
      {myUserId && channel && (
        <Channel
          channel={channel}
          myUserId={myUserId}
          isShowDetail={isShowDetail}
          onClickCloseDetail={() => setIsShowDetail(false)}
        />
      )}
    </AppTemplate>
  );
}
