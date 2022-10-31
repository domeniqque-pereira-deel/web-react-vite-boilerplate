import { AxiosError } from 'axios';
import React, { memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { AccountApi, LoginProps, User } from '~/api/account';
import { getToken, setAccessToken } from '~/config/client';
import { useProfile } from '~/hooks/useProfile';

export type AuthContextData = {
  user?: User;
  isSigned: boolean;
  isSignIn: boolean;
  isFetchingProfile: boolean;
  login(data: LoginProps): Promise<void>;
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

  const shouldFetchUserOnStart = useRef(!!getToken() && !userData);
  React.useEffect(() => {
    console.log('AuthProvider', shouldFetchUserOnStart.current);
    if (shouldFetchUserOnStart.current) {
      async function loadProfile() {
        try {
          setFetchingProfile(true);
          setAccessToken(getToken());
          const profile = await AccountApi.profile();
          setUserData(profile);
          mutate(AccountApi.profileUrl, profile);
        } catch (err) {
          setAccessToken(null);
        } finally {
          setFetchingProfile(false);
          shouldFetchUserOnStart.current = false;
        }
      }

      loadProfile();
    }

    shouldFetchUserOnStart.current = false;
  }, []);

  const login = useCallback(async ({ email, password }: LoginProps) => {
    setIsSignIn(true);

    try {
      const { access_token } = await AccountApi.login({ email, password });
      setAccessToken(access_token);

      const profile = await AccountApi.profile();
      setUserData(profile);
      mutate(AccountApi.profileUrl, profile);
    } catch (err) {
      if (err instanceof AxiosError && err.status === 500) {
        toast.error('Something went wrong! Try again.');
      }
      throw err;
    } finally {
      setIsSignIn(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      user: userData,
      login,
      isSigned,
      isSignIn,
      isFetchingProfile,
    }),
    [userData, isSigned, login, isSignIn, isFetchingProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
});

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
