import React, { useCallback, useContext, useMemo, useState } from 'react';
import { accountApi, LoginProps, User } from '~/api/account';

export type AuthContextData = {
  token?: string;
  user?: User;
  isSigned: boolean;
  login(data: LoginProps): Promise<void>;
};

const AuthContext = React.createContext({} as AuthContextData);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [authData, setAuthData] = useState({
    token: undefined,
    user: undefined,
  });

  const isSigned = useMemo(() => !!authData.user, [authData.user]);

  const login = useCallback(async ({ email, password }: LoginProps) => {
    try {
      const { data } = await accountApi.login({ email, password });
    } catch (err) {}
  }, []);

  const value = useMemo(
    () => ({
      ...authData,
      login,
      isSigned,
    }),
    [authData, isSigned, login],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
