import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getChannels } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import ChannelLobby from 'components/organisms/ChannelLobby';
import HeaderGnb from 'components/molecule/HeaderGnb';
import { ChannelType } from 'types';

export default function ChannelLobbyPage() {
  const navigate = useNavigate();

  const getChannelsQuery = useQuery({
    queryKey: ['getChannels'],
    queryFn: () =>
      getChannels({ enter: '', kind: ['public', 'private', 'dm'] }),
  });

  const handleClickChannel = (channel: ChannelType) => {
    navigate(`/channel/${channel.id}`);
  };

  return (
    <AppTemplate header={<HeaderGnb />}>
      {getChannelsQuery.isSuccess && (
        <ChannelLobby
          channels={getChannelsQuery.data}
          onClick={handleClickChannel}
        />
      )}
    </AppTemplate>
  );
}
