import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { joinGameLive } from 'api/api.v1';
import { EyeIcon } from '@heroicons/react/20/solid';
import GameMatchtable from 'components/molecule/GameMatchtable';
import { GameType } from 'types';

interface Props {
  games: GameType[];
}

export default function GameLives({ games }: Props) {
  return (
    <>
      {games.length ? (
        <GameList games={games} />
      ) : (
        <p>진행중인 게임이 없습니다.</p>
      )}
    </>
  );
}

function GameList({ games }: { games: GameType[] }) {
  return (
    <ul className="flex flex-col ">
      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}
    </ul>
  );
}

function GameItem({ game }: { game: GameType }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const joinGameLiveMutation = useMutation({
    mutationFn: () => joinGameLive(game.id),
    onSuccess: () => {
      navigate(`/game/${game.id}`);
    },
    onError: (error: AxiosError) => {
      if (error && error.response?.status === 404) {
        queryClient.invalidateQueries(['games']);
        alert('이미 종료된 게임입니다.');
      } else {
        alert('다시 시도해 주세요.');
      }
    },
  });

  return (
    <div
      className="mb-4 last-of-type:mb-0 w-full cursor-pointer"
      onClick={() => joinGameLiveMutation.mutate()}
    >
      <GameMatchtable player1={game.players[0]} player2={game.players[1]} />

      <div className="inline-flex items-center py-1 text-xs text-gray-light float-right">
        <EyeIcon className="block h-4 w-4" aria-hidden="true" />
        <span className="ml-1">{game.viewerCount}</span>
      </div>
    </div>
  );
}
