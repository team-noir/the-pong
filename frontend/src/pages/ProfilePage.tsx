import { useParams } from 'react-router-dom';
import AppTemplate from 'components/templates/AppTemplate';
import Profile from 'components/organisms/Profile';
// import Achievements from 'components/organisms/Achievements';
import GameHistory from 'components/organisms/GameHistory';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function ProfilePage() {
  const { userId } = useParams() as { userId: string };

  return (
    <AppTemplate header={<HeaderGnb />}>
      <section className="section">
        <Profile userId={Number(userId)} />
      </section>
      <section className="section">
        <h2 className="section-title">업적</h2>
        {/* <Achievements userId={Number(userId)} /> */}
      </section>
      <GameHistory userId={Number(userId)} />
    </AppTemplate>
  );
}
