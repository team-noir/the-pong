import GameButtons from 'components/organisms/GameButtons';
import GameLives from 'components/organisms/GameLives';

export default function GameLobby() {
  return (
    <>
      <section className="section">
        <h2 className="section-title">게임</h2>
        <GameButtons />
      </section>
      <section className="section">
        <h2 className="section-title">라이브 게임</h2>
        <GameLives />
      </section>
    </>
  );
}
