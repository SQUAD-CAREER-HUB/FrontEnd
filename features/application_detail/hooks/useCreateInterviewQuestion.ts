import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import { InterviewQuestionRequest, InterviewQuestionResponse } from '../types';
import { interviewQuestionsKeys } from './useGetInterviewQuestions';

export function useCreateInterviewQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InterviewQuestionRequest) => {
      return clientApi.post<InterviewQuestionResponse>(
        '/v1/archive/questions',
        data
      );
    },
    onSuccess: () => {
      // 면접 질문 목록 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: interviewQuestionsKeys.all,
      });
    },
  });
}
