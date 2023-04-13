import { useMutation } from '@tanstack/react-query';
import { inviteGame } from 'api/api.v1';
import Button from 'components/atoms/Button';
import Modal from 'components/templates/Modal';
import useGame from 'hooks/useGame';

export default function GameInviteButton() {
  const [isWating, setIsWating, alert, setAlert] = useGame();

  const inviteGameMutation = useMutation({
    mutationFn: inviteGame,
    onSuccess: () => setIsWating(true),
    onError: () => {
      // TODO: 초대 불가능한 경우만 처리(이미 게임중, 내가 차단한/나를 차단한 회원)
      setAlert('unavailable');
      // 그 외의 경우
      // alert('다시 시도해 주세요.');
    },
  });

  const handleClickInvite = (e: React.MouseEvent<HTMLElement>) => {
    const ancestorElement = e.currentTarget.closest('[data-user-id]');
    if (!(ancestorElement instanceof HTMLElement)) return;
    const userId = ancestorElement.dataset.userId;
    console.log('userId', userId);
    inviteGameMutation.mutate(Number(userId));
  };

  const cancelWaiting = () => {
    // TODO: 초대 취소 API 요청
    setIsWating(false);
  };

  return (
    <>
      <Button primary size="small" onClick={handleClickInvite}>
        게임 초대
      </Button>
      {isWating && (
        <Modal onClickClose={cancelWaiting} fitContent>
          <p>초대 수락을 기다리는 중...</p>
          <Button onClick={cancelWaiting}>취소</Button>
        </Modal>
      )}
      {alert && (
        <Modal onClickClose={() => setAlert(null)} fitContent>
          <p>
            {alert === 'rejected' && '초대가 거절되었습니다.'}
            {alert === 'timeout' && '60초 동안 응답이 없어 대기를 종료합니다.'}
            {alert == 'unavailable' && '초대할 수 없는 회원입니다.'}
          </p>
        </Modal>
      )}
    </>
  );
}
