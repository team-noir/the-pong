import ProfileImage from 'components/atoms/ProfileImage';
import { GameHistoryType, PlayerType } from 'types';
import { classNames } from 'utils';
import { GameHistoryPlayerType } from 'types';

interface Props {
  histories: GameHistoryType[];
  myUserId: number;
}

export default function GameHistoryList({ histories, myUserId }: Props) {
  return (
    <ul className="flex flex-col -mx-4 overflow-x-hidden">
      {histories.map((history) => (
        <GameHistoryItem
          key={history.id}
          history={history}
          myUserId={myUserId}
        />
      ))}
    </ul>
  );
}

function GameHistoryItem({
  history,
  myUserId,
}: {
  history: GameHistoryType;
  myUserId: number;
}) {
  const isWin = history.winner.id === myUserId;

  return (
    <>
      <div className="mb-4">
        <div className="relative w-full h-full min-h-20 my-1 drop-shadow hover:drop-shadow-lg hover:-translate-y-1 transition-transform duration-500">
          <div className="relative flex items-center justify-around min-h-20 w-full px-4">
            <div className="min-w-[8rem]">
              <span
                className={classNames(
                  'text-6xl font-thin italic',
                  isWin ? 'text-green' : 'text-gray'
                )}
              >
                {isWin ? 'Win' : 'Lose'}
              </span>
            </div>

            <div className="relative">
              {/* Background */}
              <div className="absolute flex items-stretch w-[130%] h-full select-none">
                <div className="bg-gray h-full flex-1 transform skew-x-[335deg]"></div>
              </div>

              <div className="relative inline-flex items-center gap-2 pl-12">
                <GameHistoryItemPlayer player={history.winner} isWinner />
                <span className="text-4xl text-gray-lighter font-light italic">
                  <span className="text-green">{history.winner.score}</span> :{' '}
                  <span className={classNames('relative')}>
                    {history.loser.score}
                  </span>
                </span>
                <GameHistoryItemPlayer player={history.loser} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center mx-4 my-1 text-xs text-gray-light justify-end">
          <span>{formatDate(history.createdAt)}</span>
        </div>
      </div>
    </>
  );
}

function GameHistoryItemPlayer({
  player,
  isWinner = false,
}: {
  player: GameHistoryPlayerType;
  isWinner?: boolean;
}) {
  const imageSize = 52;

  return (
    <div
      className={classNames(
        'flex-initial p-4 flex flex-col items-center justify-between'
      )}
    >
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
      <span className="items-center mt-1 px-2 py-1 bg-gray-dark rounded-full text-xs text-text-light">
        Lv. {player.level}
      </span>
    </div>
  );
}

// Utils
// TODO: move to utils

function formatDate(iso: string) {
  const d = new Date(iso);
  const locale = 'ko-KR';
  const date = d
    .toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/ /g, '');
  const time = d.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${date} ${time}`;
}
