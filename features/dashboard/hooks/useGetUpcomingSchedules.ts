import { clientApi } from '@/shared/lib/api/clientApi';
import { UpcomingInterviewsResponse } from '@/shared/types/interview';
import { useQuery } from '@tanstack/react-query';

export function useGetUpcomingSchedules() {
  return useQuery({
    queryKey: ['upcoming-schedules'],
    queryFn: async () => {
      return clientApi.get<UpcomingInterviewsResponse>(
        '/v1/interviews/upcoming'
      );
    },
  });
}
