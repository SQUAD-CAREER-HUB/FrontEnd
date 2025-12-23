import { create } from 'zustand';

interface DateScheduleCreateState {
  isOpen: boolean;
  selectedDate: Date | null;
  open: (date: Date | null) => void;
  close: () => void;
}

export const useDateScheduleCreateStore = create<DateScheduleCreateState>(
  (set) => ({
    isOpen: false,
    selectedDate: null,
    open: (date) => set({ isOpen: true, selectedDate: date }),
    close: () => set({ isOpen: false, selectedDate: null }),
  })
);
