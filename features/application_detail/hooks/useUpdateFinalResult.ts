import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import { ApplicationDetailResponse, ApplicationStatus } from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';

export function useUpdateFinalResult(applicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationStatus: ApplicationStatus) => {
      // final-result API 호출
      await clientApi.patch<void>(
        `/v1/applications/${applicationId}/final-result`,
        { applicationStatus }
      );

      // FINAL_PASS, FINAL_FAIL일 때 자동으로 current-stage를 APPLICATION_CLOSE로 변경
      const shouldClose = applicationStatus === 'FINAL_PASS' || applicationStatus === 'FINAL_FAIL';
      if (shouldClose) {
        await clientApi.patch<void>(
          `/v1/applications/${applicationId}/current-stage`,
          { currentStageType: 'APPLICATION_CLOSE' }
        );
      }
      console.log(shouldClose);
      return { applicationStatus, shouldClose };
    },
    onSuccess: ({ applicationStatus, shouldClose }) => {
      queryClient.setQueryData(
        applicationDetailKeys.detail(applicationId),
        (oldData: ApplicationDetailResponse | undefined) => {
          if (!oldData) return oldData;
          console.log({
            ...oldData,
            applicationInfo: {
              ...oldData.applicationInfo,
              applicationStatus,
              ...(shouldClose && { currentStageType: 'APPLICATION_CLOSE' as const }),
            },
          });

          return {
            ...oldData,
            applicationInfo: {
              ...oldData.applicationInfo,
              applicationStatus,
              ...(shouldClose && { currentStageType: 'APPLICATION_CLOSE' as const }),
            },
          };
        }
      );
    },
  });
}
