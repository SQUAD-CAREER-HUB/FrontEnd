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
  
  // 지원 정보 업데이트
  updateApplicationInfo: (info: Partial<ApplicationInfo>) => void;
  
  // 서류 전형 업데이트
  updateDocsStage: (data: Partial<DocsStageTimeLine>) => void;
  
  // 기타 전형 일정 추가
  addEtcStage: (stage: Omit<EtcStageTimeLine, 'stageId'>) => void;
  
  // 기타 전형 일정 수정
  updateEtcStage: (stageId: number, data: Partial<EtcStageTimeLine>) => void;
  
  // 기타 전형 일정 삭제
  deleteEtcStage: (stageId: number) => void;
  
  // 면접 전형 일정 추가
  addInterviewStage: (stage: Omit<InterviewStageTimeLine, 'stageId'>) => void;
  
  // 면접 전형 일정 수정
  updateInterviewStage: (stageId: number, data: Partial<InterviewStageTimeLine>) => void;
  
  // 면접 전형 일정 삭제
  deleteInterviewStage: (stageId: number) => void;
  
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
  
  // 전체 데이터 설정 (API에서 받아온 데이터 저장)
  setApplicationData: (data) =>
    set({ data }),
  
  // 지원 정보 업데이트
  updateApplicationInfo: (info) =>
    set((state) => {
      if (!state.data) return state;
      return {
        data: {
          ...state.data,
          applicationInfo: {
            ...state.data.applicationInfo,
            ...info,
          },
        },
      };
    }),
  
  // 서류 전형 업데이트
  updateDocsStage: (data) =>
    set((state) => {
      if (!state.data) return state;
      return {
        data: {
          ...state.data,
          applicationStageTimeLine: {
            ...state.data.applicationStageTimeLine,
            docsStageTimeLine: {
              ...state.data.applicationStageTimeLine.docsStageTimeLine,
              ...data,
            },
          },
        },
      };
    }),
  
  // 기타 전형 일정 추가
  addEtcStage: (stage) =>
    set((state) => {
      if (!state.data) return state;
      const newStageId = Math.max(
        ...state.data.applicationStageTimeLine.etcStageTimeLine.map(s => s.stageId),
        ...state.data.applicationStageTimeLine.interviewStageTimeLine.map(s => s.stageId),
        state.data.applicationStageTimeLine.docsStageTimeLine.stageId,
        0
      ) + 1;
      
      return {
        data: {
          ...state.data,
          applicationStageTimeLine: {
            ...state.data.applicationStageTimeLine,
            etcStageTimeLine: [
              ...state.data.applicationStageTimeLine.etcStageTimeLine,
              { ...stage, stageId: newStageId },
            ],
          },
        },
      };
    }),
  
  // 기타 전형 일정 수정
  updateEtcStage: (stageId, data) =>
    set((state) => {
      if (!state.data) return state;
      return {
        data: {
          ...state.data,
          applicationStageTimeLine: {
            ...state.data.applicationStageTimeLine,
            etcStageTimeLine: state.data.applicationStageTimeLine.etcStageTimeLine.map(
              (stage) => stage.stageId === stageId ? { ...stage, ...data } : stage
            ),
          },
        },
      };
    }),
  
  // 기타 전형 일정 삭제
  deleteEtcStage: (stageId) =>
    set((state) => {
      if (!state.data) return state;
      return {
        data: {
          ...state.data,
          applicationStageTimeLine: {
            ...state.data.applicationStageTimeLine,
            etcStageTimeLine: state.data.applicationStageTimeLine.etcStageTimeLine.filter(
              (stage) => stage.stageId !== stageId
            ),
          },
        },
      };
    }),
  
  // 면접 전형 일정 추가
  addInterviewStage: (stage) =>
    set((state) => {
      if (!state.data) return state;
      const newStageId = Math.max(
        ...state.data.applicationStageTimeLine.etcStageTimeLine.map(s => s.stageId),
        ...state.data.applicationStageTimeLine.interviewStageTimeLine.map(s => s.stageId),
        state.data.applicationStageTimeLine.docsStageTimeLine.stageId,
        0
      ) + 1;
      
      return {
        data: {
          ...state.data,
          applicationStageTimeLine: {
            ...state.data.applicationStageTimeLine,
            interviewStageTimeLine: [
              ...state.data.applicationStageTimeLine.interviewStageTimeLine,
              { ...stage, stageId: newStageId },
            ],
          },
        },
      };
    }),
  
  // 면접 전형 일정 수정
  updateInterviewStage: (stageId, data) =>
    set((state) => {
      if (!state.data) return state;
      return {
        data: {
          ...state.data,
          applicationStageTimeLine: {
            ...state.data.applicationStageTimeLine,
            interviewStageTimeLine: state.data.applicationStageTimeLine.interviewStageTimeLine.map(
              (stage) => stage.stageId === stageId ? { ...stage, ...data } : stage
            ),
          },
        },
      };
    }),
  
  // 면접 전형 일정 삭제
  deleteInterviewStage: (stageId) =>
    set((state) => {
      if (!state.data) return state;
      return {
        data: {
          ...state.data,
          applicationStageTimeLine: {
            ...state.data.applicationStageTimeLine,
            interviewStageTimeLine: state.data.applicationStageTimeLine.interviewStageTimeLine.filter(
              (stage) => stage.stageId !== stageId
            ),
          },
        },
      };
    }),
  
  // 전체 초기화
  reset: () =>
    set({ data: initialData }),
}));