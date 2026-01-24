import { clientApi } from '@/shared/lib/api/clientApi';
import { useMutation } from '@tanstack/react-query';

interface RegisterFCMTokenRequest {
  platform: 'WEB';
  token: string;
}

export function useRegisterFCMToken() {
  return useMutation({
    mutationFn: async (token: string) => {
      return clientApi.post<void>('/v1/notifications/devices', {
        platform: 'WEB',
        token,
      } satisfies RegisterFCMTokenRequest);
    },
  });
}
