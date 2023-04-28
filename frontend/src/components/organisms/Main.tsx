import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import GameButtons from 'components/organisms/GameButtons';
import GameLives from 'components/organisms/GameLives';
import ChannelButtons from 'components/organisms/ChannelButtons';

export default function Main() {
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
        <GameLives limit={2} />
      </section>
      <section className="section">
        <h2 className="section-title">채널</h2>
        <ChannelButtons />
      </section>
    </>
  );
}
