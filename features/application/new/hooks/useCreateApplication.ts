import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { clientApi } from '@/shared/lib/api/clientApi';
import { ApplicationCreateRequest } from '../stores/useNewApplicationStore';

export function useCreateApplication() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ApplicationCreateRequest) => {
      const formData = new FormData();
      console.log(data.request);
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

      return clientApi.postFormData('/v1/applications', formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      router.push('/applications');
    },
  });
}
