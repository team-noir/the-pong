import { useNavigate } from 'react-router-dom';
import Button from 'components/atoms/Button';
import ProfileImage from 'components/atoms/ProfileImage';
import { classNames } from 'utils';
import { GameResultType, PlayerType } from 'types';

export default function GameResultModal({
  result,
}: {
  result: GameResultType;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/game');
  };

  return (
    <div className="modal-wrapper z-[9]">
      <div className="modal-backdrop"></div>
      <div className="modal-panel-wrapper">
        <div className="modal-panel h-fit w-fit mt-6 px-24 py-8 flex flex-col vh-center">
          <h2 className="text-2xl">게임 결과</h2>
          <div className="relative inline-flex items-center gap-2 my-12">
            <GameResultModalPlayer player={result.winner} isWinner />
            <span className="pt-8 text-4xl text-gray-lighter font-light italic">
              <span className="text-green">{result.winner.score}</span> :{' '}
              <span className="relative">{result.loser.score}</span>
            </span>
            <GameResultModalPlayer player={result.loser} />
          </div>
          <Button onClick={handleClick} primary>
            게임 로비로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  );
}

function GameResultModalPlayer({
  player,
  isWinner = false,
}: {
  player: PlayerType;
  isWinner?: boolean;
}) {
  const imageSize = 52;

  return (
    <div className="p-4 flex flex-col vh-center">
      <div
        className={classNames(
          'text-2xl font-light italic mb-2',
          isWinner ? 'text-green' : 'text-gray'
        )}
      >
        {isWinner ? 'Win' : 'Lose'}
      </div>
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
