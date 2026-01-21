import { clientApi } from '@/shared/lib/api/clientApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useTestNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return clientApi.post('/v1/notifications/test?platform=WEB', {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}
