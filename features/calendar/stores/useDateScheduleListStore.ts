import { create } from 'zustand';

interface DateScheduleListState {
  isOpen: boolean;
  selectedDate: Date | null;
  open: (date: Date) => void;
  close: () => void;
}

export const useDateScheduleListStore = create<DateScheduleListState>(
  (set) => ({
    isOpen: false,
    selectedDate: null,
    open: (date) => set({ isOpen: true, selectedDate: date }),
    close: () => set({ isOpen: false, selectedDate: null }),
  })
);
