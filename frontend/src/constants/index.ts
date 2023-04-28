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
};

export const DEFAULT_PROFILE_IMAGE = `${process.env.PUBLIC_URL}/images/default-profile-image.png`;

export const SOCKET_URI = process.env.REACT_APP_API_URL || 'http://localhost';
