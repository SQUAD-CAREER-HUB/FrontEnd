import { useMutation } from '@tanstack/react-query';

import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';
import { patchMyProfile } from '../api/patchMyProfile';
import { PatchProfileRequest } from '../types';

export function useUpdateMyProfile() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (data: PatchProfileRequest) => patchMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}
