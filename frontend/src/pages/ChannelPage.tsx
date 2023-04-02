import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getWhoami, getChannel } from 'api/api.v1';
import Button from 'components/atoms/Button';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import Channel from 'components/organisms/Channel';
import ChannelDetail from 'components/organisms/ChannelDetail';
import ChannelSetting from 'components/organisms/ChannelSetting';
import ChannelInvite from 'components/organisms/ChannelInvite';
import AppTemplate from 'components/templates/AppTemplate';
import { UserType } from 'types/userType';
import { ChannelType } from 'types/channelType';

export default function ChannelPage() {
  const { channelId } = useParams() as { channelId: string };
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [isShowInvite, setIsShowInvite] = useState(false);

  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });

  const getChannelQuery = useQuery<ChannelType, AxiosError>({
    queryKey: ['channel', channelId],
    queryFn: () => getChannel(channelId),
  });

  if (
    whoamiQuery.status === 'loading' ||
    getChannelQuery.status === 'loading'
  ) {
    return <div>Loading...</div>;
  }

  if (whoamiQuery.status === 'error' || getChannelQuery.status === 'error') {
    return <div>Error</div>;
  }

  return (
    <AppTemplate
      header={
        <HeaderWithBackButton
          title={getChannelQuery.data.title}
          button={
            <Button type="button" onClick={() => setIsShowDetail(true)}>
              메뉴
            </Button>
          }
        />
      }
    >
      <Channel channel={getChannelQuery.data} />
      {isShowDetail && (
        <ChannelDetail
          channel={getChannelQuery.data}
          onClickSetting={() => setIsShowSetting(true)}
          onClickInvite={() => setIsShowInvite(true)}
        />
      )}
      {isShowSetting && (
        <ChannelSetting
          channel={getChannelQuery.data}
          onClickClose={() => setIsShowSetting(false)}
        />
      )}
      {isShowInvite && (
        <ChannelInvite onClickClose={() => setIsShowInvite(false)} />
      )}
    </AppTemplate>
  );
}
