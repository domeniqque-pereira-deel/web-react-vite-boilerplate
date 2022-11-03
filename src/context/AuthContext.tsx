import { AxiosError } from 'axios';
import React, { memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { AccountApi, LoginProps, User } from '~/api/account';
import { resetTokens, setAuthTokens } from '~/config/client';
import { getAccessToken, getTokens } from '~/config/client/utils';

export type AuthContextData = {
  user?: User;
  isSigned: boolean;
  isSignIn: boolean;
  isFetchingProfile: boolean;
  login(data: LoginProps): Promise<void>;
  logout(): Promise<void>;
};

export const AuthContext = React.createContext({} as AuthContextData);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = memo(({ children }: Props) => {
  const [isFetchingProfile, setFetchingProfile] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [userData, setUserData] = useState<User>();
  const { mutate } = useSWRConfig();

  const isSigned = !!userData;

  const shouldFetchUserOnStart = useRef(!!getAccessToken() && !userData);

  const loadProfile = useCallback(async () => {
    const profile = await AccountApi.profile();
    setUserData(profile);
    mutate(AccountApi.profileUrl, profile);
  }, []);

  React.useEffect(() => {
    if (shouldFetchUserOnStart.current) {
      setFetchingProfile(true);

      loadProfile().finally(() => setFetchingProfile(false));
    }

    shouldFetchUserOnStart.current = false;
  }, [loadProfile]);

  const login = useCallback(async ({ email, password }: LoginProps) => {
    setIsSignIn(true);

    try {
      const tokens = await AccountApi.login({ email, password });
      setAuthTokens(tokens);

      await loadProfile();
    } catch (err) {
      if (err instanceof AxiosError && err.status === 500) {
        toast.error('Something went wrong! Try again.');
      }
      throw err;
    } finally {
      setIsSignIn(false);
    }
  }, []);

  const logout = useCallback(async () => {
    const { refreshToken } = getTokens();
    if (refreshToken) {
      await AccountApi.logout({ refreshToken });
    }

    resetTokens();
    window.location.reload();
  }, []);

  const value = useMemo(
    () => ({
      user: userData,
      isSigned,
      isSignIn,
      isFetchingProfile,
      login,
      logout,
    }),
    [userData, isSigned, login, isSignIn, isFetchingProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
