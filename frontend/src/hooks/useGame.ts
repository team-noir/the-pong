import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  useEffect(() => {
    if (!isWating) return;

    socket.on('ping', () => {
      socket.emit('pong');
    });

    socket.on('queue', (data: { text: string; gameId?: number }) => {
      if (data.gameId) {
        navigate(`/game/${data.gameId}/setting`);
      } else {
        setAlertCode(data.text);
        setIsWating(false);
      }
    });

    return () => {
      socket.off('ping');
      socket.off('queue');
    };
  }, [isWating]);

  return [isWating, setIsWating, alertCode, setAlertCode];
}
