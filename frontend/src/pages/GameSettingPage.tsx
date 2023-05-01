import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getGameSetting } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import GameSetting from 'components/organisms/GameSetting';
import Header from 'components/molecule/Header';
import { SERVICE_NAME } from 'constants/index';
import QUERY_KEYS from 'constants/queryKeys';

export default function GameSettingPage() {
  const { gameId } = useParams() as { gameId: string };

  const { data: gameSetting } = useQuery({
    queryKey: [QUERY_KEYS.GAME_SETTING, gameId],
    queryFn: () => getGameSetting(Number(gameId)),
    refetchInterval: false,
    refetchOnMount: false,
  });

  return (
    <>
      <AppTemplate header={<Header title={SERVICE_NAME} />}>
        {gameSetting && <GameSetting gameSetting={gameSetting} />}
      </AppTemplate>
    </>
  );
}
