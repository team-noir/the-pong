import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getGameSetting } from 'api/api.v1';
import { SocketContext } from 'contexts/socket';
import AppTemplate from 'components/templates/AppTemplate';
import Modal from 'components/templates/Modal';
import GameSetting from 'components/organisms/GameSetting';
import HeaderWithBackButton from 'components/molecule/HeaderWithBackButton';
import { GameSettingType } from 'types';

export default function GameSettingPage() {
  const { gameId } = useParams() as { gameId: string };
  const [isOtherUserLeft, setIsOtherUserLeft] = useState(false);
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: gameSetting } = useQuery({
    queryKey: ['gameSetting', gameId],
    queryFn: () => getGameSetting(Number(gameId)),
    refetchInterval: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    socket.on('ping', () => {
      socket.emit('pong');
    });

    socket.on(
      'gameSetting',
      (data: { text: string; mode?: number; theme?: number }) => {
        const { text, mode, theme } = data;
        if (text === 'change') {
          queryClient.setQueryData<GameSettingType>(
            ['gameSetting', gameId],
            (prevData) =>
              prevData &&
              ({
                ...prevData,
                mode: mode !== null ? mode : prevData.mode,
                theme: theme !== null ? theme : prevData.theme,
              } as GameSettingType)
          );
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
        {gameSetting && <GameSetting gameSetting={gameSetting} />}
      </AppTemplate>
      {isOtherUserLeft && (
        <Modal onClickClose={() => navigate('/game')} fitContent>
          <div className="text-center">
            <p>상대가 퇴장했습니다.</p>
          </div>
        </Modal>
      )}
    </>
  );
}
