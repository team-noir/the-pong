import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from 'contexts/socket';
import AppTemplate from 'components/templates/AppTemplate';
import Game from 'components/organisms/Game';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import AchievementModal from 'components/molecule/AchievementModal';
import ProfileImage from 'components/atoms/ProfileImage';
import Button from 'components/atoms/Button';
import { classNames } from 'utils';
import { GameType, GameResultType, PlayerType, AchievementType } from 'types';

// TODO: 나중에 삭제
const dummyGame: GameType = {
  id: 1,
  players: [
    {
      id: 1,
      nickname: 'Nickname1',
      level: 1,
      score: 0,
      isOwner: true,
    },
    {
      id: 101,
      nickname: 'Nickname2',
      level: 3,
      score: 0,
      isOwner: false,
    },
  ],
  mode: 0,
  theme: 1,
  viewerCount: 42,
  isLadder: false,
  createdAt: '2023-04-07T00:00:00.000Z',
};

const dummyResult: GameResultType = {
  id: 1,
  winner: {
    id: 1,
    nickname: 'Nickname1',
    level: 1,
    score: 11,
  },
  loser: {
    id: 101,
    nickname: 'Nickname2',
    level: 3,
    score: 9,
  },
  createdAt: '2023-04-07T00:00:00.000Z',
};

const dummyAchievements: AchievementType[] = [
  {
    id: 1,
    title: '업적 제목1',
    condition: '업적1 조건입니다.',
    description: '업적1 설명입니다.',
    createdAt: '2023-04-07T00:00:00.000Z',
  },
  {
    id: 2,
    title: '업적 제목2',
    condition: '업적2 조건입니다.',
    description: '업적2 설명입니다.',
    createdAt: '2023-04-07T00:00:00.000Z',
  },
];

export default function GamePage() {
  const { gameId } = useParams() as { gameId: string };
  const socket = useContext(SocketContext);

  // TODO: 게임 정보 가져오기
  const [game, setGame] = useState<GameType>(dummyGame);

  const [result, setResult] = useState<GameResultType | null>(null);
  const [achievements, setAchievements] = useState<AchievementType[] | null>(
    null
  );

  // TODO: 아래 테스트용 코드 지우기
  // useEffect(() => {
  //   setResult(dummyResult);
  //   setAchievements(dummyAchievements);
  // }, []);

  useEffect(() => {
    socket.on('gameResult', (data: GameResultType) => {
      setResult(data);
    });
    socket.on('achievement', (data: AchievementType) => {
      setAchievements((prev) => {
        if (prev) return [...prev, data];
        return [data];
      });
    });
    return () => {
      socket.off('gameResult');
      socket.off('achievement');
    };
  }, [socket]);

  const handleClick = () => {
    // TODO: 게임 나가기 핸들링
    alert('게임에서 나가시겠습니까?');
  };

  const closeAchievement = (achievementId: number) => {
    setAchievements((prev) => {
      if (prev) {
        return prev.filter(
          (prevAchievement) => prevAchievement.id !== achievementId
        );
      }
      return null;
    });
  };

  return (
    <AppTemplate
      header={<HeaderWithBackButton title="The Pong" onClick={handleClick} />}
    >
      {result && <GameResultModal result={result} />}
      {achievements &&
        achievements.map((achievement) => (
          <AchievementModal
            key={achievement.id}
            achievement={achievement}
            onClickClose={() => {
              closeAchievement(achievement.id);
            }}
          />
        ))}
      <Game game={game} />
    </AppTemplate>
  );
}

function GameResultModal({ result }: { result: GameResultType }) {
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
