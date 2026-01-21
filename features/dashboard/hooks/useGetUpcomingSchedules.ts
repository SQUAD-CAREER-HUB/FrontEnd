import { clientApi } from '@/shared/lib/api/clientApi';

import { useQuery } from '@tanstack/react-query';
import { UpcomingScheduleListResponse } from '../types/api';

export function useGetUpcomingSchedules() {
  return useQuery({
    queryKey: ['upcoming-schedules'],
    queryFn: async () => {
      return clientApi.get<UpcomingScheduleListResponse>(
        '/v1/schedules/upcoming'
      );
    },
    select: (response) => ({
      ...response,
      data: response.contents.map((item) => ({
        ...item,
        id: item.scheduleId,
      })),
    }),
  });
}
