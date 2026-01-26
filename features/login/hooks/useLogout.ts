import { useMutation } from '@tanstack/react-query';
import { logoutAction } from '../server-actions/auth';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';

export function useLogout() {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
