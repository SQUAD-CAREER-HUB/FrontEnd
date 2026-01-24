import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import { ApplicationDetailResponse, DocumentStageUpdateRequest } from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';

export function useUpdateDocumentStage(applicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DocumentStageUpdateRequest) => {
      return clientApi.patch<void>(
        `/v1/applications/${applicationId}/document`,
        data
      );
    },
    onSuccess: (_, data) => {
      queryClient.setQueryData(
        applicationDetailKeys.detail(applicationId),
        (oldData: ApplicationDetailResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            applicationInfo: {
              ...oldData.applicationInfo,
              deadline: data.deadline,
              applicationMethod: data.applicationMethod,
            },
            applicationStageTimeLine: {
              ...oldData.applicationStageTimeLine,
              docsStageTimeLine: {
                ...oldData.applicationStageTimeLine.docsStageTimeLine,
                submissionStatus: data.submissionStatus,
                scheduleResult: data.scheduleResult,
              },
            },
          };
        }
      );
    },
  });
}
