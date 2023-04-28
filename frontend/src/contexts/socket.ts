import { createContext } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URI } from 'constants/index';

export const socket = io(SOCKET_URI, {
  withCredentials: true,
  autoConnect: false,
});

socket.on('connect', () => console.info('socket connected'));
socket.on('disconnect', () => console.info('socket disconnected'));

export const SocketContext = createContext(socket);
