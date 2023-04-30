import { getGames } from 'api/api.v1';
import { useQuery } from '@tanstack/react-query';
import AppTemplate from 'components/templates/AppTemplate';
import GameButtons from 'components/organisms/GameButtons';
import GameLives from 'components/organisms/GameLives';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function GameLobbyPage() {
  const { data: games } = useQuery({
    queryKey: ['games'],
    queryFn: getGames,
  });

  return (
    <AppTemplate header={<HeaderGnb />}>
      <section className="section">
        <h2 className="section-title">게임</h2>
        <GameButtons />
      </section>
      <section className="section">
        <h2 className="section-title">라이브 게임</h2>
        {games && <GameLives games={games} />}
      </section>
    </AppTemplate>
  );
}
