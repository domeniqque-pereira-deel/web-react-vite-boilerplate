import { AccountApi, User } from '~/api/account';
import { FetchOptions, useFetch } from './useFetch';

type Props = {
  shouldFetch?: boolean;
};

export const useProfile = ({ shouldFetch = true, ...options }: Props & FetchOptions = {}) => {
  return useFetch<User>(shouldFetch ? AccountApi.profileUrl : null, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    ...options,
  });
};
