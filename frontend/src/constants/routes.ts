const ROUTES = {
  MAIN: '/',
  LOGIN: '/login',
  TWO_FACTOR_AUTH: '/2fa',
  GAME: {
    INDEX: '/game',
    CHILDREN: {
      GAME: ':gameId',
      SETTING: ':gameId/setting',
    },
    ROOM: (id: number) => `${ROUTES.GAME.INDEX}/${id}`,
    SETTING: (id: number) => `${ROUTES.GAME.INDEX}/${id}/setting`,
  },
  CHANNEL: {
    INDEX: '/channel',
    CHILDREN: {
      BROWSE: 'browse',
      NEW: 'new',
      CHANNEL: ':channelId',
    },
    ROOM: (id: number) => `${ROUTES.CHANNEL.INDEX}/${id}`,
  },
  ONBOARDING: '/onboarding',
  WELCOME: '/welcome',
  SETTING: {
    INDEX: '/setting',
    CHILDREN: {
      PROFILE: 'profile',
      TWO_FACTOR_AUTH: '2fa',
      BLOCKS: 'blocks',
    },
  },
  FOLLOWING: '/following',
  PROFILE: {
    INDEX: '/profile',
    CHILDREN: {
      USER: ':userId',
    },
    USER: (id: number) => `${ROUTES.PROFILE.INDEX}/${id}`,
  },
  SEARCH: '/search',
} as const;

export default ROUTES;
