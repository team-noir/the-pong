import useGame from 'hooks/useGame';
import Modal from 'components/templates/Modal';
import Button from 'components/atoms/Button';

export default function GameButtons() {
  const [isWating, setIsWating, isTimeOut, setIsTimeOut, waitGameMutation] =
    useGame();

  const cancelWaiting = () => {
    // TODO: 취소 API 요청
    setIsWating(false);
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
        <Modal onClickClose={cancelWaiting}>
          <p>게임 상대를 기다리는 중...</p>
          <Button onClick={cancelWaiting}>취소</Button>
        </Modal>
      )}
      {isTimeOut && (
        <Modal onClickClose={() => setIsTimeOut(false)}>
          <p>게임 상대를 찾을 수 없습니다.</p>
        </Modal>
      )}
    </>
  );
}
