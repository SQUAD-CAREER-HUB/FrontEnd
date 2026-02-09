import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import { interviewQuestionsKeys } from './useGetInterviewQuestions';

export function useDeleteInterviewQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questionArchiveId: number) => {
      return clientApi.delete(`/v1/archive/questions/${questionArchiveId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: interviewQuestionsKeys.all,
      });
    },
  });
}
