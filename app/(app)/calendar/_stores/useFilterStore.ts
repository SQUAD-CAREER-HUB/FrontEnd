import { create } from 'zustand';
import { ProcessType, DocumentStatus, ResultStatus } from '../_types/filter';

type FilterState = {
  /** ===== filter values ===== */
  companyNames: string[]; // 기업명 다중 선택
  processTypes: ProcessType[]; // 전형 종류
  documentStatuses: DocumentStatus[];
  resultStatuses: ResultStatus[];

  /** ===== actions ===== */
  toggleCompany: (name: string) => void;
  toggleProcessType: (type: ProcessType) => void;
  toggleDocumentStatus: (status: DocumentStatus) => void;
  toggleResultStatus: (status: ResultStatus) => void;

  clearAll: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  /** ===== initial state ===== */
  companyNames: [],
  processTypes: [],
  documentStatuses: [],
  resultStatuses: [],

  /** ===== helpers ===== */
  toggleCompany: (name) =>
    set((state) => ({
      companyNames: state.companyNames.includes(name)
        ? state.companyNames.filter((n) => n !== name)
        : [...state.companyNames, name],
    })),

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
      companyNames: [],
      processTypes: [],
      documentStatuses: [],
      resultStatuses: [],
    }),
}));
