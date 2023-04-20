import { Link } from 'react-router-dom';
import { EyeIcon } from '@heroicons/react/20/solid';
import GameMatchtable from 'components/molecule/GameMatchtable';
import { GameType } from 'types';

interface Props {
  game: GameType;
}

export default function GameItem({ game }: Props) {
  return (
    // TODO: Link to game page
    <Link to={`/game/${game.id}`} className="mb-4 w-full">
      <GameMatchtable player1={game.players[0]} player2={game.players[1]} />

      <span className="inline-flex items-center py-1 text-xs text-gray-light float-right">
        <EyeIcon className="block h-4 w-4" aria-hidden="true" />
        <span className="ml-1">{game.viewerCount}</span>
      </span>
    </Link>
  );
}
