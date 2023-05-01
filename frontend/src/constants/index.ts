import { GameOptionType, GameThemeType } from 'types';

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

export const BACKGROUND_IMAGES = {
  WELCOME: `${process.env.PUBLIC_URL}/images/welcome-background.jpg`,
  GAME_BACKSTREET: `${process.env.PUBLIC_URL}/images/bg_backstreet.jpg`,
  GAME_PIER: `${process.env.PUBLIC_URL}/images/bg_pier.jpg`,
  GAME_STORAGE: `${process.env.PUBLIC_URL}/images/bg_storage.jpg`,
};

export const DEFAULT_PROFILE_IMAGE = `${process.env.PUBLIC_URL}/images/default-profile-image.png`;

export const SOCKET_URI =
  process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const GAME_MODES: readonly GameOptionType[] = [
  { name: '보통' },
  { name: '빠른 공' },
  { name: '짧은 패들' },
] as const;

export const GAME_THEMES: readonly GameThemeType[] = [
  {
    name: '창고',
    backgroundImage: BACKGROUND_IMAGES.GAME_STORAGE,
  },
  {
    name: '뒷골목',
    backgroundImage: BACKGROUND_IMAGES.GAME_BACKSTREET,
  },
  {
    name: '부두',
    backgroundImage: BACKGROUND_IMAGES.GAME_PIER,
  },
] as const;
