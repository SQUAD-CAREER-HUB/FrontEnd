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

      // 파일 추가 (최대 5개)
      if (data.files && data.files.length > 0) {
        data.files.slice(0, 5).forEach((file) => {
          formData.append('files', file);
        });
      }
      return clientApi.patchFormData<ApplicationDetailResponse>(
        `/v1/applications/${applicationId}`,
        formData
      );
    },
    onSuccess: (data, variables) => {
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
    },
  });
}
