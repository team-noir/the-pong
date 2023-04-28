import AppTemplate from 'components/templates/AppTemplate';
import HeaderGnb from 'components/molecule/HeaderGnb';
import GameLobby from 'components/organisms/GameLobby';

export default function GameLobbyPage() {
  return (
    <AppTemplate header={<HeaderGnb />}>
      <GameLobby />
    </AppTemplate>
  );
}
