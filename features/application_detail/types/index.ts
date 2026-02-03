import { ScheduleResult } from '@/shared/types';

// API 응답 타입 정의
export type SubmissionStatus = 'NOT_SUBMITTED' | 'SUBMITTED';
export type ApplicationStatus = 'IN_PROGRESS' | 'FINAL_PASS' | 'FINAL_FAIL';

// 서류 전형 수정 요청 (서버로 보낼 때 사용하는 영어 값)
export type ApplicationMethod = 'PLATFORM' | 'EMAIL' | 'REFERRAL' | 'HOMEPAGE' | 'EMPTY';

// 서버에서 받을 때 오는 한글 값
export type ApplicationMethodLabel = '홈페이지 지원' | '이메일' | '채용 플랫폼' | '지인 추천' | '미선택' | '미입력';

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
  applicationMethod: ApplicationMethodLabel | 'EMPTY'; // 서버에서 한글로 옴
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
  scheduleId: number;
  scheduleName: string;
  scheduleResult: ScheduleResult;
  startedAt: string;
  endedAt: string;
}

// 면접 전형 타임라인
export interface InterviewStageTimeLine {
  stageId: number;
  scheduleId: number;
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

// 지원서 수정 요청 타입
export interface ApplicationUpdateRequestData {
  jobPostingUrl?: string;
  company?: string;
  position?: string;
  jobLocation?: string;
  memo?: string;
  attachedFiles?: string[];
}

export interface ApplicationUpdateRequest {
  request: ApplicationUpdateRequestData;
  files?: (File | string)[];
}

// 스케줄 API 응답 타입
export type StageType = 'DOCUMENT' | 'ETC' | 'INTERVIEW' | 'APPLICATION_CLOSE';

export interface ScheduleResponse {
  id: number;
  applicationId: number;
  company: string;
  position: string;
  stageType: StageType;
  scheduleName: string;
  startedAt: string;
  endedAt: string;
  location: string;
  scheduleResult: ScheduleResult;
  submissionStatus: SubmissionStatus;
  applicationStatus: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

// 면접 스케줄 생성/수정 요청
export interface InterviewScheduleRequest {
  scheduleName: string;
  startedAt: string;
  location: string;
  result: ScheduleResult;
}

// 기타 스케줄 생성 요청
export interface EtcScheduleRequest {
  scheduleName: string;
  startedAt: string;
  endedAt: string;
  scheduleResult: ScheduleResult;
}

// 기타 스케줄 수정 요청
export interface EtcScheduleUpdateRequest {
  scheduleName: string;
  startedAt: string;
  endedAt: string;
  result: ScheduleResult;
}

export interface DocumentStageUpdateRequest {
  deadline: string;
  applicationMethod: ApplicationMethod;
  submissionStatus: SubmissionStatus;
  scheduleResult: ScheduleResult;
}

// 면접 질문 생성 요청
export interface InterviewQuestionRequest {
  applicationId: number;
  interviewQuestionId?: number | null;
  interviewType: string;
  question: string;
  memo: string;
}

// 면접 질문 응답
export interface InterviewQuestionResponse {
  interviewQuestionId: number;
  applicationId: number;
  interviewType: string;
  question: string;
  memo: string;
}

// 면접 질문 아카이브 아이템
export interface InterviewQuestionArchiveItem {
  questionArchiveId: number;
  interviewQuestionId: number;
  applicationId: number;
  company: string;
  interviewType: string;
  question: string;
  memo: string;
  createdAt: string;
}

// 면접 질문 목록 조회 응답
export interface InterviewQuestionsResponse {
  contents: InterviewQuestionArchiveItem[];
  hasNext: boolean;
  nextCursorId: number | null;
}

// 면접 질문 목록 조회 필터
export type LinkStatus = 'LINKED' | 'UNLINKED';

export interface InterviewQuestionsFilter {
  query?: string;
  linkStatus?: LinkStatus;
  applicationId?: number;
  size?: string;
}
