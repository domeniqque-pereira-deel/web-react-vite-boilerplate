import { memoizedRefreshToken } from './refreshToken';
import { ACCESS_TOKEN_KEY, createClient, getAccessToken, getTokens, REFRESH_TOKEN_KEY } from './utils';

export const client = createClient();

client.defaults.headers['Authorization'] = getAccessToken() ? `Bearer ${getAccessToken()}` : '';

client.interceptors.request.use(
  async (config) => {
    const { accessToken } = getTokens();

    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.refreshed) {
      config.refreshed = true;

      const result = await memoizedRefreshToken();

      if (result?.accessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result.accessToken}`,
        };
      }

      return client(config);
    }
    return Promise.reject(error);
  },
);

export const fetcher = (url: string) => client.get(url).then((res) => res.data);

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export const setAuthTokens = ({ accessToken, refreshToken }: AuthTokens) => {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  client.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
};

export const resetTokens = () => {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  client.defaults.headers['Authorization'] = '';
};
