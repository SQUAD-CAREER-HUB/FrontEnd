import { useMutation } from '@tanstack/react-query';

import { PostWriteFormValues } from '../schema/post-write-form';
import { postReview } from '../api';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';
import { ApiError } from '@/shared/lib/api/errors';

export const useCreateReview = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (formData: PostWriteFormValues) => postReview(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.statusCode === 400 && error.validation) {
          // validation 에러 메시지들을 하나로 합치거나 특정 필드에 표시
          const validationMsgs = Object.values(error.validation).join('\n');
          alert(`입력값이 올바르지 않습니다:\n${validationMsgs}`);
        } else {
          alert(error.message);
        }
      } else {
        // 네트워크 단절 등 일반적인 에러 처리
        alert('연결이 원활하지 않습니다.');
      }
    },
  });
};
