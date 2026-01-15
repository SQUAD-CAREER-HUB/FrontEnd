import { clientApi } from '@/shared/lib/api/clientApi';
import { ReviewListResponse } from '../types';

export interface GetReviewsParams {
  query?: string;
  sort?: 'NEWEST' | 'OLDEST';
  lastReviewId?: number | null;
  size?: number;
}

export const getReviews = async ({
  query,
  sort = 'NEWEST',
  lastReviewId,
  size = 20,
}: GetReviewsParams): Promise<ReviewListResponse> => {
  const searchParams = new URLSearchParams({
    sort,
    size: size.toString(),
    ...(query && { query }),
    ...(lastReviewId && { lastReviewId: lastReviewId.toString() }),
  });

  return clientApi.get<ReviewListResponse>(
    `/v1/reviews?${searchParams.toString()}`
  );
};
