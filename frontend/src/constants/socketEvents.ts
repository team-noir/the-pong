const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  GAME: {
    PING: 'ping',
    PONG: 'pong',
    QUEUE: 'queue',
    INVITE: 'gameInvite',
    SETTING: 'gameSetting',
    START: 'gameStart',
    VIEWER: 'gameViewer',
    ROUND_OVER: 'roundOver',
    GAME_OVER: 'gameOver',
    ACHIEVMENT: 'achievment',
    RTC: {
      INIT: 'rtcInit',
      GET_CANDIDATE: 'rtcGetCandidate',
      GET_ANSWER: 'rtcGetAnswer',
      GET_OFFER: 'rtcGetOffer',
      CANDIDATE: 'rtcCandidate',
      OFFER: 'rtcOffer',
      ANSWER: 'rtcAnswer',
      CONNECTED: 'rtcConnected',
    },
  },
  CHANNEL: {
    MESSAGE: 'message',
    NOTICE: 'notice',
  },
} as const;

export default SOCKET_EVENTS;