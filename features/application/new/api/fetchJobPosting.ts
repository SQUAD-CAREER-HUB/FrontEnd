import { JobPostingResponse } from '../types/jobPosting';
import { jobPostingUrlSchema } from '../schemas/jobPosting';
import { clientApi } from '@/shared/lib/api/clientApi';

export interface FetchJobPostingResult {
  success: boolean;
  data?: JobPostingResponse;
  error?: string;
}

export async function fetchJobPostingAction(url: string): Promise<FetchJobPostingResult> {
  // 서버에서도 URL 검증
  const validation = jobPostingUrlSchema.safeParse(url);

  if (!validation.success) {
    return {
      success: false,
      error: validation.error.issues[0]?.message || 'URL 검증 실패',
    };
  }

  try {
    const query = new URLSearchParams({
      url: validation.data,
    }).toString();

    const data = await clientApi.get<JobPostingResponse>(
      `/v1/job-postings?${query}`,
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '채용공고 정보를 불러오지 못했습니다.',
    };
  }
}