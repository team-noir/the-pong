import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { inviteGame } from 'api/api.v1';
import Button from 'components/atoms/Button';
import Modal from 'components/templates/Modal';
import useGame from 'hooks/useGame';

export default function GameInviteButton() {
  const [isWating, setIsWating, alertCode, setAlertCode] = useGame();

  const inviteGameMutation = useMutation({
    mutationFn: inviteGame,
    onSuccess: () => setIsWating(true),
    onError: (error: AxiosError) => {
      if (!error.status) return;

      if ([400, 409].includes(error.status)) {
        setAlertCode('unavailable');
      } else {
        alert('다시 시도해 주세요.');
      }
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
      {alertCode && (
        <Modal onClickClose={() => setAlertCode(null)} fitContent>
          <p>
            {alertCode === 'rejected' && '초대가 거절되었습니다.'}
            {alertCode === 'timeout' &&
              '60초 동안 응답이 없어 대기를 종료합니다.'}
            {alertCode == 'unavailable' && '초대할 수 없는 회원입니다.'}
          </p>
        </Modal>
      )}
    </>
  );
}
