import axios from 'axios';

const TOKEN_KEY = 'access_token';

export const getToken = () => window.localStorage.getItem(TOKEN_KEY);

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

client.defaults.headers['Authorization'] = getToken() ? `Bearer ${getToken()}` : '';

export const setAccessToken = (accessToken?: string | null) => {
  if (accessToken) {
    window.localStorage.setItem(TOKEN_KEY, accessToken);
    client.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
    client.defaults.headers['Authorization'] = '';
  }
};
