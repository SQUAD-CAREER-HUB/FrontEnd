import { applicationHandlers } from './applications.handlers';
import { calendarHandlers } from './calendars.handlers';
import { interviewQuestionsHandlers } from './interviewQuestions.handlers';

export const handlers = [
  ...applicationHandlers,
  ...calendarHandlers,
  ...interviewQuestionsHandlers,
];