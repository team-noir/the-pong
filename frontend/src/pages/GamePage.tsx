import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { SocketContext } from 'contexts/socket';
import AppTemplate from 'components/templates/AppTemplate';
import Game from 'components/organisms/Game';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import AchievementModal from 'components/molecule/AchievementModal';
import { GameType, AchievementType } from 'types';

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

  const [achievements, setAchievements] = useState<AchievementType[] | null>(
    null
  );

  // TODO: 아래 테스트용 코드 지우기
  // useEffect(() => {
  //   setAchievements(dummyAchievements);
  // }, []);

  useEffect(() => {
    socket.on('achievement', (data: AchievementType) => {
      setAchievements((prev) => {
        if (prev) return [...prev, data];
        return [data];
      });
    });
    return () => {
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
