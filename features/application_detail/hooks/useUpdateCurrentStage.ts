import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import { ApplicationDetailResponse } from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';
import { ApplicationStage } from '@/shared/types';

interface UpdateCurrentStageParams {
  currentStageType: ApplicationStage;
  previousStageType: ApplicationStage;
}

export function useUpdateCurrentStage(applicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ currentStageType, previousStageType }: UpdateCurrentStageParams) => {
      // current-stage API 호출
      await clientApi.patch<void>(
        `/v1/applications/${applicationId}/current-stage`,
        { currentStageType }
      );

      // APPLICATION_CLOSE에서 다른 단계로 변경 시 final-result도 IN_PROGRESS로 변경
      const wasClose = previousStageType === 'APPLICATION_CLOSE';
      const isNotClose = currentStageType !== 'APPLICATION_CLOSE';
      if (wasClose && isNotClose) {
        await clientApi.patch<void>(
          `/v1/applications/${applicationId}/final-result`,
          { applicationStatus: 'IN_PROGRESS' }
        );
      }

      return { currentStageType, shouldResetStatus: wasClose && isNotClose };
    },
    onSuccess: ({ currentStageType, shouldResetStatus }) => {
      // 캐시 데이터 직접 업데이트
      queryClient.setQueryData(
        applicationDetailKeys.detail(applicationId),
        (oldData: ApplicationDetailResponse | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            applicationInfo: {
              ...oldData.applicationInfo,
              currentStageType,
              ...(shouldResetStatus && { applicationStatus: 'IN_PROGRESS' as const }),
            },
          };
        }
      );
    },
  });
}
