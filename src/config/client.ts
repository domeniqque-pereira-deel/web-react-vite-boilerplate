import axios from 'axios';

const TOKEN_KEY = 'access_token';

export const getToken = () => window.localStorage.getItem(TOKEN_KEY);

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: getToken() ? `Bearer ${getToken()}` : undefined,
  },
});

export const setAccessToken = (accessToken?: string | null) => {
  if (accessToken) {
    window.localStorage.setItem(TOKEN_KEY, accessToken);
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
  }

  client.defaults.headers['Authorization'] = accessToken ? `Bearer ${accessToken}` : '';
};
