type DocumentEvent = {
  processType: 'DOCUMENT';
  documentStatus: 'NOT_SUBMITTED' | 'SUBMITTED';
};

type InterviewEvent = {
  processType: 'INTERVIEW';
  interviewTitle: string;
  interviewLocation: string;
};

type EtcEvent = {
  processType: 'ETC';
  etcTitle: string;
};

type CloseEvent = {
  processType: 'CLOSE';
};

export type CalendarEvent = {
  id: string;
  applicationId: string;
  companyName: string;
  startDateTime: string;
  endDateTime: string;
  applicationDeadline: string;
  resultStatus?: 'PROCESS_PASS' | 'FINAL_PASS' | 'FINAL_FAIL';
} & (DocumentEvent | InterviewEvent | EtcEvent | CloseEvent);
