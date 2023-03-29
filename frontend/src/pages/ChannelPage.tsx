import { useQuery } from '@tanstack/react-query';
import { getWhoami } from 'api/api.v1';
import { AxiosError } from 'axios';
import Button from 'components/atoms/Button';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import Channel from 'components/organisms/Channel';
import ChannelDetail from 'components/organisms/ChannelDetail';
import { dummyChannels } from 'components/organisms/ChannelLobby';
import ChannelPassword from 'components/organisms/ChannelPassword';
import ChannelSetting from 'components/organisms/ChannelSetting';
import ChannelInvite from 'components/organisms/ChannelInvite';
import AppTemplate from 'components/templates/AppTemplate';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChannelType } from 'types/channelType';
import { UserType } from 'types/userType';

export default function ChannelPage() {
  const { channelId } = useParams() as { channelId: string };
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowSetting, setIsShowSetting] = useState(false);
  const [isShowPasswordInput, setIsShowPasswordInput] = useState(false);

  const whoamiQuery = useQuery<UserType, AxiosError>({
    queryKey: ['whoami'],
    queryFn: getWhoami,
  });
  const [isShowInvite, setIsShowInvite] = useState(false);

  useEffect(() => {
    setChannel(
      dummyChannels.find((channel) => channel.id === Number(channelId)) || null
    );
  }, []);

  useEffect(() => {
    if (!channel) return;
    if (channel.users?.find((user) => user.id === whoamiQuery.data?.id)) return;

    setIsShowPasswordInput(channel.isProtected);
  }, [channel]);

  const handleMatchPassword = () => {
    setIsShowPasswordInput(false);
    // TODO: 방 입장 API 호출
  };

  return (
    <>
      {channel && (
        <AppTemplate
          header={
            <HeaderWithBackButton
              title={isShowPasswordInput ? '비밀번호 입력' : channel.title}
              button={
                !isShowPasswordInput && (
                  <Button type="button" onClick={() => setIsShowDetail(true)}>
                    메뉴
                  </Button>
                )
              }
            />
          }
        >
          {isShowPasswordInput ? (
            <ChannelPassword
              channelId={channel.id}
              onMatchPassword={handleMatchPassword}
            />
          ) : (
            <>
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
            </>
          )}
        </AppTemplate>
      )}
    </>
  );
}
