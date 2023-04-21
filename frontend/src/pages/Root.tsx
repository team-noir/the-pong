import GameInviteModal from 'components/molecule/GameInviteModal';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div>
      <GameInviteModal />
      <Outlet />
    </div>
  );
}
