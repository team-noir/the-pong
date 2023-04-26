import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SocketContext } from 'contexts/socket';
import GameInviteModal from 'components/molecule/GameInviteModal';

export default function Root() {
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.connect();
  }, []);

  return (
    <>
      <GameInviteModal />
      <Outlet />
    </>
  );
}
