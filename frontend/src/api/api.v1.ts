import axios from 'axios';

export const API_PREFIX = `/api/v1`;
export const API_LOGIN_FT = `${API_PREFIX}/auth/42`;

axios.defaults.baseURL = API_PREFIX;
axios.defaults.withCredentials = true;

/** Login **/

export const getWhoami = async () => {
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
}

export const getProfile = async (userId: string): Promise<ProfileType> => {
  const res = await axios.get(`/users/${userId}`);
  if (res.status !== 200) {
    throw new Error('Failed to get profile');
  }
  return res.data;
};
