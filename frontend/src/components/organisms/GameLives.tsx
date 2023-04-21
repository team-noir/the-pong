import GameList from 'components/molecule/GameList';
import { GameType } from 'types';

// TODO: remove dummy data
const dummyGames: GameType[] = [
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

interface Props {
  limit?: number;
}

export default function GameLives({ limit }: Props) {
  // TODO: Call API to get live games

  const games = limit ? dummyGames.slice(0, limit) : dummyGames;

  return (
    <>
      <GameList games={games} />
    </>
  );
}
