export interface QuestionItem {
  id: number;
  applicationId: number;
  interviewQuestionId: number | null;
  question: string;
  answer: string;
  fromCommunity: boolean;
  createdAt: string;
  updatedAt: string;
  company: string;
  position: string;
  interviewType: string;
}

export interface GetQuestionsResponse {
  questions: QuestionItem[];
  hasNext: boolean;
  nextCursorId: number | null;
}
