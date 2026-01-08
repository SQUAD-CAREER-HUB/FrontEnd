import { applicationHandlers } from './applications.handlers';
import { calendarHandlers } from './calendars.handlers';
import { interviewsHandlers } from './interviews.handlers';
import { membersHandlers } from './members.handlers';

export const handlers = [
  ...applicationHandlers,
  ...calendarHandlers,
  ...membersHandlers,
  ...interviewsHandlers,
];
