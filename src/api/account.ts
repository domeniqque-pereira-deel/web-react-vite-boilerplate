import { client } from '~/config/client';

export type User = {
  id: number;
  name: string;
  email: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export const AccountApi = {
  login: async (props: LoginProps) => {
    const { data } = await client.post<LoginResponse>('/account/auth/login', props);
    return data;
  },
  logout: async (props: { refreshToken: string }) => {
    await client.post('/account/auth/logout', props);
  },
  profile: async () => {
    const { data } = await client.get<User>('/account/auth/profile');
    return data;
  },
  profileUrl: '/account/auth/profile',
};
