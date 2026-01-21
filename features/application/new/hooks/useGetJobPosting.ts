import { useMutation, useQueryClient } from '@tanstack/react-query';
import { JobPostingResponse } from '../types/jobPosting';
import { validateJobPostingUrl } from '../schemas/jobPosting';
import { fetchJobPostingAction } from '../api/fetchJobPosting';

// 쿼리 키 생성 함수
export const jobPostingQueryKey = (url: string) => ['jobPosting', url] as const;

export function useGetJobPosting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (url: string) => {
      // 클라이언트에서 먼저 URL 검증
      const validation = validateJobPostingUrl(url);
      if (!validation.success) {
        throw new Error(validation.error.issues[0]?.message || 'URL 검증 실패');
      }

      // Server Action 호출
      const result = await fetchJobPostingAction(url);
      console.log(result);
      if (!result.success) {
        throw new Error(result.error || '채용공고 정보를 불러오지 못했습니다.');
      }

      return result.data!;
    },
    onSuccess: (data, url) => {
      // URL을 키로 캐싱
      queryClient.setQueryData(jobPostingQueryKey(url), data);
    },
  });
}

// 캐시된 데이터 조회 훅
export function useJobPostingCache(url: string) {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<JobPostingResponse>(jobPostingQueryKey(url));
}
