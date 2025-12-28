import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { interviewQuestionsApi } from '../api/interviewQuestionsApi';
import { QuestionFilters } from '../types/interviewQuestion.types';

export const useInterviewQuestions = (filters?: QuestionFilters) => {
  return useQuery({
    queryKey: ['interviewQuestions', filters],
    queryFn: () => interviewQuestionsApi.getQuestions(filters),
  });
};

export const useInterviewQuestion = (id: string) => {
  return useQuery({
    queryKey: ['interviewQuestion', id],
    queryFn: () => interviewQuestionsApi.getQuestionById(id),
    enabled: !!id,
  });
};

export const useDeleteQuestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => interviewQuestionsApi.deleteQuestion(id),
    onSuccess: () => {
      // Invalidate and refetch questions list
      queryClient.invalidateQueries({ queryKey: ['interviewQuestions'] });
    },
  });
};