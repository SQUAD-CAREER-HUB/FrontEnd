import { clientApi } from '@/shared/lib/api/clientApi';
import { GetQuestionsResponse } from '../types';

/**
 * [GET] 개인 면접 질문 목록 조회 (커서 기반 페이지네이션)
 * @param lastCursorId 마지막으로 조회한 질문 ID (커서)
 * @param size 한 번에 조회할 데이터 개수 (기본값 20)
 */
export const getQuestions = async (
  lastCursorId?: number,
  size: number = 20
): Promise<GetQuestionsResponse> => {
  const params = new URLSearchParams({
    size: String(size),
    ...(lastCursorId && { lastCursorId: String(lastCursorId) }),
  });

  return clientApi.get<GetQuestionsResponse>(`/v1/archive/questions?${params}`);
};

/** 질문 등록 응답 타입 */
export interface CreateQuestionResponse {
  id: number;
  applicationId: number | null;
  interviewQuestionId: number | null;
  question: string;
  answer: string;
  fromCommunity: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * 개인 면접 질문 등록 API
 * @param body - 질문 및 답변 데이터
 * @param applicationId - 선택사항 (특정 지원 카드와 연결 시)
 */
export const createQuestion = async (
  body: {
    company: string;
    position: string;
    question: string;
    interviewType: string;
    answer?: string;
  },
  applicationId?: number
): Promise<CreateQuestionResponse> => {
  const queryString = applicationId ? `?applicationId=${applicationId}` : '';

  return clientApi.post<CreateQuestionResponse>(
    `v1/archive/questions${queryString}`,
    body
  );
};

export const updateQuestion = async (
  questionId: number,
  body: {
    company: string;
    position: string;
    question: string;
    interviewType: string;
    answer?: string;
  }
) => {
  return clientApi.patch(`v1/archive/questions/${questionId}`, body);
};

export const deleteQuestion = async (questionId: number) => {
  return clientApi.delete(`v1/archive/questions/${questionId}`);
};
