import { useInfiniteQuery } from '@tanstack/react-query';
import { clientApi } from '@/shared/lib/api/clientApi';
import {
  InterviewQuestionsResponse,
  InterviewQuestionsFilter,
} from '../types';

export const interviewQuestionsKeys = {
  all: ['interviewQuestions'] as const,
  list: (filter: InterviewQuestionsFilter) =>
    [...interviewQuestionsKeys.all, filter] as const,
};

export function useGetInterviewQuestions(filter: InterviewQuestionsFilter = {}) {
  const {
    query,
    linkStatus = 'LINKED',
    applicationId,
    size = 20,
  } = filter;

  return useInfiniteQuery({
    queryKey: interviewQuestionsKeys.list({ query, linkStatus, applicationId }),
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();

      params.append('size', String(size));
      params.append('linkStatus', linkStatus);

      if (pageParam) {
        params.append('lastCursorId', String(pageParam));
      }

      if (query) {
        params.append('query', query);
      }

      if (applicationId) {
        params.append('applicationId', String(applicationId));
      }

      return clientApi.get<InterviewQuestionsResponse>(
        `/v1/archive/questions?${params.toString()}`
      );
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursorId : undefined;
    },
  });
}
