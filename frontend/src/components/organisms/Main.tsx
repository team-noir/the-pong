import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getGames } from 'api/rest.v1';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import GameButtons from 'components/organisms/GameButtons';
import GameList from 'components/organisms/GameList';
import ChannelButtons from 'components/organisms/ChannelButtons';
import QUERY_KEYS from 'constants/queryKeys';

export default function Main() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.GAMES, 'main'],
    queryFn: () => getGames({ size: 3 }),
  });

  return (
    <>
      <section className="section">
        <h2 className="section-title">게임</h2>
        <GameButtons />
      </section>
      <section className="section">
        <div className="flex justify-start items-baseline">
          <h2 className="section-title">라이브 게임</h2>
          <span className="inline-block text-sm text-gray-light ml-2">
            <Link to="/game">더보기</Link>
            <ChevronRightIcon
              className="inline-block h-4 w-4"
              aria-hidden="true"
            />
          </span>
        </div>
        {data?.data.length ? (
          <GameList games={data.data} />
        ) : (
          <p className="text-center pt-4">진행중인 게임이 없습니다.</p>
        )}
      </section>
      <section className="section">
        <h2 className="section-title">채널</h2>
        <ChannelButtons />
      </section>
    </>
  );
}
