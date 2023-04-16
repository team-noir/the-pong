import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SocketContext } from 'contexts/socket';
import AppTemplate from 'components/templates/AppTemplate';
import Modal from 'components/templates/Modal';
import GameSetting from 'components/organisms/GameSetting';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import { GameSettingType } from 'types';

// TODO: 나중에 삭제
const dummyGameSetting: GameSettingType = {
  id: 1,
  players: [
    {
      id: 1,
      nickname: 'Nickname1',
      level: 1,
      isOwner: true,
    },
    {
      id: 3,
      nickname: 'Nickname2',
      level: 3,
      isOwner: false,
    },
  ],
  modes: ['normal', 'hard'],
  themes: [1, 2, 3],
  mode: 'normal',
  theme: 1,
  isLadder: false,
  createdAt: '2023-04-07T00:00:00.000Z',
};

export default function GameSettingPage() {
  const { gameId } = useParams() as { gameId: string };
  // TODO: 게임 설정 정보 API 호출
  const [gameSetting, setGameSetting] =
    useState<GameSettingType>(dummyGameSetting);
  const [isOtherUserLeft, setIsOtherUserLeft] = useState(false);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('ping', () => {
      socket.emit('pong');
    });

    socket.on(
      'gameSetting',
      (data: { text: string; mode?: string; theme?: number }) => {
        const { text, mode, theme } = data;
        if (text === 'change') {
          // TODO: 게임 설정 정보 다시 가져오기
          mode && setGameSetting((prevState) => ({ ...prevState, mode }));
          theme && setGameSetting((prevState) => ({ ...prevState, theme }));
        } else if (text === 'done') {
          navigate(`/game/${gameId}`);
        } else if (text === 'leave') {
          setIsOtherUserLeft(true);
        }
      }
    );

    return () => {
      socket.off('ping');
      socket.off('gameSetting');
    };
  }, []);

  const handleClick = () => {
    // TODO: 게임 나가기 핸들링
    alert('게임에서 나가시겠습니까?');
  };

  return (
    <>
      <AppTemplate
        header={<HeaderWithBackButton title="The Pong" onClick={handleClick} />}
      >
        <GameSetting gameSetting={gameSetting} />
      </AppTemplate>
      {isOtherUserLeft && (
        <Modal onClickClose={() => navigate('/game')} fitContent>
          <p>상대가 퇴장했습니다.</p>
        </Modal>
      )}
    </>
  );
}
