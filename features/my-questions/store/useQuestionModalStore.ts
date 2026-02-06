import { create } from 'zustand';
import { QuestionItem } from '../types';

interface QuestionModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  selectedQuestion: QuestionItem | null;

  openCreateModal: () => void;
  openEditModal: (question: QuestionItem) => void;
  closeModal: () => void;
}

export const useQuestionModalStore = create<QuestionModalState>((set) => ({
  isOpen: false,
  mode: 'create',
  selectedQuestion: null,

  openCreateModal: () =>
    set({
      isOpen: true,
      mode: 'create',
      selectedQuestion: null,
    }),

  openEditModal: (question) =>
    set({
      isOpen: true,
      mode: 'edit',
      selectedQuestion: question,
    }),

  closeModal: () =>
    set({
      isOpen: false,
    }),
}));
