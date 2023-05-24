import { StatusCodes } from 'http-status-codes';
import axios, { AxiosResponse } from 'axios';
import {
  UserType,
  AchievementType,
  GameType,
  GameHistoryType,
  ChannelType,
  ChannelUserRoleType,
  ChannelUserStatusType,
  ChannelFormType,
  MessageType,
  ListWithPagingType,
  PageParamsType,
} from 'types';

export const API_PREFIX = `${process.env.REACT_APP_API_URL}/api/v1`;

axios.defaults.baseURL = API_PREFIX;
axios.defaults.withCredentials = true;

const axiosWithInterceptors = axios.create();
axiosWithInterceptors.defaults.baseURL = API_PREFIX;
axiosWithInterceptors.defaults.withCredentials = true;

axiosWithInterceptors.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === StatusCodes.UNAUTHORIZED) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const healthCheck = async () => {
  const res = await axios.get(`/health-check`);
  return res;
};

/** Auth */

export const API_LOGIN_FT = `${API_PREFIX}/auth/42`;

export const anonymousLogin = async () => {
  const res = await axiosWithInterceptors.post(`/auth/login/anonymous`);
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res;
};

export const logout = async () => {
  const res = await axiosWithInterceptors.post(`/auth/logout`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const get2faCode = async (): Promise<{ qr: string; key: string }> => {
  const res = await axiosWithInterceptors.get(`/auth/2fa`);
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const verify2fa = async (code: string) => {
  const res = await axiosWithInterceptors.post(`/auth/2fa`, { code });
  if (res.status !== StatusCodes.ACCEPTED) {
    throw new Error(res.statusText);
  }
  return res;
};

export const delete2fa = async () => {
  const res = await axiosWithInterceptors.delete(`/auth/2fa`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

/** User */

export const whoami = async (): Promise<UserType> => {
  let whoamiAxios = axiosWithInterceptors;
  if (window.document.referrer === `${window.location.origin}/login`) {
    whoamiAxios = axios;
  }

  const res = await whoamiAxios.get(`/my/whoami`);
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getUser = async (userId: number): Promise<UserType> => {
  const res = await axiosWithInterceptors.get(`/users/${userId}`);
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getUsers = async ({
  q,
  paging,
}: {
  q: string;
  paging: PageParamsType;
}): Promise<ListWithPagingType<UserType>> => {
  const { cursor, size, order } = paging;
  const res = await axios.get(`/users`, {
    params: { q, cursor, size, order },
  });
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getUserStatus = async (userId: number): Promise<UserType> => {
  const res = await axiosWithInterceptors.get(`/users/${userId}/status`);
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getAchievements = async ({
  userId,
  paging,
}: {
  userId: number;
  paging: PageParamsType;
}): Promise<ListWithPagingType<AchievementType>> => {
  const { cursor, size, order } = paging;
  const res = await axiosWithInterceptors.get(`/users/${userId}/achievements`, {
    params: { cursor, size, order },
  });
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

/** Setting */

export const updateMyProfile = async (nickname: string): Promise<UserType> => {
  const res = await axiosWithInterceptors.patch(`/my/settings`, { nickname });
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const deleteMyProfileImage = async () => {
  const res = await axiosWithInterceptors.delete(`/my/profile-image`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const updateMyProfileImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  const res = await axiosWithInterceptors.post(`/my/profile-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (res.status !== StatusCodes.CREATED) {
    throw new Error(res.statusText);
  }
  return res;
};

export const checkProfile = async ({
  nickname,
}: {
  nickname: string;
}): Promise<{ nickname: boolean }> => {
  const res = await axios.post(`/my/settings/check`, { nickname });
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

/** Block */

export const getMyBlocks = async (
  paging: PageParamsType
): Promise<ListWithPagingType<UserType>> => {
  const { cursor, size, order } = paging;
  const res = await axiosWithInterceptors.get(`/my/blocks`, {
    params: { cursor, size, order },
  });
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const unblockUser = async (userId: number) => {
  const res = await axiosWithInterceptors.delete(`/my/blocks/${userId}`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const blockUser = async (userId: number) => {
  const res = await axiosWithInterceptors.put(`/my/blocks/${userId}`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

/** Follow */

export const getMyFollowings = async (
  paging: PageParamsType
): Promise<ListWithPagingType<UserType>> => {
  const { cursor, size, order } = paging;
  const res = await axiosWithInterceptors.get(`/my/following`, {
    params: { cursor, size, order },
  });
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const unfollowUser = async (userId: number) => {
  const res = await axiosWithInterceptors.delete(`/my/following/${userId}`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const followUser = async (userId: number) => {
  const res = await axiosWithInterceptors.put(`/my/following/${userId}`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

/** Channel */

export const getChannels = async ({
  enter,
  kind,
  paging,
}: {
  enter?: string;
  kind?: string[];
  paging: PageParamsType;
}): Promise<ListWithPagingType<ChannelType>> => {
  const { cursor, size, order } = paging;
  const res = await axiosWithInterceptors.get(`/channels/`, {
    params: { enter, kind, cursor, size, order },
  });

  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getChannel = async (channelId: number): Promise<ChannelType> => {
  const res = await axiosWithInterceptors.get(`/channels/${channelId}`);
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const createChannel = async (
  channelForm: ChannelFormType
): Promise<ChannelType> => {
  const res = await axios.post(`/channels`, channelForm);
  if (res.status !== StatusCodes.CREATED) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const joinChannel = async (channelForm: ChannelFormType) => {
  const res = await axiosWithInterceptors.put(`/channels/${channelForm.id}`, {
    password: channelForm.password,
  });
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const getDmChannel = async (userId: number): Promise<ChannelType> => {
  const res = await axiosWithInterceptors.get(`/dms/${userId}`);
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getMessages = async ({
  channelId,
  paging,
}: {
  channelId: number;
  paging: PageParamsType;
}): Promise<ListWithPagingType<MessageType>> => {
  const { cursor, size, order } = paging;
  const res = await axiosWithInterceptors.get(
    `/channels/${channelId}/message`,
    {
      params: { cursor, size, order },
    }
  );
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const sendMessage = async ({
  channelId,
  message,
}: {
  channelId: number;
  message: string;
}) => {
  const res = await axiosWithInterceptors.post(
    `/channels/${channelId}/message`,
    {
      text: message,
    }
  );
  if (res.status !== StatusCodes.CREATED) {
    throw new Error(res.statusText);
  }
  return res;
};

export const updateChannelSetting = async (channelForm: ChannelFormType) => {
  const res = await axiosWithInterceptors.patch(`/channels/${channelForm.id}`, {
    title: channelForm.title,
    password: channelForm.password,
  });
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const inviteUserToChannel = async ({
  channelId,
  userIds,
}: {
  channelId: number;
  userIds: number[];
}) => {
  const res = await axiosWithInterceptors.put(`/channels/${channelId}/users`, {
    userIds,
  });
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const updateChannelUserRole = async ({
  channelId,
  userId,
  role,
}: {
  channelId: number;
  userId: number;
  role: ChannelUserRoleType;
}) => {
  const res = await axiosWithInterceptors.patch(
    `/channels/${channelId}/users/${userId}/role`,
    { role }
  );
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const updateChannelUserStatus = async ({
  channelId,
  userId,
  status,
}: {
  channelId: number;
  userId: number;
  status: ChannelUserStatusType;
}) => {
  const res = await axiosWithInterceptors.patch(
    `/channels/${channelId}/users/${userId}/status`,
    { status }
  );
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const leaveChannel = async (channelId: number) => {
  const res = await axiosWithInterceptors.delete(
    `/channels/${channelId}/users`
  );
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

/** Game */

export const getGame = async (gameId: number): Promise<GameType> => {
  const res = await axiosWithInterceptors.get(`/games/${gameId}`);
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getGames = async (
  paging: PageParamsType
): Promise<ListWithPagingType<GameType>> => {
  const { cursor, size, order } = paging;
  const res = await axiosWithInterceptors.get(`/games`, {
    params: { cursor, size, order },
  });
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const waitGame = async (isLadder: boolean): Promise<AxiosResponse> => {
  const res = await axiosWithInterceptors.post(`/games/queue`, { isLadder });
  if (res.status !== StatusCodes.CREATED) {
    throw new Error(res.statusText);
  }
  return res;
};

export const cancelWaitingGame = async () => {
  const res = await axiosWithInterceptors.delete(`/games/queue`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const inviteGame = async (userId: number) => {
  const res = await axiosWithInterceptors.post(`/games/invite`, { userId });
  if (res.status !== StatusCodes.CREATED) {
    throw new Error(res.statusText);
  }
  return res;
};

export const cancelInvitingGame = async () => {
  const res = await axiosWithInterceptors.delete(`/games/invite`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const replyGameInvitation = async ({
  gameId,
  isAccepted,
}: {
  gameId: number;
  isAccepted: boolean;
}) => {
  const res = await axiosWithInterceptors.patch(`/games/${gameId}/invite`, {
    isAccepted,
  });
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const getGameSetting = async (gameId: number): Promise<GameType> => {
  const res = await axiosWithInterceptors.get(`/games/${gameId}/setting`);
  if (res.status !== StatusCodes.OK) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const updateGameSetting = async ({ id, mode, theme }: GameType) => {
  const res = await axiosWithInterceptors.patch(`/games/${id}/setting`, {
    mode,
    theme,
  });
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const startGame = async (gameId: number) => {
  const res = await axiosWithInterceptors.patch(`/games/${gameId}/play`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const joinGameLive = async (gameId: number) => {
  const res = await axiosWithInterceptors.patch(`/games/${gameId}/users`);
  if (res.status !== StatusCodes.NO_CONTENT) {
    throw new Error(res.statusText);
  }
  return res;
};

export const getGameHistories = async ({
  userId,
  paging,
}: {
  userId: number;
  paging: PageParamsType;
}): Promise<ListWithPagingType<GameHistoryType>> => {
  const { cursor, size, order } = paging;
  const res = await axiosWithInterceptors.get(`/games/users/${userId}`, {
    params: { cursor, size, order },
  });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};
