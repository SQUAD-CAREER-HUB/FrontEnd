import { ApiError, BackendErrorResponse } from './errors';

/**
 * 클라이언트 사이드 전용 API 유틸리티
 * BFF(Next.js API Routes)를 거쳐 백엔드 서버와 통신합니다.
 */
export const clientApi = {
  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const bffUrl = `/api/bff${path.startsWith('/') ? path : `/${path}`}`;

    const response = await fetch(bffUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    // 에러 응답 처리 (400, 500번대 등)
    if (!response.ok) {
      // 백엔드가 준 에러 JSON 파싱 시도
      const errorData: BackendErrorResponse = await response
        .json()
        .catch(() => ({
          statusCode: response.status,
          message: '알 수 없는 에러가 발생했습니다.',
        }));

      throw new ApiError(errorData);
    }

    /**
     * 응답 본문(Body) 처리
     * .json()을 바로 쓰지 않고 .text()로 읽는 이유:
     * - 204 No Content, 201 Created 등 본문이 비어있는 응답에서
     * .json() 호출 시 발생하는 "Unexpected end of JSON input" 에러를 방지하기 위함입니다.
     */
    const text = await response.text();

    // 본문이 아예 비어있다면(빈 문자열) 파싱을 생략하고 빈 객체 반환
    if (!text) {
      return {} as T;
    }

    try {
      // 본문 내용이 있을 때만 JSON 파싱을 시도합니다.
      return JSON.parse(text) as T;
    } catch (e) {
      // JSON 파싱 에러가 날 경우(예: 평문 텍스트)를 대비한 안전장치
      return text as unknown as T;
    }
  },

  /** HTTP GET: 데이터 조회 */
  get<T>(path: string, options?: RequestInit) {
    return this.request<T>(path, { ...options, method: 'GET' });
  },

  /** HTTP POST: 새로운 리소스 생성 */
  post<T>(path: string, body: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  /** HTTP PUT: 리소스 전체 수정 */
  put<T>(path: string, body: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  /** HTTP PATCH: 리소스 일부 수정 */
  patch<T>(path: string, body: unknown, options?: RequestInit) {
    return this.request<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  /** HTTP DELETE: 리소스 삭제 */
  delete<T>(path: string, options?: RequestInit) {
    return this.request<T>(path, {
      ...options,
      method: 'DELETE',
    });
  },
};
