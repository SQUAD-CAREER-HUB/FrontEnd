// 채용공고 파싱 응답 타입
export interface JobPostingResponse {
  url: string;
  company: string;
  position: string;
  deadline: string;
  workplace: string;
  recruitmentProcess: string[];
  status: 'PARTIAL' | 'COMPLETE' | 'FAILED';
}

// 채용공고 파싱 요청 타입
export interface JobPostingRequest {
  url: string;
}
