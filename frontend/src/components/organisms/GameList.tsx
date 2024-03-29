import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { joinGameLive } from 'api/rest.v1';
import { EyeIcon } from '@heroicons/react/20/solid';
import GameMatchtable from 'components/molecule/GameMatchtable';
import { GameType } from 'types';
import ROUTES from 'constants/routes';
import QUERY_KEYS from 'constants/queryKeys';
import { UI_TEXT } from 'constants/index';

interface Props {
  games: GameType[];
}

export default function GameList({ games }: Props) {
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
      navigate(ROUTES.GAME.ROOM(game.id));
    },
    onError: (error: AxiosError) => {
      if (error && error.response?.status === 404) {
        queryClient.invalidateQueries([QUERY_KEYS.GAMES]);
        alert('이미 종료된 게임입니다.');
      } else {
        alert(UI_TEXT.ERROR.DEFAULT);
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
