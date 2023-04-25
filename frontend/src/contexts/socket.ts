import { createContext } from 'react';
import { io } from 'socket.io-client';

export const socket = io('localhost:8080', {
  withCredentials: true,
  autoConnect: false,
});

socket.on('connect', () => console.info('socket connected'));
socket.on('disconnect', () => console.info('socket disconnected'));

export const SocketContext = createContext(socket);
