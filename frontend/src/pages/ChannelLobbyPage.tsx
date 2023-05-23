import AppTemplate from 'components/templates/AppTemplate';
import ChannelLobby from 'components/organisms/ChannelLobby';
import HeaderGnb from 'components/molecule/HeaderGnb';

export default function ChannelLobbyPage() {
  return (
    <AppTemplate header={<HeaderGnb />}>
      <ChannelLobby />
    </AppTemplate>
  );
}
