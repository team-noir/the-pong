import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getChannels, postJoinChannel } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import ChannelBrowse from 'components/organisms/ChannelBrowse';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import PasswordModal from 'components/molecule/PasswordModal';
import { ChannelType } from 'types';

export default function ChannelBrowsePage() {
  const [isShowPasswordInput, setIsShowPasswordInput] = useState(false);
  const [protectedChannelId, setProtectedChannelId] = useState<number>(-1);
  const navigate = useNavigate();

  const getChannelsQuery = useQuery<ChannelType[], AxiosError>({
    queryKey: ['getChannels', 'browse'],
    queryFn: () => getChannels({}),
  });
  const postJoinChannelMutation = useMutation(postJoinChannel);

  const handleClickChannel = (channel: ChannelType) => {
    if (channel.isJoined) {
      navigate(`/channel/${channel.id}`);
      return;
    }

    if (!channel.isProtected) {
      postJoinChannelMutation.mutate(
        { id: channel.id },
        {
          onError: () => alert('다시 시도해 주세요.'),
          onSuccess: () => navigate(`/channel/${channel.id}`),
        }
      );
    }

    setIsShowPasswordInput(true);
    setProtectedChannelId(channel.id);
  };

  const handlePasswordSubmit = (password: string) => {
    postJoinChannelMutation.mutate(
      { id: protectedChannelId, password },
      {
        onError: () => alert('다시 시도해 주세요.'),
        onSuccess: () => navigate(`/channel/${protectedChannelId}`),
      }
    );
  };

  return (
    <AppTemplate header={<HeaderWithBackButton title={'채널 둘러보기'} />}>
      {getChannelsQuery.isLoading && <div>Loading...</div>}
      {getChannelsQuery.isError && <div>{getChannelsQuery.error.message}</div>}
      {getChannelsQuery.isSuccess && (
        <>
          <ChannelBrowse
            channels={getChannelsQuery.data}
            onClick={handleClickChannel}
          />
          {isShowPasswordInput && (
            <PasswordModal
              onClose={() => setIsShowPasswordInput(false)}
              onSubmit={handlePasswordSubmit}
            >
              비밀번호 입력이 필요한 채널입니다.
            </PasswordModal>
          )}
        </>
      )}
    </AppTemplate>
  );
}
