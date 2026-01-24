import { clientApi } from '@/shared/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import { ApplicationDetailResponse } from '../types';

export const applicationDetailKeys = {
  all: ['application-detail'] as const,
  detail: (id: number) => [...applicationDetailKeys.all, id] as const,
};

export function useGetApplicationDetail(applicationId: number) {
  return useQuery({
    queryKey: applicationDetailKeys.detail(applicationId),
    queryFn: async () => {
      return clientApi.get<ApplicationDetailResponse>(
        `/v1/applications/${applicationId}`
      );
    },
    enabled: !!applicationId,
  });
}
