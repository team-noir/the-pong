import { useQuery } from '@tanstack/react-query';
import { getChannels } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import ChannelLobby from 'components/organisms/ChannelLobby';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function ChannelLobbyPage() {
  const { data: channels, isSuccess } = useQuery({
    queryKey: ['getChannels'],
    queryFn: () =>
      getChannels({ enter: '', kind: ['public', 'private', 'dm'] }),
  });

  return (
    <AppTemplate header={<HeaderGnb />}>
      {isSuccess && <ChannelLobby channels={channels} />}
    </AppTemplate>
  );
}
