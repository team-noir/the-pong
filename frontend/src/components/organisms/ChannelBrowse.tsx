import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { joinChannel } from 'api/api.v1';
import ChannelList from 'components/molecule/ChannelList';
import PasswordModal from 'components/molecule/PasswordModal';
import { ChannelType } from 'types';

interface Props {
  channels: ChannelType[];
}

export default function ChannelBrowse({ channels }: Props) {
  const [isShowPasswordInput, setIsShowPasswordInput] = useState(false);
  const [protectedChannelId, setProtectedChannelId] = useState<number>(-1);
  const navigate = useNavigate();

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
    <>
      {channels.length ? (
        <ChannelList channels={channels} onClick={handleClickChannel} />
      ) : (
        <div>생성된 채널이 없습니다.</div>
      )}
      {isShowPasswordInput && (
        <PasswordModal
          onClose={() => setIsShowPasswordInput(false)}
          onSubmit={handlePasswordSubmit}
        />
      )}
    </>
  );
}
