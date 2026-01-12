import { useQuery } from '@tanstack/react-query';
import { useFilterValueStore } from '../stores/useFilterValueStore';
import { clientApi } from '@/shared/lib/api/clientApi';
import { SchedulesResponse } from '../types';

export const useGetSchedules = (from: string, to: string) => {
  const { processTypes, documentStatuses, resultStatuses } =
    useFilterValueStore();

  return useQuery({
    queryKey: [
      'schedules',
      {
        from,
        to,
        processTypes,
        documentStatuses,
        resultStatuses,
      },
    ],
    queryFn: async () => {
      // 파라미터 조립 (배열 필터 등 처리)
      const params = new URLSearchParams({ from, to });

      if (processTypes?.length)
        params.append('stageTypes', processTypes.join(','));

      return clientApi.get<SchedulesResponse>(`/v1/schedules?${params}`);
    },
    enabled: !!from && !!to,
  });
};
