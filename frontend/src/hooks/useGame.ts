import { useContext, useEffect, useState } from 'react';
import { SocketContext } from 'contexts/socket';

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

    socket.on('ping', () => {
      socket.emit('pong');
    });

    return () => {
      socket.off('ping');
      socket.off('queue');
    };
  }, [isWating]);

  return [isWating, setIsWating, alertCode, setAlertCode];
}
