import { Link } from 'react-router-dom';
import ProfileImage from 'components/atoms/ProfileImage';
import { classNames } from 'utils';
import { GameType, PlayerType } from 'types';

interface Props {
  game: GameType;
}

export default function GameItem({ game }: Props) {
  return (
    // TODO: Link to game page
    <Link
      to={`/game/${game.id}`}
      className="relative w-full h-full min-h-20 mb-4 drop-shadow hover:drop-shadow-lg hover:-translate-y-1 transition-transform duration-500"
    >
      <GameItemBackground />

      <div className="relative flex justify-between items-stretch min-h-20 gap-2 w-full">
        <GameItemPlayer player={game.players[0]} />
        <GameItemPlayer player={game.players[1]} isLeft={false} />
      </div>
    </Link>
  );
}

function GameItemBackground() {
  const bgItemClassNames = 'bg-gray h-full flex-1 transform skew-x-[335deg]';

  return (
    <>
      <div className="absolute flex items-center justify-center w-full h-full z-10 select-none">
        <span className="text-6xl text-gray-lighter font-thin italic">VS</span>
      </div>
      <div className="absolute flex items-stretch gap-32 w-[160%] h-full -ml-[30%] select-none">
        <div className={bgItemClassNames}></div>
        <div className={bgItemClassNames}></div>
      </div>
    </>
  );
}

function GameItemPlayer({
  player,
  isLeft = true,
}: {
  player: PlayerType;
  isLeft?: boolean;
}) {
  const imageSize = 52;

  return (
    <div
      className={classNames(
        'flex-initial p-4 flex items-center gap-2',
        isLeft ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      <div
        className={`flex-1 duotone-image rounded-full max-w-${
          imageSize / 4
        } max-h-${imageSize / 4}`}
      >
        <ProfileImage
          userId={player.id}
          alt={`${player.nickname}의 프로필 사진`}
          size={imageSize}
        />
      </div>
      <div
        className={classNames(
          'flex flex-col gap-1',
          isLeft ? 'items-start' : 'items-end'
        )}
      >
        <span>{player.nickname}</span>
        <GameItemPlayerLevel level={player.level} />
      </div>
    </div>
  );
}

function GameItemPlayerLevel({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center px-2 py-1 bg-gray-dark rounded-full text-xs text-text-light">
      Lv. {level}
    </span>
  );
}
