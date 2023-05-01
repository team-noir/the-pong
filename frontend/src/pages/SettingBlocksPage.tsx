import { useQuery } from '@tanstack/react-query';
import { getMyBlocks } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import SettingBlocks from 'components/organisms/SettingBlocks';
import Header from 'components/molecule/Header';
import QUERY_KEYS from 'constants/queryKeys';

export default function SettingBlocksPage() {
  const { data: blocks, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.BLOCKS],
    queryFn: getMyBlocks,
  });

  return (
    <AppTemplate header={<Header title={'차단 관리'} hasBackButton />}>
      {isSuccess && <SettingBlocks users={blocks} />}
    </AppTemplate>
  );
}
