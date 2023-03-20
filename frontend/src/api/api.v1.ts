import axios from 'axios';

const API_PREFIX = `/api/v1`;
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
