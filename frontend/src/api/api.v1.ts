import axios from 'axios';
import { UserType } from 'types/userType';

export const API_PREFIX = `/api/v1`;
export const API_LOGIN_FT = `${API_PREFIX}/auth/42`;

axios.defaults.baseURL = API_PREFIX;
axios.defaults.withCredentials = true;

/** Login **/

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
}

export const getProfile = async (userId: string): Promise<ProfileType> => {
  const res = await axios.get(`/users/${userId}`);
  if (res.status !== 200) {
    throw new Error('Failed to get profile');
  }
  return res.data;
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

export const getMyFollowing = async () => {
  const res = await axios.get(`/my/following`);
  if (res.status !== 200) {
    throw new Error('Failed to get my following');
  }
  return res.data;
};

export const deleteMyFollowing = async (userId: number) => {
  const res = await axios.delete(`/my/following/${userId}`);
  if (res.status !== 204) {
    throw new Error('Failed to delete my following');
  }
  return res;
};
