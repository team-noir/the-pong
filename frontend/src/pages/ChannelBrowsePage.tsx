import { useQuery } from '@tanstack/react-query';
import { getChannels } from 'api/rest.v1';
import AppTemplate from 'components/templates/AppTemplate';
import ChannelBrowse from 'components/organisms/ChannelBrowse';
import Header from 'components/molecule/Header';
import QUERY_KEYS from 'constants/queryKeys';

export default function ChannelBrowsePage() {
  const { data: channels, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.CHANNELS_BROWSE],
    queryFn: () => getChannels({}),
    refetchInterval: 1000 * 60, // 1분
  });

  return (
    <AppTemplate header={<Header title={'채널 둘러보기'} hasBackButton />}>
      {isSuccess && <ChannelBrowse channels={channels} />}
    </AppTemplate>
  );
}
