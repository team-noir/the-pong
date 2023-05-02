import { useQuery } from '@tanstack/react-query';
import { getGameHistories } from 'api/rest.v1';
import GameHistoryList from 'components/molecule/GameHistoryList';
import QUERY_KEYS from 'constants/queryKeys';

interface Props {
  userId: number;
}

export default function GameHistory({ userId }: Props) {
  const { data: histories } = useQuery({
    queryKey: [QUERY_KEYS.GAME_HISTORY, String(userId)],
    queryFn: () => getGameHistories(userId),
  });

  return (
    <section className="section">
      <h2 className="section-title">게임 히스토리</h2>
      {histories?.length ? (
        <GameHistoryList histories={histories} userId={userId} />
      ) : (
        <p className="block mt-4 text-center text-gray">
          게임 히스토리가 없습니다.
        </p>
      )}
    </section>
  );
}
