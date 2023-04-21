import GameItem from 'components/molecule/GameItem';
import { GameType } from 'types';

interface Props {
  games: GameType[];
}

export default function GameList({ games }: Props) {
  return (
    <ul className="flex flex-col ">
      {games && games.map((game) => <GameItem key={game.id} game={game} />)}
    </ul>
  );
}
