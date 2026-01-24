import { clientApi } from '@/shared/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useReadAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return clientApi.patch('/v1/notifications/read-all',{});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
