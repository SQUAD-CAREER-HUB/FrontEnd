import { http, HttpResponse } from 'msw';
import { mockCalendarEvents } from '../data/calendars';
import { ENV } from '@/shared/config/env';

export const calendarHandlers = [
  http.get(`${ENV.BFF_API_URL}/v1/calendar/events`, () => {
    return HttpResponse.json(mockCalendarEvents);
  }),
];
