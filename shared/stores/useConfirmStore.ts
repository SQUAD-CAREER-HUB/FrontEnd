import { create } from 'zustand';

interface ConfirmConfig {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
  onConfirm: () => void;
}

interface ConfirmStore {
  isOpen: boolean;
  config: ConfirmConfig;
  openConfirm: (config: ConfirmConfig) => void;
  closeConfirm: () => void;
}

export const useConfirmStore = create<ConfirmStore>((set) => ({
  isOpen: false,
  config: {
    title: '',
    description: '',
    onConfirm: () => {},
  },
  openConfirm: (config) => set({ isOpen: true, config }),
  closeConfirm: () => set({ isOpen: false }),
}));
