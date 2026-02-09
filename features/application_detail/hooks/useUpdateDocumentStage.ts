import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import { ApplicationDetailResponse, DocumentStageUpdateRequest } from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';
import { syncTimelineState, TimelineSyncResult } from '../lib/timelineSync';

export function useUpdateDocumentStage(applicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: DocumentStageUpdateRequest) => {
      await clientApi.patch<void>(
        `/v1/applications/${applicationId}/document`,
        data
      );

      // 타임라인 자동 동기화: 불합격 관련 변경 시 최종결과/현재단계 연동
      const currentData = queryClient.getQueryData<ApplicationDetailResponse>(
        applicationDetailKeys.detail(applicationId)
      );

      let syncResult: TimelineSyncResult = {};
      if (currentData) {
        const previousResult =
          currentData.applicationStageTimeLine.docsStageTimeLine?.scheduleResult ?? 'WAITING';

        const simulatedData: ApplicationDetailResponse = {
          ...currentData,
          applicationStageTimeLine: {
            ...currentData.applicationStageTimeLine,
            docsStageTimeLine: {
              ...currentData.applicationStageTimeLine.docsStageTimeLine,
              scheduleResult: data.scheduleResult,
            },
          },
        };

        syncResult = await syncTimelineState(
          applicationId,
          previousResult,
          data.scheduleResult,
          simulatedData,
        );
      }

      return syncResult;
    },
    onSuccess: (syncResult, data) => {
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
              ...(syncResult.applicationStatus && {
                applicationStatus: syncResult.applicationStatus,
              }),
              ...(syncResult.currentStageType && {
                currentStageType: syncResult.currentStageType,
              }),
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
