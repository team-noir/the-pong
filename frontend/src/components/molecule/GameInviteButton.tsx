import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { StatusCodes } from 'http-status-codes';
import { AxiosError } from 'axios';
import { cancelInvitingGame, inviteGame } from 'api/rest.v1';
import { onQueue } from 'api/socket.v1';
import useGame from 'hooks/useGame';
import { SocketContext } from 'contexts/socket';
import Modal from 'components/templates/Modal';
import Button from 'components/atoms/Button';
import ROUTES from 'constants/routes';
import { GAME_INVITE_TEXT, UI_TEXT } from 'constants/index';
import SOCKET_EVENTS from 'constants/socketEvents';

export default function GameInviteButton() {
  const [isWating, setIsWating, alertCode, setAlertCode] = useGame();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();

  const inviteGameMutation = useMutation({
    mutationFn: inviteGame,
    onMutate: () => {
      onQueue((data: { text: string; gameId?: number }) => {
        if (data.gameId) {
          navigate(ROUTES.GAME.SETTING(data.gameId));
        } else {
          setAlertCode(data.text);
          setIsWating(false);
        }
      });
    },
    onSuccess: () => setIsWating(true),
    onError: (error: AxiosError) => {
      if (!error.response?.status) return;
      if (
        [StatusCodes.BAD_REQUEST, StatusCodes.CONFLICT].includes(
          error.response.status
        )
      ) {
        setAlertCode(GAME_INVITE_TEXT.UNAVAILABLE);
      } else {
        alert(UI_TEXT.ERROR.DEFAULT);
      }
      socket.off(SOCKET_EVENTS.GAME.QUEUE);
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
        <Modal onClickClose={() => {}} isShowClose={false} fitContent>
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
              {alertCode === GAME_INVITE_TEXT.REJECTED &&
                '초대가 거절되었습니다.'}
              {alertCode === GAME_INVITE_TEXT.TIMEOUT &&
                '60초 동안 응답이 없어 대기를 종료합니다.'}
              {alertCode == GAME_INVITE_TEXT.UNAVAILABLE &&
                '초대할 수 없는 회원입니다.'}
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}
