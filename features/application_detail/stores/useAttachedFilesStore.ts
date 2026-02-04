import { create } from 'zustand';

interface AttachedFilesState {
  // 서버에서 받은 기존 파일 URL 목록
  attachedFiles: string[];
  // 새로 추가할 파일 목록
  newFiles: File[];
  // Actions
  setAttachedFiles: (files: string[]) => void;
  removeAttachedFile: (index: number) => void;
  addNewFiles: (files: File[]) => void;
  removeNewFile: (index: number) => void;
  reset: (initialFiles?: string[]) => void;
}

export const useAttachedFilesStore = create<AttachedFilesState>((set) => ({
  attachedFiles: [],
  newFiles: [],
  setAttachedFiles: (files) => set({ attachedFiles: files }),
  removeAttachedFile: (index) =>
    set((state) => ({
      attachedFiles: state.attachedFiles.filter((_, i) => i !== index),
    })),
  addNewFiles: (files) =>
    set((state) => ({
      newFiles: [...state.newFiles, ...files],
    })),
  removeNewFile: (index) =>
    set((state) => ({
      newFiles: state.newFiles.filter((_, i) => i !== index),
    })),
  reset: (initialFiles = []) =>
    set({
      attachedFiles: initialFiles,
      newFiles: [],
    }),
}));
