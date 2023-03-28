import Button from 'components/atoms/Button';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import Channel from 'components/organisms/Channel';
import ChannelDetail from 'components/organisms/ChannelDetail';
import { dummyChannels } from 'components/organisms/ChannelLobby';
import AppTemplate from 'components/templates/AppTemplate';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChannelType } from 'types/channelType';

export default function ChannelPage() {
  const { channelId } = useParams() as { channelId: string };
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const [isShowDetail, setIsShowDetail] = useState(false);

  useEffect(() => {
    setChannel(
      dummyChannels.find((channel) => channel.id === Number(channelId)) || null
    );
  }, []);

  const handleClick = () => {
    setIsShowDetail(!isShowDetail);
  };

  return (
    <AppTemplate
      header={
        <HeaderWithBackButton
          title={channel?.title}
          button={
            <Button type="button" onClick={handleClick}>
              메뉴
            </Button>
          }
        />
      }
    >
      <Channel channel={channel} />
      {isShowDetail && <ChannelDetail channel={channel} />}
    </AppTemplate>
  );
}
