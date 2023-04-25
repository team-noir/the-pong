import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getChannel } from 'api/api.v1';
import { useUser } from 'hooks/useStore';
import AppTemplate from 'components/templates/AppTemplate';
import Channel from 'components/organisms/Channel';
import ChannelDetail from 'components/organisms/ChannelDetail';
import ChannelSetting from 'components/organisms/ChannelSetting';
import ChannelInvite from 'components/organisms/ChannelInvite';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import Button from 'components/atoms/Button';

export default function ChannelPage() {
  const myUserId = useUser((state) => state.id);
  const { channelId } = useParams() as { channelId: string };

  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [isShowInvite, setIsShowInvite] = useState(false);

  const getChannelQuery = useQuery({
    queryKey: ['getChannel', channelId],
    queryFn: () => getChannel(Number(channelId)),
    refetchInterval: 1000 * 60, // 1분
  });

  return (
    <AppTemplate
      header={
        <HeaderWithBackButton
          title={getChannelQuery.data.title || ''}
          button={<Button onClick={() => setIsShowDetail(true)}>메뉴</Button>}
        />
      }
    >
      {myUserId && (
        <Channel channel={getChannelQuery.data} myUserId={myUserId} />
      )}
      {isShowDetail && myUserId && getChannelQuery.data && (
        <ChannelDetail
          channel={getChannelQuery.data}
          myUserId={myUserId}
          onClickClose={() => setIsShowDetail(false)}
          onClickSetting={() => setIsShowSetting(true)}
          onClickInvite={() => setIsShowInvite(true)}
        />
      )}
      {isShowSetting && getChannelQuery.data && (
        <ChannelSetting
          channel={getChannelQuery.data}
          onClickClose={() => setIsShowSetting(false)}
        />
      )}
      {isShowInvite && getChannelQuery.data?.users && (
        <ChannelInvite
          channelId={Number(channelId)}
          channelUsers={getChannelQuery.data.users}
          onClickClose={() => setIsShowInvite(false)}
        />
      )}
    </AppTemplate>
  );
}
