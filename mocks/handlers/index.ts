import { applicationHandlers } from './applications.handlers';
import { calendarHandlers } from './calendars.handlers';

export const handlers = [...applicationHandlers, ...calendarHandlers];
