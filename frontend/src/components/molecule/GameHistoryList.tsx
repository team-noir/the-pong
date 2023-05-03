import GameScoretable from 'components/molecule/GameScoretable';
import { classNames, formatDate, formatTime } from 'utils';
import { GameHistoryType } from 'types';

interface Props {
  histories: GameHistoryType[];
  userId: number;
}

export default function GameHistoryList({ histories, userId }: Props) {
  return (
    <ul className="flex flex-col -mx-4 overflow-x-hidden">
      {histories.map((history) => (
        <GameHistoryItem key={history.id} history={history} userId={userId} />
      ))}
    </ul>
  );
}

function GameHistoryItem({
  history,
  userId,
}: {
  history: GameHistoryType;
  userId: number;
}) {
  const isWin = history.winner.id === userId;

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

              <div className="pl-12">
                <GameScoretable
                  player1={history.winner}
                  player2={history.loser}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center mx-4 my-1 text-xs text-gray-light justify-end">
          {history.isLadder && (
            <>
              <span>{'승급전'}</span>
              <span className="w-[1px] h-3 bg-gray-dark mx-2"></span>
            </>
          )}
          <span>{`${formatDate(history.createdAt)} ${formatTime(
            history.createdAt
          )}`}</span>
        </div>
      </div>
    </>
  );
}
