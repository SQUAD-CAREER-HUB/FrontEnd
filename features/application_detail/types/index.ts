import { ScheduleResult } from '@/shared/types';

// API 응답 타입 정의
export type SubmissionStatus = 'NOT_SUBMITTED' | 'SUBMITTED';
export type ApplicationStatus = 'IN_PROGRESS' | 'FINAL_PASS' | 'FINAL_FAIL';

// 지원 정보
export interface ApplicationInfo {
  applicationId: number;
  company: string;
  position: string;
  jobLocation: string;
  jobPostingUrl: string;
  currentStageType: string;
  applicationStatus: ApplicationStatus;
  deadline: string;
  applicationMethod: string;
  memo: string;
  attachedFiles: string[];
}

// 서류 전형 타임라인
export interface DocsStageTimeLine {
  stageId: number;
  scheduleName: string;
  scheduleResult: ScheduleResult;
  submissionStatus: SubmissionStatus;
}

// 기타 전형 타임라인
export interface EtcStageTimeLine {
  stageId: number;
  scheduleName: string;
  scheduleResult: ScheduleResult;
  startedAt: string;
  endedAt: string;
}

// 면접 전형 타임라인
export interface InterviewStageTimeLine {
  stageId: number;
  scheduleName: string;
  scheduleResult: ScheduleResult;
  location: string;
  startedAt: string;
}

// 전체 타임라인
export interface ApplicationStageTimeLine {
  docsStageTimeLine: DocsStageTimeLine;
  etcStageTimeLine: EtcStageTimeLine[];
  interviewStageTimeLine: InterviewStageTimeLine[];
}

// 전체 데이터 구조 (API 응답)
export interface ApplicationDetailResponse {
  applicationInfo: ApplicationInfo;
  applicationStageTimeLine: ApplicationStageTimeLine;
}
