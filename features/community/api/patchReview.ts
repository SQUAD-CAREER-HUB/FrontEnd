import { clientApi } from '@/shared/lib/api/clientApi';
import { PostWriteFormValues } from '../schema/post-write-form';
import { UpdateReviewRequest } from '../types';

/**
 * 면접 후기 수정 (PATCH /v1/reviews/{reviewId})
 * 수정 시에는 질문이 객체 배열(id 포함) 형태여야 함을 주의
 */
export const patchReview = (
  reviewId: number,
  formData: PostWriteFormValues
) => {
  const requestBody: UpdateReviewRequest = {
    company: formData.companyName,
    position: formData.position,
    interviewType: formData.interviewType,
    interviewQuestions: formData.questions.map((q, idx) => ({
      id: q.id ?? idx + 1,
      question: q.content,
    })),
    content: formData.content,
  };

  return clientApi.patch<void>(`/v1/reviews/${reviewId}`, requestBody);
};
