import { clientApi } from '@/shared/lib/api/clientApi';
import { GetMyProfileResponse } from '@/shared/types/member';
import { useQuery } from '@tanstack/react-query';

export function useGetMyProfile() {
  return useQuery({
    queryKey: ['my-profile'],
    queryFn: async () => {
      return clientApi.get<GetMyProfileResponse>('/v1/members/profile');
    },
  });
}
