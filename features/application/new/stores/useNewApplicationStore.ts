import { create } from 'zustand';

// ===== 내부 상태 타입 =====
export type StageType = 'document' | 'other' | 'interview' | 'closed';
export type DocumentStatus = 'not_submitted' | 'submitted';
export type ApplicationMethod = 'website' | 'email' | 'platform' | 'referral';
export type ScheduleResult = 'WAITING' | 'PASS' | 'FAILED';
export type FinalApplicationStatus = 'FINAL_PASS' | 'FINAL_FAIL' | null;

// ===== API 요청 타입 =====
export type ApiStageType = 'DOCUMENT' | 'OTHER' | 'INTERVIEW' | 'CLOSED';
export type ApiSubmissionStatus = 'SUBMITTED' | 'NOT_SUBMITTED';
export type ApiApplicationMethod = 'ONLINE' | 'EMAIL' | 'PLATFORM' | 'REFERRAL';

// 면접 스케줄 타입
export interface InterviewSchedule {
  id: string;
  scheduleName: string;
  startedAt: string;
  location: string;
  scheduleResult: ScheduleResult;
}

// 기타 전형 스케줄 타입
export interface OtherSchedule {
  id: string;
  scheduleName: string;
  startedAt: string;
  endedAt: string;
  scheduleResult: ScheduleResult;
}

// API 요청 데이터 타입
export interface ApplicationCreateRequest {
  request: {
    jobPosting: {
      jobPostingUrl: string;
      company: string;
      position: string;
      deadline: string;
      jobLocation: string;
    };
    stage: {
      stageType: ApiStageType;
      docsStageCreateRequest: {
        submissionStatus: ApiSubmissionStatus;
        applicationMethod: ApiApplicationMethod;
        scheduleResult: ScheduleResult;
      };
      etcSchedules: Array<{
        scheduleName: string;
        startedAt: string;
        endedAt: string;
        scheduleResult: ScheduleResult;
      }>;
      interviewSchedules: Array<{
        scheduleName: string;
        startedAt: string;
        location: string;
        scheduleResult: ScheduleResult;
      }>;
      finalApplicationStatus: FinalApplicationStatus;
    };
  };
  files: string[];
}

interface NewApplicationState {
  // ===== 현재 스텝 =====
  currentStep: number;

  // ===== Step 1: URL =====
  url: string;

  // ===== Step 2: 기본 정보 =====
  company: string;
  position: string;
  deadline: string;
  jobLocation: string;

  // ===== Step 3: 전형 상태 =====
  stage: StageType;
  documentStatus: DocumentStatus;
  applicationMethod: ApplicationMethod;
  result: ScheduleResult;

  // ===== 면접 스케줄 =====
  interviewSchedules: InterviewSchedule[];

  // ===== 기타 전형 스케줄 =====
  otherSchedules: OtherSchedule[];

  // ===== 최종 결과 =====
  finalApplicationStatus: FinalApplicationStatus;

  // ===== 파일 =====
  files: string[];

  // ===== Actions =====
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setUrl: (url: string) => void;

  setCompany: (company: string) => void;
  setPosition: (position: string) => void;
  setDeadline: (deadline: string) => void;
  setJobLocation: (jobLocation: string) => void;

  setStage: (stage: StageType) => void;
  setDocumentStatus: (status: DocumentStatus) => void;
  setApplicationMethod: (method: ApplicationMethod) => void;
  setResult: (result: ScheduleResult) => void;

  // 면접 스케줄 Actions
  addInterviewSchedule: (schedule: InterviewSchedule) => void;
  deleteInterviewSchedule: (id: string) => void;

  // 기타 전형 스케줄 Actions
  addOtherSchedule: (schedule: OtherSchedule) => void;
  deleteOtherSchedule: (id: string) => void;

  // 최종 결과 Actions
  setFinalApplicationStatus: (status: FinalApplicationStatus) => void;

  // 파일 Actions
  setFiles: (files: string[]) => void;
  addFile: (file: string) => void;
  removeFile: (file: string) => void;

  // 전체 초기화
  reset: () => void;
}

