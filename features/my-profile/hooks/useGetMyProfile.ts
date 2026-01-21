import { useSuspenseQuery } from '@tanstack/react-query';

import { getMyProfile } from '../api/getMyProfile';

export function useGetMyProfile() {
  return useSuspenseQuery({
    queryKey: ['my-profile'],
    queryFn: () => getMyProfile(),
  });
}
