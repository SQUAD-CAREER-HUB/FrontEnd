import { applicationHandlers } from './applications.handlers';
import { calendarHandlers } from './calendars.handlers';
import { membersHandlers } from './members.handlers';

export const handlers = [
  ...applicationHandlers,
  ...calendarHandlers,
  ...membersHandlers,
];
