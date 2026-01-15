import { create } from 'zustand';
import { ApplicationDetailResponse } from '../types';

// 타입 재export (기존 코드 호환성)
export type { ApplicationStatus, SubmissionStatus } from '../types';

// Store 상태 인터페이스
interface ApplicationState {
  data: ApplicationDetailResponse | null;
  setApplicationData: (data: ApplicationDetailResponse) => void;
  reset: () => void;
}

// Zustand Store 생성 (로컬 상태 관리용 - 편집 등)
export const useApplicationStore = create<ApplicationState>((set) => ({
  data: null,
  setApplicationData: (data) => set({ data }),
  reset: () => set({ data: null }),
}));