import { applicationHandlers } from './applications.handlers';
import { calendarHandlers } from './calendars.handlers';
import { communityHandlers } from './community.handlers';
import { interviewsHandlers } from './interviews.handlers';
import { membersHandlers } from './members.handlers';
import { questionsHandlers } from './questions.handlers';

export const handlers = [
  ...applicationHandlers,
  ...calendarHandlers,
  ...membersHandlers,
  ...interviewsHandlers,
  ...questionsHandlers,
  ...communityHandlers,
];
