import React, { useCallback, useContext, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { AccountApi, LoginProps, User } from '~/api/account';
import { getToken, setAccessToken } from '~/config/client';

export type AuthContextData = {
  user?: User;
  isSigned: boolean;
  isSignIn: boolean;
  login(data: LoginProps): Promise<void>;
};

const AuthContext = React.createContext({} as AuthContextData);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [userData, setUserData] = useState<User>();

  const isSigned = !!userData;

  React.useLayoutEffect(() => {
    async function loadProfile() {
      const token = getToken();
      console.log({ token });
      if (!token) return;
      setAccessToken(token);
      const profile = await AccountApi.profile();

      setUserData(profile);
    }

    loadProfile();
  }, []);

  const login = useCallback(async ({ email, password }: LoginProps) => {
    setIsSignIn(true);

    try {
      const { access_token } = await AccountApi.login({ email, password });
      setAccessToken(access_token);

      const profile = await AccountApi.profile();
      setUserData(profile);
    } catch (err) {
      toast.error('Something went wrong! Try login again.');
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
    }),
    [userData, isSigned, login, isSignIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
