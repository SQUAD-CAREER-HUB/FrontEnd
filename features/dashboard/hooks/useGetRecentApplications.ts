import { clientApi } from '@/shared/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';

export function useGetRecentApplications() {
  return useQuery({
    queryKey: ['before-deadline'],
    queryFn: () => {
      return clientApi.get<Response>('v1/applications/before-deadline');
    },
  });
}

type Response = {
  applicationId: number;
  company: string;
  position: string;
  deadline: string;
  applicationMethod: string;
  submissionStatus: string;
}[];
