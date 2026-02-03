import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import {
  ApplicationUpdateRequest,
  ApplicationDetailResponse,
} from '../types';
import { applicationDetailKeys } from './useGetApplicationDetail';

export function useUpdateApplication(applicationId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ApplicationUpdateRequest) => {
      const formData = new FormData();

      // request JSON 데이터 추가
      formData.append(
        'request',
        new Blob([JSON.stringify(data.request)], { type: 'application/json' })
      );
      // 파일 추가 (File 객체 + 기존 URL 문자열)
      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append('files', file);
        });
      }


      return clientApi.patchFormData<ApplicationDetailResponse>(
        `/v1/applications/${applicationId}`,
        formData
      );
    },
    onSuccess: (_, variables) => {
      // 새 File 객체가 있는지 확인
      const hasNewFileObjects = variables.files?.some((f) => f instanceof File) ?? false;

      if (hasNewFileObjects) {
        // 새 파일이 있으면 서버에서 다시 fetch (S3 URL 필요)
        queryClient.invalidateQueries({
          queryKey: applicationDetailKeys.detail(applicationId),
        });
      } else {
        // 새 파일이 없으면 request 데이터로 캐시 업데이트 (요청 절약)
        queryClient.setQueryData<ApplicationDetailResponse>(
          applicationDetailKeys.detail(applicationId),
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              applicationInfo: {
                ...oldData.applicationInfo,
                ...variables.request,
              },
            };
          },
        );
      }
    },
  });
}
