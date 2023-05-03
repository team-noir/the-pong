import ProfileImage from 'components/atoms/ProfileImage';
import { classNames } from 'utils';
import { PlayerType } from 'types';

interface Props {
  player1: PlayerType;
  player2: PlayerType;
  liveScore1?: number;
  liveScore2?: number;
  myUserId?: number | null;
  layout?: 'vertical' | 'horizontal';
}

export default function GameScoretable({
  player1,
  player2,
  liveScore1,
  liveScore2,
  myUserId,
  layout = 'vertical',
}: Props) {
  return (
    <div className="relative inline-flex items-center gap-2">
      <GameHistoryItemPlayer player={player1} layout={layout} />
      <span className="text-4xl text-gray-lighter font-light italic">
        <span className={myUserId === player1.id ? 'text-green' : ''}>
          {liveScore1 || player1.score}
        </span>
        <span> : </span>
        <span className={myUserId === player2.id ? 'text-green' : ''}>
          {liveScore2 || player2.score}
        </span>
      </span>
      <GameHistoryItemPlayer player={player2} layout={layout} />
    </div>
  );
}

function GameHistoryItemPlayer({
  player,
  layout = 'vertical',
}: {
  player: PlayerType;
  layout?: 'vertical' | 'horizontal';
}) {
  const imageSize = 52;

  return (
    <div
      className={classNames(
        'flex-initial p-4 flex items-center justify-between',
        layout === 'vertical' ? 'flex-col' : 'flex-row gap-2'
      )}
    >
      <div
        className={`flex-1 rounded-full max-w-${imageSize / 4} max-h-${
          imageSize / 4
        }`}
      >
        <ProfileImage
          userId={player.id}
          nickname={`${player.nickname}`}
          size={imageSize}
        />
      </div>

      <span className="mt-1">{player.nickname}</span>
      <span className="badge">Lv. {player.level}</span>
    </div>
  );
}
