import ProfileImage from 'components/atoms/ProfileImage';
import { classNames } from 'utils';
import { PlayerType, GameHistoryPlayerType } from 'types';

interface Props {
  player1: GameHistoryPlayerType;
  player2: GameHistoryPlayerType;
  liveScore1?: number;
  liveScore2?: number;
}

export default function GameScoretable({
  player1,
  player2,
  liveScore1,
  liveScore2,
}: Props) {
  return (
    <div className="relative inline-flex items-center gap-2">
      <GameHistoryItemPlayer player={player1} />
      <span className="text-4xl text-gray-lighter font-light italic">
        <span className="text-green">{liveScore1 || player1.score}</span> :{' '}
        <span className={classNames('relative')}>
          {liveScore2 || player2.score}
        </span>
      </span>
      <GameHistoryItemPlayer player={player2} />
    </div>
  );
}

function GameHistoryItemPlayer({ player }: { player: PlayerType }) {
  const imageSize = 52;

  return (
    <div className="flex-initial p-4 flex flex-col items-center justify-between">
      <div
        className={`flex-1 rounded-full max-w-${imageSize / 4} max-h-${
          imageSize / 4
        }`}
      >
        <ProfileImage
          userId={player.id}
          alt={`${player.nickname}의 프로필 사진`}
          size={imageSize}
        />
      </div>

      <span className="mt-1">{player.nickname}</span>
      <span className="badge">Lv. {player.level}</span>
    </div>
  );
}
