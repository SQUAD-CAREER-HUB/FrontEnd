import { create } from 'zustand';

// 전형 단계 타입
export type StageType = 'document' | 'other' | 'interview' | 'closed';

// 서류 상태 타입
export type DocumentStatus = 'not_submitted' | 'submitted';

// 지원 방식 타입
export type ApplicationMethod = 'website' | 'email' | 'platform' | 'referral';

// 전형 결과 타입
export type StageResult = 'WAITING' | 'PASS' | 'FAILED';

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
  result: StageResult;

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
  setResult: (result: StageResult) => void;

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
  result: 'WAITING' as StageResult,
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

  // ===== Reset =====
  reset: () => set(initialState),
}));
