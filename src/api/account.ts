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

export const AccountApi = {
  login: async (props: LoginProps) => {
    const { data } = await client.post<{ access_token: string }>('/account/auth/login', props);
    return data;
  },
  profile: async () => {
    const { data } = await client.get<User>('/account/auth/profile');
    return data;
  },
};
