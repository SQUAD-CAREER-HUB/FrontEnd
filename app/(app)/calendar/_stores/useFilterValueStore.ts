import { create } from 'zustand';
import { ProcessType, DocumentStatus, ResultStatus } from '../_types/filter';

type FilterValueState = {
  /** ===== filter values ===== */
  processTypes: ProcessType[]; // 전형 종류
  documentStatuses: DocumentStatus[];
  resultStatuses: ResultStatus[];

  /** ===== actions ===== */
  toggleProcessType: (type: ProcessType) => void;
  toggleDocumentStatus: (status: DocumentStatus) => void;
  toggleResultStatus: (status: ResultStatus) => void;

  clearAll: () => void;
};

export const useFilterValueStore = create<FilterValueState>((set) => ({
  /** ===== initial state ===== */
  processTypes: [],
  documentStatuses: [],
  resultStatuses: [],

  /** ===== helpers ===== */
  toggleProcessType: (type) =>
    set((state) => ({
      processTypes: state.processTypes.includes(type)
        ? state.processTypes.filter((t) => t !== type)
        : [...state.processTypes, type],
    })),

  toggleDocumentStatus: (status) =>
    set((state) => ({
      documentStatuses: state.documentStatuses.includes(status)
        ? state.documentStatuses.filter((s) => s !== status)
        : [...state.documentStatuses, status],
    })),

  toggleResultStatus: (status) =>
    set((state) => ({
      resultStatuses: state.resultStatuses.includes(status)
        ? state.resultStatuses.filter((r) => r !== status)
        : [...state.resultStatuses, status],
    })),

  clearAll: () =>
    set({
      processTypes: [],
      documentStatuses: [],
      resultStatuses: [],
    }),
}));
