import AppTemplate from 'components/templates/AppTemplate';
import GameButtons from 'components/organisms/GameButtons';
import ChannelButtons from 'components/organisms/ChannelButtons';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function MainPage() {
  return (
    <AppTemplate header={<HeaderGnb />}>
      <section className="section">
        <h2 className="section-title">게임</h2>
        <GameButtons />
      </section>
      <section className="section">
        <h2 className="section-title">채널</h2>
        <ChannelButtons />
      </section>
    </AppTemplate>
  );
}
