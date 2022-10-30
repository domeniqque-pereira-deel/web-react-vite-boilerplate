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

export const accountApi = {
  login: async (props: LoginProps) => await client.post<{ access_token: string }>('/account/auth/login', props),
};
