import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getChannel } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import AppTemplate from 'components/templates/AppTemplate';
import Channel from 'components/organisms/Channel';
import Header from 'components/molecule/Header';
import Button from 'components/atoms/Button';

export default function ChannelPage() {
  const myUserId = useUser((state) => state.id);
  const { channelId } = useParams() as { channelId: string };
  const [isShowDetail, setIsShowDetail] = useState(false);

  const { data: channel } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => getChannel(Number(channelId)),
    refetchInterval: 1000 * 60, // 1분
  });

  return (
    <AppTemplate
      header={
        <Header
          title={channel?.title}
          noTitle={!channel?.title}
          button={<Button onClick={() => setIsShowDetail(true)}>메뉴</Button>}
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
