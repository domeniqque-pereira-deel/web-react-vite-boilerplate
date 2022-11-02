import mem from 'mem';
import { resetTokens } from '.';
import { createClient, getTokens, saveTokens } from './utils';

export const client = createClient();

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
};

// https://dev.to/franciscomendes10866/how-to-use-axios-interceptors-b7d
const refreshTokenFn = async () => {
  const { refreshToken, accessToken } = getTokens();

  try {
    const { data: tokens } = await client.post<RefreshTokenResponse>('/account/auth/refresh-token', {
      refreshToken,
      accessToken,
    });

    if (!tokens) {
      resetTokens();
    }

    saveTokens(tokens);

    return tokens;
  } catch (error) {
    resetTokens();
  }
};

const maxAge = 20_000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
