import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/api.v1';
import GameButtons from 'components/organisms/GameButtons';
import GameLives from 'components/organisms/GameLives';

export default function GameLobby() {
  const { data: games, isSuccess } = useQuery({
    queryKey: ['games'],
    queryFn: getGames,
  });

  return (
    <>
      <section className="section">
        <h2 className="section-title">게임</h2>
        <GameButtons />
      </section>
      <section className="section">
        <h2 className="section-title">라이브 게임</h2>
        {isSuccess && <GameLives games={games} />}
      </section>
    </>
  );
}
