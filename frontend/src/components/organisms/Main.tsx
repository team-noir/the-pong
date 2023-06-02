import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getChannels, getGames } from 'api/rest.v1';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import GameButtons from 'components/organisms/GameButtons';
import GameList from 'components/organisms/GameList';
import ChannelButtons from 'components/organisms/ChannelButtons';
import QUERY_KEYS from 'constants/queryKeys';
import ROUTES from 'constants/routes';
import ChannelList from 'components/molecule/ChannelList';

export default function Main() {
  const { data: games } = useQuery({
    queryKey: [QUERY_KEYS.GAMES, 'main'],
    queryFn: () => getGames({ size: 3 }),
  });

  const { data: channels } = useQuery({
    queryKey: [QUERY_KEYS.CHANNELS_BROWSE, 'main'],
    queryFn: () => getChannels({ paging: { size: 3, sort: 'users' } }),
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
            <Link to={ROUTES.GAME.INDEX}>더보기</Link>
            <ChevronRightIcon
              className="inline-block h-4 w-4"
              aria-hidden="true"
            />
          </span>
        </div>
        {games?.data.length ? (
          <GameList games={games.data} />
        ) : (
          <p className="text-center pt-4">진행중인 게임이 없습니다.</p>
        )}
      </section>
      <section className="section">
        <h2 className="section-title">채널</h2>
        <ChannelButtons />
      </section>
      <section className="section">
        <div className="flex justify-start items-baseline">
          <h2 className="section-title">인기 채널</h2>
          <span className="inline-block text-sm text-gray-light ml-2">
            <Link
              to={`${ROUTES.CHANNEL.INDEX}/${ROUTES.CHANNEL.CHILDREN.BROWSE}`}
            >
              더보기
            </Link>
            <ChevronRightIcon
              className="inline-block h-4 w-4"
              aria-hidden="true"
            />
          </span>
        </div>
        {channels?.data.length ? (
          <ChannelList channels={channels.data} />
        ) : (
          <p className="text-center pt-4">생성된 채널이 없습니다.</p>
        )}
      </section>
    </>
  );
}
