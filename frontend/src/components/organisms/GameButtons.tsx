import Button from 'components/atoms/Button';

export default function GameButtons() {
  const handleClickStartNormalGame = () => {
    // TODO: call api to start normal game
  };

  const handleClickStartLadderGame = () => {
    // TODO: call api to start ladder game
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        primary
        fullLength
        onClick={handleClickStartNormalGame}
      >
        일반 게임 시작하기
      </Button>
      <Button
        type="button"
        secondary
        fullLength
        onClick={handleClickStartLadderGame}
      >
        승급 게임 시작하기
      </Button>
    </div>
  );
}
