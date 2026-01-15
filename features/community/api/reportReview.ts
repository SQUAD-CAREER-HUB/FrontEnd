import { clientApi } from '@/shared/lib/api/clientApi';

export interface ReportReviewRequest {
  reviewId: number;
  reason: string;
}

/**
 * 면접 후기 신고 API
 * 201 Created 응답이며 본문이 비어있을 수 있지만,
 * clientApi에서 이미 text() 기반 처리를 해두었으므로 안전합니다.
 */
export const reportReview = async ({
  reviewId,
  reason,
}: ReportReviewRequest) => {
  return clientApi.post<void>(`/v1/reviews/${reviewId}/report`, {
    reason,
  });
};
