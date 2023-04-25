import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { cancelInvitingGame, inviteGame } from 'api/api.v1';
import useGame from 'hooks/useGame';
import { SocketContext } from 'contexts/socket';
import Modal from 'components/templates/Modal';
import Button from 'components/atoms/Button';

export default function GameInviteButton() {
  const [isWating, setIsWating, alertCode, setAlertCode] = useGame();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const inviteGameMutation = useMutation({
    mutationFn: inviteGame,
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
    onError: (error: AxiosError) => {
      if (!error.response?.status) return;
      if ([400, 409].includes(error.response.status)) {
        setAlertCode('unavailable');
      } else {
        alert('다시 시도해 주세요.');
      }
      socket.off('queue');
    },
  });

  const cancelInvitingGameMutation = useMutation({
    mutationFn: cancelInvitingGame,
    onSuccess: () => setIsWating(false),
  });

  const handleClickInvite = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;
    inviteGameMutation.mutate(Number(userId));
  };

  const cancelWaiting = () => {
    cancelInvitingGameMutation.mutate();
  };

  return (
    <>
      <Button primary size="small" onClick={handleClickInvite}>
        게임 초대
      </Button>
      {isWating && (
        /* eslint-disable */
        <Modal onClickClose={() => {}} fitContent>
          <div className="text-center">
            <p>초대 수락을 기다리는 중...</p>
            <Button onClick={cancelWaiting}>취소</Button>
          </div>
        </Modal>
      )}
      {alertCode && (
        <Modal onClickClose={() => setAlertCode(null)} fitContent>
          <div className="text-center">
            <p>
              {alertCode === 'rejected' && '초대가 거절되었습니다.'}
              {alertCode === 'timeout' &&
                '60초 동안 응답이 없어 대기를 종료합니다.'}
              {alertCode == 'unavailable' && '초대할 수 없는 회원입니다.'}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
