import useSWR, { SWRConfiguration } from 'swr';
import { client } from '~/config/client';

const fetcher = (url: string) => client.get(url).then((response) => response.data);

export type FetchOptions<D = any, Err = any> = SWRConfiguration<D, Err, any>;

export function useFetch<D = any, Err = any>(url?: string | null, options?: FetchOptions<D, Err>) {
  return useSWR<D, Err>(url, fetcher, options);
}
