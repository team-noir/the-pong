import Button from 'components/atoms/Button';

export default function MainGames() {
  const handleClickStartGame = (e: React.MouseEvent<HTMLElement>) => {
    // TODO: call api to start game
  };

  return (
    <section>
      <h2>Games</h2>
      <Button type="button" onClick={handleClickStartGame}>
        게임 시작하기
      </Button>
    </section>
  );
}
