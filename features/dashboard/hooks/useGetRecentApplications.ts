import { clientApi } from '@/shared/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { BeforeDeadlineListResponse } from '../types/api';

export function useGetRecentApplications() {
  return useQuery({
    queryKey: ['before-deadline'],
    queryFn: () => {
      return clientApi.get<BeforeDeadlineListResponse>(
        'v1/applications/before-deadline'
      );
    },
  });
}