const initialState = {
  currentStep: 1,
  url: '',
  company: '',
  position: '',
  deadline: '',
  jobLocation: '',
  stage: 'document' as StageType,
  documentStatus: 'not_submitted' as DocumentStatus,
  applicationMethod: 'website' as ApplicationMethod,
  result: 'WAITING' as ScheduleResult,
  interviewSchedules: [] as InterviewSchedule[],
  otherSchedules: [] as OtherSchedule[],
  finalApplicationStatus: null as FinalApplicationStatus,
  files: [] as string[],
};

// ===== 변환 유틸리티 함수 =====
const stageTypeMap: Record<StageType, ApiStageType> = {
  document: 'DOCUMENT',
  other: 'OTHER',
  interview: 'INTERVIEW',
  closed: 'CLOSED',
};

const submissionStatusMap: Record<DocumentStatus, ApiSubmissionStatus> = {
  not_submitted: 'NOT_SUBMITTED',
  submitted: 'SUBMITTED',
};

const applicationMethodMap: Record<ApplicationMethod, ApiApplicationMethod> = {
  website: 'ONLINE',
  email: 'EMAIL',
  platform: 'PLATFORM',
  referral: 'REFERRAL',
};

export const useNewApplicationStore = create<NewApplicationState>((set) => ({
  ...initialState,

  // ===== Step Actions =====
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),

  // ===== URL Actions =====
  setUrl: (url) => set({ url }),

  // ===== 기본 정보 Actions =====
  setCompany: (company) => set({ company }),
  setPosition: (position) => set({ position }),
  setDeadline: (deadline) => set({ deadline }),
  setJobLocation: (jobLocation) => set({ jobLocation }),

  // ===== 전형 상태 Actions =====
  setStage: (stage) => set({ stage }),
  setDocumentStatus: (documentStatus) => set({ documentStatus }),
  setApplicationMethod: (applicationMethod) => set({ applicationMethod }),
  setResult: (result) => set({ result }),

  // ===== 면접 스케줄 Actions =====
  addInterviewSchedule: (schedule) =>
    set((state) => ({
      interviewSchedules: [...state.interviewSchedules, schedule],
    })),
  deleteInterviewSchedule: (id) =>
    set((state) => ({
      interviewSchedules: state.interviewSchedules.filter((s) => s.id !== id),
    })),

  // ===== 기타 전형 스케줄 Actions =====
  addOtherSchedule: (schedule) =>
    set((state) => ({
      otherSchedules: [...state.otherSchedules, schedule],
    })),
  deleteOtherSchedule: (id) =>
    set((state) => ({
      otherSchedules: state.otherSchedules.filter((s) => s.id !== id),
    })),

  // ===== 최종 결과 Actions =====
  setFinalApplicationStatus: (finalApplicationStatus) => set({ finalApplicationStatus }),

  // ===== 파일 Actions =====
  setFiles: (files) => set({ files }),
  addFile: (file) => set((state) => ({ files: [...state.files, file] })),
  removeFile: (file) => set((state) => ({ files: state.files.filter((f) => f !== file) })),

  // ===== Reset =====
  reset: () => set(initialState),
}));

// ===== API 요청 데이터 변환 Selector =====
export const selectApplicationCreateRequest = (state: NewApplicationState): ApplicationCreateRequest => ({
  request: {
    jobPosting: {
      jobPostingUrl: state.url,
      company: state.company,
      position: state.position,
      deadline: state.deadline,
      jobLocation: state.jobLocation,
    },
    stage: {
      stageType: stageTypeMap[state.stage],
      docsStageCreateRequest: {
        submissionStatus: submissionStatusMap[state.documentStatus],
        applicationMethod: applicationMethodMap[state.applicationMethod],
        scheduleResult: state.result,
      },
      etcSchedules: state.otherSchedules.map(({ id, ...rest }) => rest),
      interviewSchedules: state.interviewSchedules.map(({ id, ...rest }) => rest),
      finalApplicationStatus: state.finalApplicationStatus,
    },
  },
  files: state.files,
});
