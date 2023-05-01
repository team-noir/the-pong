export const SERVICE_NAME = 'The Pong';

/** Socket */

export const SOCKET_URI =
  process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const NOTICE_STATUS = {
  USER_JOIN: 100,
  USER_LEAVE: 101,
  USER_INVITE: 102,
  USER_GRANT: 200,
  USER_REVOKE: 201,
  USER_KICK: 300,
  USER_BAN: 301,
  USER_MUTE: 302,
  USER_UNMUTE: 303,
  CHANNEL_REMOVE: 400,
} as const;

/** Image files */

export const BACKGROUND_IMAGES = {
  WELCOME: `${process.env.PUBLIC_URL}/images/welcome-background.jpg`,
  GAME_BACKSTREET: `${process.env.PUBLIC_URL}/images/bg_backstreet.jpg`,
  GAME_PIER: `${process.env.PUBLIC_URL}/images/bg_pier.jpg`,
  GAME_STORAGE: `${process.env.PUBLIC_URL}/images/bg_storage.jpg`,
} as const;

export const DEFAULT_PROFILE_IMAGE = `${process.env.PUBLIC_URL}/images/default-profile-image.png`;

export const UI_TEXT = {
  ERROR: {
    DEFAULT: '무언가 잘못되었습니다. 다시 시도해주세요.',
  },
} as const;
