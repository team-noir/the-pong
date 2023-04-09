import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AppTemplate from 'components/templates/AppTemplate';
import Game from 'components/organisms/Game';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import { GameType } from 'types';

// TODO: 나중에 삭제
const dummyGame: GameType = {
  id: 1,
  players: [
    {
      id: 1,
      nickname: 'Nickname1',
      level: 1,
    },
    {
      id: 101,
      nickname: 'Nickname2',
      level: 3,
    },
  ],
  mode: 'normal',
  theme: 1,
  viewerCount: 42,
  isLadder: false,
  createdAt: '2023-04-07T00:00:00.000Z',
};

export default function GamePage() {
  const { gameId } = useParams() as { gameId: string };
  // TODO: 게임 정보 가져오기
  const [game, setGame] = useState<GameType>(dummyGame);

  const handleClick = () => {
    // TODO: 게임 나가기 핸들링
    alert('게임에서 나가시겠습니까?');
  };

  return (
    <AppTemplate
      header={<HeaderWithBackButton title="The Pong" onClick={handleClick} />}
    >
      <Game game={game} />
    </AppTemplate>
  );
}
