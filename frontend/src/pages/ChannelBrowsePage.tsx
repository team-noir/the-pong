import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getChannels, joinChannel } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import ChannelBrowse from 'components/organisms/ChannelBrowse';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import PasswordModal from 'components/molecule/PasswordModal';
import { ChannelType } from 'types';

export default function ChannelBrowsePage() {
  const [isShowPasswordInput, setIsShowPasswordInput] = useState(false);
  const [protectedChannelId, setProtectedChannelId] = useState<number>(-1);
  const navigate = useNavigate();

  const getChannelsQuery = useQuery({
    queryKey: ['getChannels', 'browse'],
    queryFn: () => getChannels({}),
  });

  const joinChannelMutation = useMutation(joinChannel);

  const handleClickChannel = (channel: ChannelType) => {
    if (channel.isJoined) {
      navigate(`/channel/${channel.id}`);
      return;
    }

    if (!channel.isProtected) {
      joinChannelMutation.mutate(
        { id: channel.id },
        {
          onSuccess: () => navigate(`/channel/${channel.id}`),
        }
      );
    }

    setIsShowPasswordInput(true);
    setProtectedChannelId(channel.id);
  };

  const handlePasswordSubmit = (password: string) => {
    joinChannelMutation.mutate(
      { id: protectedChannelId, password },
      {
        onSuccess: () => navigate(`/channel/${protectedChannelId}`),
      }
    );
  };

  return (
    <AppTemplate header={<HeaderWithBackButton title={'채널 둘러보기'} />}>
      {getChannelsQuery.isSuccess && (
        <ChannelBrowse
          channels={getChannelsQuery.data}
          onClick={handleClickChannel}
        />
      )}
      {isShowPasswordInput && (
        <PasswordModal
          onClose={() => setIsShowPasswordInput(false)}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </AppTemplate>
  );
}
