import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { cancelWaitingGame, waitGame } from 'api/api.v1';
import useGame from 'hooks/useGame';
import { SocketContext } from 'contexts/socket';
import Modal from 'components/templates/Modal';
import Button from 'components/atoms/Button';

export default function GameButtons() {
  const [isWating, setIsWating, alertCode, setAlertCode] = useGame();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const waitGameMutation = useMutation({
    mutationFn: waitGame,
    onMutate: () => {
      socket.on('queue', (data: { text: string; gameId?: number }) => {
        if (data.gameId) {
          navigate(`/game/${data.gameId}/setting`);
        } else {
          setAlertCode(data.text);
          setIsWating(false);
        }
      });
    },
    onSuccess: () => setIsWating(true),
    onError: () => {
      socket.off('queue');
      console.log('다시 시도해 주세요.');
    },
  });

  const cancelWaitingGameMutation = useMutation({
    mutationFn: cancelWaitingGame,
    onSuccess: () => setIsWating(false),
  });

  const cancelWaiting = () => {
    cancelWaitingGameMutation.mutate();
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          type="button"
          primary
          fullLength
          onClick={() => waitGameMutation.mutate(false)}
        >
          일반 게임 시작하기
        </Button>
        <Button
          type="button"
          secondary
          fullLength
          onClick={() => waitGameMutation.mutate(true)}
        >
          승급 게임 시작하기
        </Button>
      </div>
      {isWating && (
        /* eslint-disable */
        <Modal onClickClose={() => {}} fitContent>
          <div className="text-center">
            <p>게임 상대를 기다리는 중...</p>
            <Button onClick={cancelWaiting}>취소</Button>
          </div>
        </Modal>
      )}
      {alertCode && (
        <Modal onClickClose={() => setAlertCode(null)} fitContent>
          <div className="text-center">
            <p>게임 상대를 찾을 수 없습니다.</p>
          </div>
        </Modal>
      )}
    </>
  );
}
