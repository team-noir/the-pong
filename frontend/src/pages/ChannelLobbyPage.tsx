import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getChannels } from 'api/api.v1';
import ChannelLobby from 'components/organisms/ChannelLobby';
import { ChannelType } from 'types/channelType';

export default function ChannelLobbyPage() {
  const navigate = useNavigate();

  const getChannelsQuery = useQuery<ChannelType[], AxiosError>({
    queryKey: ['getChannels'],
    queryFn: () =>
      getChannels({ enter: '', kind: ['public', 'private', 'dm'] }),
  });

  const handleClickChannel = (channel: ChannelType) => {
    navigate(`/channel/${channel.id}`);
  };

  return (
    <>
      {getChannelsQuery.isLoading && <div>Loading...</div>}
      {getChannelsQuery.isError && <div>{getChannelsQuery.error.message}</div>}
      {getChannelsQuery.isSuccess && (
        <ChannelLobby
          channels={getChannelsQuery.data}
          onClick={handleClickChannel}
        />
      )}
    </>
  );
}
