import axios from 'axios';
import { ChannelType } from 'types/channelType';
import { UserType } from 'types/userType';

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

export const getHealthCheck = async () => {
  const res = await axios.get(`/health-check`);
  return res;
};

/** Login */

export const API_LOGIN_FT = `${API_PREFIX}/auth/42`;

export const postLogout = async () => {
  const res = await axiosWithInterceptors.post(`/auth/logout`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

/** User */

export const getWhoami = async (): Promise<UserType> => {
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

export interface ProfileUserType {
  id: number;
  nickname: string;
  rank: number;
  achievements: [];
  games: [];
  isFollowedByMyself: boolean;
  isBlockedByMyself: boolean;
}

export const getUser = async (userId: string): Promise<ProfileUserType> => {
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

export const patchMyProfile = async (nickname: string): Promise<UserType> => {
  const res = await axiosWithInterceptors.patch(`/my/settings`, { nickname });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const PostMyProfileImage = async (imageFile: File) => {
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

export const getMy2fa = async () => {
  const res = await axiosWithInterceptors.get(`/my/2fa`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const deleteMy2fa = async () => {
  const res = await axiosWithInterceptors.delete(`/my/2fa`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

/** Block */

export const getMyBlocks = async () => {
  const res = await axiosWithInterceptors.get(`/my/blocks`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const deleteMyBlocks = async (userId: number) => {
  const res = await axiosWithInterceptors.delete(`/my/blocks/${userId}`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const putMyBlocks = async (userId: number) => {
  const res = await axiosWithInterceptors.put(`/my/blocks/${userId}`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

/** Follow */

export const getMyFollowing = async () => {
  const res = await axiosWithInterceptors.get(`/my/following`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const deleteMyFollowing = async (userId: number) => {
  const res = await axiosWithInterceptors.delete(`/my/following/${userId}`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const putMyFollowing = async (userId: number) => {
  const res = await axiosWithInterceptors.put(`/my/following/${userId}`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

/** Channel */

interface getChannelsParams {
  enter?: string;
  kind?: string[];
}

export const getChannels = async ({ enter, kind }: getChannelsParams) => {
  const res = await axiosWithInterceptors.get(`/channels/`, {
    params: { enter, kind },
  });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export interface ChannelFormType {
  title: string;
  isPrivate?: boolean;
  password?: string;
}

export const postNewChannel = async (
  channelForm: ChannelFormType
): Promise<ChannelType> => {
  const res = await axios.post(`/channels`, channelForm);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};
