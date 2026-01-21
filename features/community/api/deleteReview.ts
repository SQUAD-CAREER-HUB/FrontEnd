import { clientApi } from '@/shared/lib/api/clientApi';

/**
 * 면접 후기 삭제 (DELETE /v1/reviews/{reviewId})
 */
export const deleteReview = async (reviewId: number) => {
  return clientApi.delete<void>(`/v1/reviews/${reviewId.toString()}`);
};
