import { useContext, useEffect, useState } from 'react';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { waitGame } from 'api/api.v1';
import { SocketContext } from 'contexts/socket';

type ReturnType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  UseMutationResult<AxiosResponse, AxiosError, boolean>
];

export default function useGame(): ReturnType {
  const [isWating, setIsWating] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const socket = useContext(SocketContext);

  const waitGameMutation = useMutation<AxiosResponse, AxiosError, boolean>({
    mutationFn: waitGame,
    onSuccess: () => setIsWating(true),
  });

  useEffect(() => {
    if (!isWating) return;

    socket.on('ping', () => {
      socket.emit('pong');
    });

    socket.on('queue', (data: { gameId?: number }) => {
      if (data.gameId) {
        // TODO: 게임 설정 페이지로 이동
      } else {
        setIsTimeOut(true);
        setIsWating(false);
      }
    });

    return () => {
      socket.off('ping');
      socket.off('queue');
    };
  }, [isWating]);

  return [isWating, setIsWating, isTimeOut, setIsTimeOut, waitGameMutation];
}
