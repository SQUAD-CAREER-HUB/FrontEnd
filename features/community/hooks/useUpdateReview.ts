import { useMutation } from '@tanstack/react-query';

import { PostWriteFormValues } from '../schema/post-write-form';
import { patchReview } from '../api';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';

export const useUpdateReview = (reviewId: number) => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (formData: PostWriteFormValues) =>
      patchReview(reviewId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });

      queryClient.invalidateQueries({ queryKey: ['review', reviewId] });
    },
  });
};
