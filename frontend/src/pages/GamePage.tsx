import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getGame } from 'api/api.v1';
import AppTemplate from 'components/templates/AppTemplate';
import Game from 'components/organisms/Game';
import Header from 'components/molecule/Header';
import { SERVICE_NAME } from 'constants/index';
import QUERY_KEYS from 'constants/queryKeys';

export default function GamePage() {
  const { gameId } = useParams() as { gameId: string };

  const { data: game } = useQuery({
    queryKey: [QUERY_KEYS.GAME, gameId],
    queryFn: () => getGame(Number(gameId)),
  });

  return (
    <AppTemplate header={<Header title={SERVICE_NAME} />}>
      {game && <Game game={game} />}
    </AppTemplate>
  );
}
