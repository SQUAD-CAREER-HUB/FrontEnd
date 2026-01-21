import { useMutation } from '@tanstack/react-query';

import { deleteReview } from '../api/deleteReview';
import { getQueryClient } from '@/shared/lib/tanstack-query/get-query-client';

export const useDeleteReview = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });
};
