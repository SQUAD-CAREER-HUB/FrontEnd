import { View } from 'react-big-calendar';
import { create } from 'zustand';

interface CalendarViewState {
  view: View;
  date: Date;
  setView: (view: View) => void;
  setDate: (date: Date) => void;
  setViewAndDate: (view: View, date: Date) => void;
}

export const useCalendarViewStore = create<CalendarViewState>((set) => ({
  view: 'month',
  date: new Date(),

  setView: (view) => set({ view }),
  setDate: (date) => set({ date }),

  setViewAndDate: (view, date) =>
    set({
      view,
      date,
    }),
}));
