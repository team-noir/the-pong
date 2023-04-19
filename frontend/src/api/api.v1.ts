import axios, { AxiosResponse, AxiosError } from 'axios';
import {
  UserType,
  ChannelType,
  ChannelUserRoleType,
  ChannelUserStatusType,
  ChannelFormType,
} from 'types';

export const API_PREFIX = `/api/v1`;

axios.defaults.baseURL = API_PREFIX;
axios.defaults.withCredentials = true;

const axiosWithInterceptors = axios.create();
axiosWithInterceptors.defaults.baseURL = API_PREFIX;
axiosWithInterceptors.defaults.withCredentials = true;

axiosWithInterceptors.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
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
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res;
};

export const logout = async () => {
  const res = await axiosWithInterceptors.post(`/auth/logout`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const get2faCode = async () => {
  const res = await axiosWithInterceptors.get(`/auth/2fa`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const verify2fa = async (code: string) => {
  const res = await axiosWithInterceptors.post(`/auth/2fa`, { code });
  if (res.status !== 202) {
    throw new Error(res.statusText);
  }
  return res;
};

export const delete2fa = async () => {
  const res = await axiosWithInterceptors.delete(`/auth/2fa`);
  if (res.status !== 204) {
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
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getUser = async (userId: number): Promise<UserType> => {
  const res = await axiosWithInterceptors.get(`/users/${userId}`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getUsers = async (
  q: string,
  page = 1,
  per_page = 30
): Promise<UserType[]> => {
  const res = await axios.get(`/users`, {
    params: { q, page, per_page },
  });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

/** Setting */

export const updateMyProfile = async (nickname: string): Promise<UserType> => {
  const res = await axiosWithInterceptors.patch(`/my/settings`, { nickname });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const updateMyProfileImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  const res = await axiosWithInterceptors.post(`/my/profile-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const checkProfile = async ({ nickname }: { nickname: string }) => {
  const res = await axios.post(`/my/settings/check`, { nickname });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

/** Block */

export const getMyBlocks = async () => {
  const res = await axiosWithInterceptors.get(`/my/blocks`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const unblockUser = async (userId: number) => {
  const res = await axiosWithInterceptors.delete(`/my/blocks/${userId}`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const blockUser = async (userId: number) => {
  const res = await axiosWithInterceptors.put(`/my/blocks/${userId}`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

/** Follow */

export const getMyFollowings = async () => {
  const res = await axiosWithInterceptors.get(`/my/following`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const unfollowUser = async (userId: number) => {
  const res = await axiosWithInterceptors.delete(`/my/following/${userId}`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const followUser = async (userId: number) => {
  const res = await axiosWithInterceptors.put(`/my/following/${userId}`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

/** Channel */

export const getChannels = async ({
  enter,
  kind,
}: {
  enter?: string;
  kind?: string[];
}) => {
  const res = await axiosWithInterceptors.get(`/channels/`, {
    params: { enter, kind },
  });

  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getChannel = async (channelId: number) => {
  const res = await axiosWithInterceptors.get(`/channels/${channelId}`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const createChannel = async (
  channelForm: ChannelFormType
): Promise<ChannelType> => {
  const res = await axios.post(`/channels`, channelForm);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const joinChannel = async (channelForm: ChannelFormType) => {
  const res = await axiosWithInterceptors.post(`/channels/${channelForm.id}`, {
    password: channelForm.password,
  });
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const getDmChannel = async (userId: number) => {
  const res = await axiosWithInterceptors.get(`/dms/${userId}`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const getMessages = async (channelId: number) => {
  const res = await axiosWithInterceptors.get(`/channels/${channelId}/message`);
  if (res.status !== 200) {
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
  if (res.status != 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const updateChannelSetting = async (channelForm: ChannelFormType) => {
  const res = await axiosWithInterceptors.patch(`/channels/${channelForm.id}`, {
    title: channelForm.title,
    password: channelForm.password,
  });
  if (res.status !== 204) {
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
  if (res.status !== 204) {
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
  if (res.status !== 204) {
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
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const leaveChannel = async (channelId: number) => {
  const res = await axiosWithInterceptors.delete(`/channels/${channelId}`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

/** Game */

export const waitGame = async (isLadder: boolean): Promise<AxiosResponse> => {
  const res = await axiosWithInterceptors.post(`/games/queue`, { isLadder });
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const inviteGame = async (userId: number): Promise<AxiosResponse> => {
  const res = await axiosWithInterceptors.post(`/games/invite`, { userId });
  if (res.status !== 201) {
    throw new Error(res.statusText);
  }
  return res;
};
