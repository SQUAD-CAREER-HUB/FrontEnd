import { clientApi } from '@/shared/lib/api/clientApi';
import { useInfiniteQuery } from '@tanstack/react-query';

// 필터 파라미터 타입
export interface ApplicationsFilter {
  query?: string;
  stageType?: string[];
  submissionStatus?: string;
  stageResult?: string;
  size?: number;
}

// 서류 전형 정보
export interface DocsStage {
  deadline: string;
  applicationMethod: string;
}

// 일정 전형 정보
export interface ScheduleStage {
  scheduleName: string;
  location: string;
  nextScheduleAt: string;
}

// 지원 카드 타입
export interface ApplicationCard {
  applicationId: number;
  company: string;
  position: string;
  currentStageType: string;
  applicationStatus: 'IN_PROGRESS' | 'FINAL_PASS' | 'FINAL_FAIL';
  currentScheduleResult: 'PASS' | 'FAIL' | 'WAITING';
  docsStage?: DocsStage | null;
  scheduleStage?: ScheduleStage | null;
}

// API 응답 타입
interface ApplicationsResponse {
  contents: ApplicationCard[];
  nextCursorId: number | null;
  hasNext: boolean;
}

export function useGetApplications(filter: ApplicationsFilter = {}) {
  const { query, stageType, submissionStatus, stageResult, size = 20 } = filter;

  return useInfiniteQuery({
    queryKey: ['applications', { query, stageType, submissionStatus, stageResult, size }],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();

      params.append('size', String(size));

      if (pageParam) {
        params.append('lastCursorId', String(pageParam));
      }

      if (query) {
        params.append('query', query);
      }

      if (stageType && stageType.length > 0) {
        stageType.forEach((type) => params.append('stageType', type));
      }

      if (submissionStatus) {
        params.append('submissionStatus', submissionStatus);
      }

      if (stageResult) {
        params.append('stageResult', stageResult);
      }

      return clientApi.get<ApplicationsResponse>(`/v1/applications?${params.toString()}`);
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursorId : undefined;
    },
  });
}
