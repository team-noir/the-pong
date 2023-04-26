import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getGame } from 'api/api.v1';
import { SocketContext } from 'contexts/socket';
import AppTemplate from 'components/templates/AppTemplate';
import Game from 'components/organisms/Game';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import AchievementModal from 'components/molecule/AchievementModal';
import { AchievementType } from 'types';

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

  const { data: game } = useQuery({
    queryKey: ['game', gameId],
    queryFn: () => getGame(Number(gameId)),
  });

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
      {game && <Game game={game} />}
    </AppTemplate>
  );
}
