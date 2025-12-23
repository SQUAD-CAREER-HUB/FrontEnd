import { http, HttpResponse } from 'msw';
import { mockCalendarEvents } from '../data/calendars';

export const calendarHandlers = [
  http.get('/api/calendar/events', () => {
    return HttpResponse.json(mockCalendarEvents);
  }),
];
