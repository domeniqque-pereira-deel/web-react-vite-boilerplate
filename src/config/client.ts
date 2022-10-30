import axios from 'axios';

const TOKEN_KEY = 'access_token';

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const setAccessToken = (accessToken?: string) => {
  if (accessToken) {
    window.localStorage.setItem(TOKEN_KEY, accessToken);
  } else {
    window.localStorage.removeItem(TOKEN_KEY);
  }
};
