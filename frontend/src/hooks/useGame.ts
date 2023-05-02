import { useContext, useEffect, useState } from 'react';
import { onPing } from 'api/socket.v1';
import { SocketContext } from 'contexts/socket';
import SOCKET_EVENTS from 'constants/socketEvents';

type ReturnType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
];

export default function useGame(): ReturnType {
  const [isWating, setIsWating] = useState(false);
  const [alertCode, setAlertCode] = useState<string | null>(null);
  const socket = useContext(SocketContext);

  useEffect(() => {
    if (!isWating) return;
    onPing();

    return () => {
      socket.off(SOCKET_EVENTS.GAME.PING);
      socket.off(SOCKET_EVENTS.GAME.QUEUE);
    };
  }, [isWating]);

  return [isWating, setIsWating, alertCode, setAlertCode];
}
