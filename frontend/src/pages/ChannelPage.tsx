import Button from 'components/atoms/Button';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import Channel from 'components/organisms/Channel';
import ChannelDetail from 'components/organisms/ChannelDetail';
import { dummyChannels } from 'components/organisms/ChannelLobby';
import ChannelSetting from 'components/organisms/ChannelSetting';
import ChannelInvite from 'components/organisms/ChannelInvite';
import AppTemplate from 'components/templates/AppTemplate';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChannelType } from 'types/channelType';

export default function ChannelPage() {
  const { channelId } = useParams() as { channelId: string };
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [isShowInvite, setIsShowInvite] = useState(false);

  useEffect(() => {
    setChannel(
      dummyChannels.find((channel) => channel.id === Number(channelId)) || null
    );
  }, []);

  return (
    <AppTemplate
      header={
        <HeaderWithBackButton
          title={channel?.title}
          button={
            <Button type="button" onClick={() => setIsShowDetail(true)}>
              메뉴
            </Button>
          }
        />
      }
    >
      <Channel channel={channel} />
      {isShowDetail && (
        <ChannelDetail
          channel={channel}
          onClickSetting={() => setIsShowSetting(true)}
          onClickInvite={() => setIsShowInvite(true)}
        />
      )}
      {isShowSetting && (
        <ChannelSetting
          channel={channel}
          onClickClose={() => setIsShowSetting(false)}
        />
      )}
      {isShowInvite && (
        <ChannelInvite onClickClose={() => setIsShowInvite(false)} />
      )}
    </AppTemplate>
  );
}
