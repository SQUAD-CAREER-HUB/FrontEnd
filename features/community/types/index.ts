/** * Backend Data Transfer Objects (DTO)
 * API 응답 규격 그대로의 타입
 */

export interface ReviewListItemResponse {
  reviewId: number;
  company: string;
  position: string;
  interviewType: string;
  shortContent: string;
  createdAt: string;
  author: string;
  // TODO API 수정 요청 isAuthor 필요
  isAuthor: boolean;
}

export interface ReviewDetailResponse {
  reviewId: number;
  company: string;
  position: string;
  interviewType: string;
  content: string;
  createdAt: string;
  author: string;
  isAuthor: boolean;
  interviewQuestions: ReviewQuestionResponse[];
}

export interface ReviewQuestionResponse {
  questionId: number;
  question: string;
}

export interface ReviewListResponse {
  contents: ReviewListItemResponse[];
  hasNext: boolean;
  nextCursorId: number | null;
}

export interface InterviewQuestion {
  id?: number; // 수정 시에는 존재, 등록 시에는 없음
  question: string;
}

export interface ReviewResponse {
  reviewId: number;
  company: string;
  position: string;
  interviewType: string;
  content: string;
  createdAt: string;
  author: string;
  isAuthor: boolean;
  interviewQuestions: InterviewQuestion[] | string[];
}

export interface PostReviewRequest {
  company: string;
  position: string;
  interviewType: string;
  interviewQuestions: string[]; // 등록 시 string 배열
  content: string;
}

export interface UpdateReviewRequest {
  company: string;
  position: string;
  interviewType: string;
  interviewQuestions: InterviewQuestion[]; // 수정 시 객체 배열
  content: string;
}

/** * Frontend Domain Model
 * UI 컴포넌트에서 사용할 가공된 타입
 */
export interface PostListItem {
  id: number;
  companyName: string;
  position: string;
  interviewType: string;
  content: string;
  authorName: string;
  createdAt: string;
  isMine: boolean;
}

export interface PostDetail {
  id: number;
  companyName: string;
  position: string;
  interviewType: string;
  content: string;
  authorName: string;
  createdAt: string;
  isMine: boolean;
  questions: { id: number; content: string }[];
}

export type SortOrder = 'NEWEST' | 'OLDEST';
