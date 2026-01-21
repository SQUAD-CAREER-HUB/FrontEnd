import { useSuspenseQuery } from '@tanstack/react-query';

import { getReviewDetail } from '../api/getReviewDetail';
import { PostDetail } from '../types';

export const useGetReviewDetail = (reviewId: number) => {
  return useSuspenseQuery({
    queryKey: ['review', reviewId],
    queryFn: () => getReviewDetail(reviewId),

    select: (data): PostDetail => ({
      ...data,
      id: data.reviewId,
      companyName: data.company,
      content: data.content ?? '',
      // 질문 리스트 매핑
      questions: data.interviewQuestions.map((question) => ({
        id: question.questionId,
        content: question.question,
      })),
      authorName: data.author,
      isMine: !!data.isAuthor,
    }),
  });
};
