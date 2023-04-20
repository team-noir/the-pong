import { useMutation } from '@tanstack/react-query';
import { cancelWaitingGame, waitGame } from 'api/api.v1';
import useGame from 'hooks/useGame';
import Modal from 'components/templates/Modal';
import Button from 'components/atoms/Button';

export default function GameButtons() {
  const [isWating, setIsWating, alert, setAlert] = useGame();

  const waitGameMutation = useMutation({
    mutationFn: waitGame,
    onSuccess: () => setIsWating(true),
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
        <Modal onClickClose={cancelWaiting} fitContent>
          <p>게임 상대를 기다리는 중...</p>
          <Button onClick={cancelWaiting}>취소</Button>
        </Modal>
      )}
      {alert && (
        <Modal onClickClose={() => setAlert(null)} fitContent>
          <p>게임 상대를 찾을 수 없습니다.</p>
        </Modal>
      )}
    </>
  );
}
