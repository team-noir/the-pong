export const ONESECOND = 1000;
export const ONEHOUR = 3600 * ONESECOND;
export const PROFILE_PATH = 'uploads/profile-images/';
export const PROFILE_IMAGE_MAX_SIZE = 1048576; // 1MB

// Socket API 'notice' event codes
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
};

export const NOTICE_STATUS_MESSAGE = {
  [NOTICE_STATUS.USER_JOIN]: '님이 채널에 참여했습니다.',
  [NOTICE_STATUS.USER_LEAVE]: '님이 채널에서 나갔습니다.',
  [NOTICE_STATUS.USER_INVITE]: '님이 채널에 초대되었습니다.',
  [NOTICE_STATUS.USER_GRANT]: '님이 채널의 관리자가 되었습니다.',
  [NOTICE_STATUS.USER_REVOKE]: '님이 채널의 관리자에서 해제되었습니다.',
  [NOTICE_STATUS.USER_KICK]: '님이 채널에서 내보내졌습니다.',
  [NOTICE_STATUS.USER_BAN]:
    '님이 채널에서 차단되었습니다. 채널에 다시 참여할 수 없습니다.',
  [NOTICE_STATUS.USER_MUTE]: '님이 30초간 조용히 상태가 되었습니다.',
  [NOTICE_STATUS.USER_UNMUTE]: '님의 조용히 상태가 해제되었습니다.',
  [NOTICE_STATUS.CHANNEL_REMOVE]:
    '님이 채널을 삭제했습니다. 더 이상 대화를 할 수 없습니다.',
};

export const GAME_STATUS = {
  WAITING: 0,
  READY: 1,
  PLAYING: 2,
  FINISHED: 3,
};
