import axios from 'axios';

export const API_PREFIX = `/api/v1`;
export const API_LOGIN_FT = `${API_PREFIX}/auth/42`;

axios.defaults.baseURL = API_PREFIX;
axios.defaults.withCredentials = true;

/** Login **/

export const getWhoami = async () => {
  const res = await axios.get(`/my/whoami`);
  return res;
};

export const getHealthCheck = async () => {
  const res = await axios.get(`/health-check`);
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
