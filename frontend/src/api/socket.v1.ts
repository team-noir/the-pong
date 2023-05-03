import { socket } from 'contexts/socket';
import {
  AchievementType,
  GameResultType,
  MessageType,
  NoticeType,
  UserType,
} from 'types';
import SOCKET_EVENTS from 'constants/socketEvents';

export const onConnect = () => {
  socket.on(SOCKET_EVENTS.CONNECT, () => console.info('socket connected'));
};

export const onDisconnect = () => {
  socket.on(SOCKET_EVENTS.DISCONNECT, () =>
    console.info('socket disconnected')
  );
};

/** Game */

export const onPing = () => {
  socket.on(SOCKET_EVENTS.GAME.PING, () => emitPong());
};

export const onQueue = (
  callback: (data: { text: string; gameId?: number }) => void
) => {
  socket.on(SOCKET_EVENTS.GAME.QUEUE, callback);
};

export const onGameInvite = (
  callback: (data: { text: string; user?: UserType; gameId?: number }) => void
) => {
  socket.on(SOCKET_EVENTS.GAME.INVITE, callback);
};

export const onGameSetting = (
  callback: (data: { text: string; mode?: number; theme?: number }) => void
) => {
  socket.on(SOCKET_EVENTS.GAME.SETTING, callback);
};

export const onGameStart = (callback: () => void) => {
  socket.on(SOCKET_EVENTS.GAME.START, callback);
};

export const onGameViewer = (
  callback: (data: { viewerCount: number }) => void
) => {
  socket.on(SOCKET_EVENTS.GAME.VIEWER, callback);
};

export const onRoundOver = (
  callback: (data: { winnerId: number; score: number }) => void
) => {
  socket.on(SOCKET_EVENTS.GAME.ROUND_OVER, callback);
};

export const onGameOver = (callback: (data: GameResultType) => void) => {
  socket.on(SOCKET_EVENTS.GAME.GAME_OVER, callback);
};

export const onAchievment = (callback: (data: AchievementType) => void) => {
  socket.on(SOCKET_EVENTS.GAME.ACHIEVMENT, callback);
};

export const emitPong = () => {
  socket.emit(SOCKET_EVENTS.GAME.PONG);
};

export const emitRoundOver = (playerId: number) => {
  socket.emit(SOCKET_EVENTS.GAME.ROUND_OVER, { winnerId: playerId });
};

/** Game RTC */

export const onRtcInit = (callback: (data: { userId: number }) => void) => {
  socket.on(SOCKET_EVENTS.GAME.RTC.INIT, callback);
};

export const onRtcGetCandidate = (
  callback: (data: {
    candidate: RTCIceCandidateInit;
    candidateSendUserId: number;
  }) => void
) => {
  socket.on(SOCKET_EVENTS.GAME.RTC.GET_CANDIDATE, callback);
};

export const onRtcGetAnswer = (
  callback: (data: {
    sdp: RTCSessionDescription;
    answerSendUserId: number;
  }) => void
) => {
  socket.on(SOCKET_EVENTS.GAME.RTC.GET_ANSWER, callback);
};

export const onRtcGetOffer = (
  callback: (data: {
    sdp: RTCSessionDescription;
    offerSendUserId: number;
  }) => void
) => {
  socket.on(SOCKET_EVENTS.GAME.RTC.GET_OFFER, callback);
};

export const emitRtcCandidate = (
  candidate: RTCIceCandidate,
  candidateSendUserId: number,
  candidateReceiveUserId: number
) => {
  socket.emit(SOCKET_EVENTS.GAME.RTC.CANDIDATE, {
    candidate,
    candidateSendUserId,
    candidateReceiveUserId,
  });
};

export const emitRtcOffer = (
  sdp: RTCSessionDescriptionInit,
  offerSendUserId: number,
  offerReceiveUserId: number
) => {
  socket.emit(SOCKET_EVENTS.GAME.RTC.OFFER, {
    sdp,
    offerSendUserId,
    offerReceiveUserId,
  });
};

export const emitRtcAnswer = (
  sdp: RTCSessionDescriptionInit,
  answerSendUserId: number,
  answerReceiveUserId: number
) => {
  socket.emit(SOCKET_EVENTS.GAME.RTC.ANSWER, {
    sdp,
    answerSendUserId,
    answerReceiveUserId,
  });
};

export const emitConnected = (userId: number) => {
  socket.emit(SOCKET_EVENTS.GAME.RTC.CONNECTED, { userId });
};

/** Channel */

export const onMessage = (callback: (data: MessageType) => void) => {
  socket.on(SOCKET_EVENTS.CHANNEL.MESSAGE, callback);
};

export const onNotice = (callback: (data: NoticeType) => void) => {
  socket.on(SOCKET_EVENTS.CHANNEL.NOTICE, callback);
};

export const onUser = (callback: () => void) => {
  socket.on(SOCKET_EVENTS.CHANNEL.USER, callback);
};
