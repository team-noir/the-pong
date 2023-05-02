import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { joinChannel } from 'api/rest.v1';
import ChannelList from 'components/molecule/ChannelList';
import PasswordModal from 'components/molecule/PasswordModal';
import { ChannelType } from 'types';
import ROUTES from 'constants/routes';

interface Props {
  channels: ChannelType[];
}

export default function ChannelBrowse({ channels }: Props) {
  const [isShowPasswordInput, setIsShowPasswordInput] = useState(false);
  const [protectedChannelId, setProtectedChannelId] = useState<number | null>(
    null
  );
  const navigate = useNavigate();

  const joinChannelMutation = useMutation(joinChannel);
  const joinProtectedChannelMutation = useMutation({
    mutationFn: joinChannel,
    onError: () => alert('비밀번호가 틀렸습니다.'),
  });

  const handleClickChannel = (channel: ChannelType) => {
    if (channel.isJoined) {
      navigate(ROUTES.CHANNEL.ROOM(channel.id));
      return;
    }

    if (!channel.isProtected) {
      joinChannelMutation.mutate(
        { id: channel.id },
        {
          onSuccess: () => navigate(ROUTES.CHANNEL.ROOM(channel.id)),
        }
      );
    }

    setIsShowPasswordInput(true);
    setProtectedChannelId(channel.id);
  };

  const handlePasswordSubmit = (password: string) => {
    protectedChannelId &&
      joinProtectedChannelMutation.mutate(
        { id: protectedChannelId, password },
        {
          onSuccess: () => navigate(ROUTES.CHANNEL.ROOM(protectedChannelId)),
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
