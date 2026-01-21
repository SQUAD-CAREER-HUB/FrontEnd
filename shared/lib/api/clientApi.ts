import { ApiError, BackendErrorResponse } from './errors';
import { apiLogger } from './logger';

/**
 * 클라이언트 사이드 전용 API 유틸리티
 * BFF(Next.js API Routes)를 거쳐 백엔드 서버와 통신합니다.
 */
export const clientApi = {
  /**
   * [Core] 공통 HTTP 요청 처리 함수
   */
  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const method = options.method || 'GET';
    const bffUrl = `/api/bff${path.startsWith('/') ? path : `/${path}`}`;
    const context = `${method} ${path}`;

    try {
      const response = await fetch(bffUrl, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      // HTTP 에러 응답 처리 (400, 500번대 등)
      if (!response.ok) {
        // 백엔드가 준 에러 JSON 파싱 시도
        const errorData: BackendErrorResponse = await response
          .json()
          .catch(() => ({
            statusCode: response.status,
            message: '알 수 없는 에러가 발생했습니다.',
          }));

        const apiError = new ApiError(errorData);
        // 서버 정의 에러 로깅
        apiLogger.error(apiError, context);
        throw apiError;
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

      /**
       * JSON 파싱 및 성공, 에러 로깅
       * [수정 제안]: 파싱 단계에서 발생할 수 있는 SyntaxError를 별도로 잡아
       * 데이터 형식 오류(예: 200 OK인데 HTML이 온 경우)를 명확히 구분합니다.
       */
      try {
        const result = JSON.parse(text) as T;
        apiLogger.success(path, result, method); // [로깅] 성공
        return result;
      } catch (parseError) {
        // 응답은 성공했으나 데이터 포맷이 비정상적인 경우
        const dataError = new Error('응답 데이터 형식이 올바르지 않습니다.');
        apiLogger.error(dataError, context);
        throw dataError;
      }
    } catch (error) {
      /**
       * 최종 예외 처리 (Catch Block)
       * - 네트워크 장애, DNS 문제, 타임아웃
       * - 위에서 정의되지 않은 예기치 못한 런타임 에러
       */

      // 이미 위에서 처리된 백엔드 비즈니스 에러(ApiError)가 아닌 시스템/네트워크 에러만 로깅
      if (!(error instanceof ApiError)) {
        apiLogger.error(error, context);
      }

      // 브라우저 네이티브 에러인 경우 사용자 친화적인 메시지로 가공
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('네트워크 연결 상태를 확인해주세요.');
      }

      throw error;
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

  /** HTTP POST with FormData: 파일 업로드 등 */
  async postFormData<T>(path: string, formData: FormData, options?: RequestInit): Promise<T> {
    const bffUrl = `/api/bff${path.startsWith('/') ? path : `/${path}`}`;
    const context = `POST ${path}`;

    try {
      const response = await fetch(bffUrl, {
        ...options,
        method: 'POST',
        body: formData,
        // Content-Type은 FormData 사용 시 브라우저가 자동 설정 (boundary 포함)
      });

      if (!response.ok) {
        const errorData: BackendErrorResponse = await response
          .json()
          .catch(() => ({
            statusCode: response.status,
            message: '클라이언트 요청 에러',
          }));

        const apiError = new ApiError(errorData);
        apiLogger.error(apiError, context);
        throw apiError;
      }

      return response.json();
    } catch (error) {
      if (!(error instanceof ApiError)) {
        apiLogger.error(error, context);
      }
      throw error;
    }
  },

  /** HTTP PATCH with FormData: 파일 포함 일부 수정 */
  async patchFormData<T>(path: string, formData: FormData, options?: RequestInit): Promise<T> {
    const bffUrl = `/api/bff${path.startsWith('/') ? path : `/${path}`}`;
    const context = `PATCH ${path}`;

    try {
      const response = await fetch(bffUrl, {
        ...options,
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        const errorData: BackendErrorResponse = await response
          .json()
          .catch(() => ({
            statusCode: response.status,
            message: '클라이언트 요청 에러',
          }));

        const apiError = new ApiError(errorData);
        apiLogger.error(apiError, context);
        throw apiError;
      }

      return response.json();
    } catch (error) {
      if (!(error instanceof ApiError)) {
        apiLogger.error(error, context);
      }
      throw error;
    }
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