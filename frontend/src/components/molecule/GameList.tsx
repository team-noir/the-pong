import GameItem from 'components/molecule/GameItem';
import { GameType } from 'types';

// TODO: remove dummy data
const games: GameType[] = [
  {
    id: 1,
    players: [
      {
        id: 1,
        nickname: 'Nickname1',
        level: 1,
      },
      {
        id: 101,
        nickname: 'Nickname2',
        level: 3,
      },
    ],
    mode: 'normal',
    theme: 1,
    viewerCount: 42,
    isLadder: false,
    createdAt: '2023-04-07T00:00:00.000Z',
  },
  {
    id: 2,
    players: [
      {
        id: 200,
        nickname: 'Nickname1',
        level: 12,
      },
      {
        id: 201,
        nickname: 'Nickname2',
        level: 10,
      },
    ],
    mode: 'hard',
    theme: 1,
    viewerCount: 123,
    isLadder: false,
    createdAt: '2023-04-07T00:00:00.010Z',
  },
  {
    id: 3,
    players: [
      {
        id: 300,
        nickname: 'Nickname1',
        level: 1,
      },
      {
        id: 301,
        nickname: 'Nickname2',
        level: 10,
      },
    ],
    mode: 'hard',
    theme: 1,
    viewerCount: 321,
    isLadder: false,
    createdAt: '2023-04-07T00:00:00.001Z',
  },
];

export default function GameList() {
  return (
    <ul className="flex flex-col -mx-4 overflow-x-hidden">
      {games && games.map((game) => <GameItem key={game.id} game={game} />)}
    </ul>
  );
}
