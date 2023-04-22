import GameHistoryList from 'components/molecule/GameHistoryList';
import { GameHistoryType } from 'types';

// TODO: remove dummy data
const dummyData: GameHistoryType[] = [
  {
    id: 0,
    isLadder: false,
    winner: {
      id: 1,
      nickname: 'Nickname1',
      level: 2,
      score: 11,
    },
    loser: {
      id: 2,
      nickname: 'Nickname2',
      level: 1,
      score: 5,
    },
    createdAt: '2023-04-11T00:00:00.000Z',
  },
  {
    id: 10,
    isLadder: false,
    winner: {
      id: 3,
      nickname: 'Nickname3',
      level: 4,
      score: 9,
    },
    loser: {
      id: 1,
      nickname: 'Nickname1',
      level: 2,
      score: 11,
    },
    createdAt: '2023-04-11T01:00:00.000Z',
  },
];

interface Props {
  userId: number;
}

export default function GameHistory({ userId }: Props) {
  // TODO: get data from api using react-query
  const data = dummyData;

  return (
    <section className="section">
      <h2 className="section-title">게임 히스토리</h2>
      <GameHistoryList histories={data} userId={userId} />
    </section>
  );
}
