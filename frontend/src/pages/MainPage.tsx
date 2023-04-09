import GameButtons from 'components/organisms/GameButtons';
import ChannelButtons from 'components/organisms/ChannelButtons';

export default function MainPage() {
  return (
    <>
      <section className="section">
        <h2 className="section-title">게임</h2>
        <GameButtons />
      </section>
      <section className="section">
        <h2 className="section-title">채널</h2>
        <ChannelButtons />
      </section>
    </>
  );
}
