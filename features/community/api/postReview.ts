import { clientApi } from '@/shared/lib/api/clientApi';
import { PostWriteFormValues } from '../schema/post-write-form';
import { PostReviewRequest } from '../types';

/**
 * 면접 후기 등록 (POST /v1/reviews)
 */
export const postReview = (formData: PostWriteFormValues): Promise<void> => {
  const requestBody: PostReviewRequest = {
    company: formData.companyName,
    position: formData.position,
    interviewType: formData.interviewType,
    interviewQuestions: formData.questions.map((q) => q.content),
    content: formData.content,
  };

  return clientApi.post<void>('/v1/reviews', requestBody);
};
