import { clientApi } from '@/shared/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { ApplicationStats } from '../types';

export function useGetApplicationsStats() {
  return useQuery({
    queryKey: ['applications-stats'],
    queryFn: async () => {
      return clientApi.get<ApplicationStats>('/v1/applications/statistics');
    },
  });
}
