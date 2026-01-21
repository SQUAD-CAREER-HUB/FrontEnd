import { clientApi } from '@/shared/lib/api/clientApi';
import { ReviewDetailResponse } from '../types';

/**
 * 특정 면접 후기의 상세 정보를 가져오는 API
 * @param reviewId - 조회할 리뷰의 고유 ID
 */
export const getReviewDetail = async (
  reviewId: number
): Promise<ReviewDetailResponse> => {
  // throw new Error('API 호출 실패 테스트!');

  return clientApi.get<ReviewDetailResponse>(
    `/v1/reviews/${reviewId.toString()}`
  );
};
