import axios, { AxiosError } from 'axios';
import { UserType } from 'types/userType';

export const API_PREFIX = `/api/v1`;
export const API_LOGIN_FT = `${API_PREFIX}/auth/42`;

axios.defaults.baseURL = API_PREFIX;
axios.defaults.withCredentials = true;

/** Login **/

export const postLogout = async () => {
  const res = await axios.post(`/auth/logout`);
  if (res.status !== 204) {
    throw new Error('Failed to post logout');
  }
  return res;
};

export const getWhoami = async (): Promise<UserType> => {
  const res = await axios.get(`/my/whoami`);
  if (res.status !== 200) {
    throw new Error('Failed to get whoami');
  }
  return res.data;
};

export const getHealthCheck = async () => {
  const res = await axios.get(`/health-check`);
  return res;
};

export interface ProfileType {
  id: number;
  nickname: string;
  rank: number;
  achievements: [];
  games: [];
  isFollowing: boolean;
  isBlocked: boolean;
}

export const getProfile = async (userId: string): Promise<ProfileType> => {
  const res = await axios.get(`/users/${userId}`);
  if (res.status !== 200) {
    throw new Error('Failed to get profile');
  }
  return res.data;
};

export const patchMyProfile = async (nickname: string): Promise<UserType> => {
  const res = await axios.patch(`/my/settings`, { nickname });
  if (res.status !== 200) {
    throw new Error('Failed to patch profile');
  }
  return res.data;
};

export const getMy2fa = async () => {
  const res = await axios.get(`/my/2fa`);
  if (res.status !== 200) {
    throw new Error('Failed to get 2fa');
  }
  return res.data;
};

export const deleteMy2fa = async () => {
  const res = await axios.delete(`/my/2fa`);
  if (res.status !== 204) {
    throw new Error('Failed to delete 2fa');
  }
  return res;
};

export const PostMyProfileImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('file', imageFile);
  const res = await axios.post(`/my/profile-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (res.status !== 204) {
    throw new Error('Failed to post profile image');
  }
  return res;
};

export const getMyBlocks = async () => {
  const res = await axios.get(`/my/blocks`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

export const deleteMyBlocks = async (userId: number) => {
  const res = await axios.delete(`/my/blocks/${userId}`);
  if (res.status !== 204) {
    throw new Error(res.statusText);
  }
  return res;
};

export const putMyBlocks = async (userId: number) => {
  const res = await axios.put(`/my/blocks/${userId}`);
  if (res.status !== 204) {
    throw new Error('Failed to put my blocks');
  }
  return res;
};

export const getMyFollowing = async () => {
  const res = await axios.get(`/my/following`).catch((error) => {
    if (error.response.status === 404) {
      throw new AxiosError('팔로잉한 회원이 없습니다', '404');
    }
    throw error;
  });
  return res.data;
};

export const deleteMyFollowing = async (userId: number) => {
  const res = await axios.delete(`/my/following/${userId}`);
  if (res.status !== 204) {
    throw new Error('Failed to delete my following');
  }
  return res;
};

export const putMyFollowing = async (userId: number) => {
  const res = await axios.put(`/my/following/${userId}`);
  if (res.status !== 204) {
    throw new Error('Failed to put my following');
  }
  return res;
};
