import { ScheduleResult } from '@/types';
import { create } from 'zustand';

// API 응답 타입 정의
type SubmissionStatus = 'NOT_SUBMITTED' | 'SUBMITTED';
type ApplicationStatus = 'IN_PROGRESS' | 'FINAL_PASS' | 'FINAL_FAIL';

// 지원 정보
interface ApplicationInfo {
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
interface DocsStageTimeLine {
  stageId: number;
  scheduleName: string;
  scheduleResult: ScheduleResult;
  submissionStatus: SubmissionStatus;
}

// 기타 전형 타임라인
interface EtcStageTimeLine {
  stageId: number;
  scheduleName: string;
  scheduleResult: ScheduleResult;
  startedAt: string;
  endedAt: string;
}

// 면접 전형 타임라인
interface InterviewStageTimeLine {
  stageId: number;
  scheduleName: string;
  scheduleResult: ScheduleResult;
  location: string;
  startedAt: string;
}

// 전체 타임라인
interface ApplicationStageTimeLine {
  docsStageTimeLine: DocsStageTimeLine;
  etcStageTimeLine: EtcStageTimeLine[];
  interviewStageTimeLine: InterviewStageTimeLine[];
}

// 전체 데이터 구조
interface ApplicationData {
  applicationInfo: ApplicationInfo;
  applicationStageTimeLine: ApplicationStageTimeLine;
}

// Store 상태 인터페이스
interface RecruitmentState {
  data: ApplicationData | null;
  
  // 전체 데이터 설정
  setApplicationData: (data: ApplicationData) => void;
    
  // 전체 초기화
  reset: () => void;
}

// 초기 상태
const initialData: ApplicationData = {
  applicationInfo: {
    applicationId: 0,
    company: '',
    position: '',
    jobLocation: '',
    jobPostingUrl: '',
    currentStageType: '서류 전형',
    applicationStatus: 'IN_PROGRESS',
    deadline: '',
    applicationMethod: '',
    memo: '',
    attachedFiles: [],
  },
  applicationStageTimeLine: {
    docsStageTimeLine: {
      stageId: 1,
      scheduleName: '서류 전형',
      scheduleResult: 'WAITING',
      submissionStatus: 'NOT_SUBMITTED',
    },
    etcStageTimeLine: [],
    interviewStageTimeLine: [],
  },
};

// Zustand Store 생성
export const useApplicationStore = create<RecruitmentState>((set) => ({
  data: null,
  
  setApplicationData: (data) =>
    set({ data }),
  
  // 전체 초기화
  reset: () =>
    set({ data: initialData }),
}));