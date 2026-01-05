export type InterviewResult = 'PENDING' | 'PASS' | 'FAIL';
export type InterviewType =
  | 'TECH'
  | 'CULTURE_FIT'
  | 'PERSONALITY'
  | 'ASSIGNMENT_REVIEW';

export interface Interview {
  id: number;
  applicationId: number;
  type: InterviewType;
  typeDetail: string;
  datetime: string; // ISO 8601
  location: string | null;
  onlineLink: string | null;
  result: InterviewResult;
  createdAt: string;
  updatedAt: string;
}

export interface UpcomingInterviewsResponse {
  interviews: Interview[];
  hasNext: boolean;
  nextCursorId: number | null;
}
