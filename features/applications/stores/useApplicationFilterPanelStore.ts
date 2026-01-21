import { create } from 'zustand';

interface ApplicationFilterPanelState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useApplicationFilterPanelStore =
  create<ApplicationFilterPanelState>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  }));
