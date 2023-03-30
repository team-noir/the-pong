import * as io from 'socket.io-client';
import React from 'react';

export const socket = io.connect('localhost:8080', {
  withCredentials: true,
});

// TODO: 나중에 지우기~! (연결 상태 확인)
socket.on('connect', () => console.log('socket connected'));

export const SocketContext = React.createContext(socket);
