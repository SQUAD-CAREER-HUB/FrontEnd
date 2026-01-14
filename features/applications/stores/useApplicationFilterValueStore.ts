import { create } from 'zustand';
import { StageType, SubmissionStatus, StageResult } from '../types/filter';

type ApplicationFilterValueState = {
  /** ===== filter values ===== */
  query: string;
  stageTypes: StageType[];
  submissionStatus: SubmissionStatus | null;
  stageResult: StageResult | null;

  /** ===== actions ===== */
  setQuery: (query: string) => void;
  toggleStageType: (type: StageType) => void;
  setSubmissionStatus: (status: SubmissionStatus | null) => void;
  setStageResult: (result: StageResult | null) => void;
  clearAll: () => void;
};

export const useApplicationFilterValueStore =
  create<ApplicationFilterValueState>((set) => ({
    /** ===== initial state ===== */
    query: '',
    stageTypes: [],
    submissionStatus: null,
    stageResult: null,

    /** ===== actions ===== */
    setQuery: (query) => set({ query }),

    toggleStageType: (type) =>
      set((state) => ({
        stageTypes: state.stageTypes.includes(type)
          ? state.stageTypes.filter((t) => t !== type)
          : [...state.stageTypes, type],
      })),

    setSubmissionStatus: (status) =>
      set((state) => ({
        submissionStatus: state.submissionStatus === status ? null : status,
      })),

    setStageResult: (result) =>
      set((state) => ({
        stageResult: state.stageResult === result ? null : result,
      })),

    clearAll: () =>
      set({
        query: '',
        stageTypes: [],
        submissionStatus: null,
        stageResult: null,
      }),
  }));
