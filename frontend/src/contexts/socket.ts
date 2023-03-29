import * as io from 'socket.io-client';
import React from 'react';

const jwt =
  document.cookie
    .split('; ')
    .find((row) => row.startsWith('Authorization='))
    ?.split('=')[1] || '';

export const socket = io.connect('localhost:8080', {
  extraHeaders: {
    token: jwt,
  },
});

// TODO: 나중에 지우기~! (연결 상태 확인)
socket.on('connect', () => console.log('hey'));

export const SocketContext = React.createContext(socket);
