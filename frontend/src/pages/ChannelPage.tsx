import Button from 'components/atoms/Button';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import Channel from 'components/organisms/Channel';
import ChannelDetail from 'components/organisms/ChannelDetail';
import AppTemplate from 'components/templates/AppTemplate';
import { useState } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { ChannelType } from 'types/channelType';

const dummyChannels: ChannelType[] = [
  { id: '0', title: '게임 할 사람', channelCode: '1234' },
  { id: '1', title: '수다 떨어요', channelCode: '0000' },
];

interface LoaderData {
  channel: ChannelType;
}

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params?.channelCode) {
    throw new Error('channelCode is required');
  }

  // TODO: 채널 정보를 가져오는 API 호출
  const channel: ChannelType | undefined = dummyChannels.find(
    (channel) => channel.channelCode === params.channelCode
  );

  return { channel };
}

export default function ChannelPage() {
  const { channel }: LoaderData = useLoaderData() as LoaderData;
  const [isShowSetting, setIsShowSetting] = useState(false);

  const handleClick = () => {
    setIsShowSetting(!isShowSetting);
  };

  return (
    <AppTemplate
      header={
        <HeaderWithBackButton
          title={channel.title}
          button={
            <Button type="button" onClick={handleClick}>
              메뉴
            </Button>
          }
        />
      }
    >
      <Channel channel={channel} />
      {isShowSetting && <ChannelDetail channel={channel} />}
    </AppTemplate>
  );
}
