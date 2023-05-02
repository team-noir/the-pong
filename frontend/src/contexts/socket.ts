import { createContext } from 'react';
import { io } from 'socket.io-client';
import { onConnect, onDisconnect } from 'api/socket.v1';
import { SOCKET_URI } from 'constants/index';

export const socket = io(SOCKET_URI, {
  withCredentials: true,
  autoConnect: false,
});

onConnect();
onDisconnect();

export const SocketContext = createContext(socket);
