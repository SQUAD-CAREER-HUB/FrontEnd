import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import { interviewQuestionsKeys } from './useGetInterviewQuestions';

interface UpdateInterviewQuestionRequest {
  applicationId: number;
  interviewType: string;
  question: string;
  memo: string;
}

interface UpdateInterviewQuestionParams {
  questionArchiveId: number;
  data: UpdateInterviewQuestionRequest;
}

export function useUpdateInterviewQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionArchiveId, data }: UpdateInterviewQuestionParams) => {
      return clientApi.patch(
        `/v1/archive/questions/${questionArchiveId}`,
        data
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: interviewQuestionsKeys.all,
      });
    },
  });
}
