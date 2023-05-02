import { useQuery } from '@tanstack/react-query';
import { getChannels } from 'api/rest.v1';
import AppTemplate from 'components/templates/AppTemplate';
import ChannelLobby from 'components/organisms/ChannelLobby';
import HeaderGnb from 'components/molecule/HeaderGnb';
import QUERY_KEYS from 'constants/queryKeys';

export default function ChannelLobbyPage() {
  const { data: channels, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.CHANNELS],
    queryFn: () =>
      getChannels({ enter: '', kind: ['public', 'private', 'dm'] }),
  });

  return (
    <AppTemplate header={<HeaderGnb />}>
      {isSuccess && <ChannelLobby channels={channels} />}
    </AppTemplate>
  );
}
