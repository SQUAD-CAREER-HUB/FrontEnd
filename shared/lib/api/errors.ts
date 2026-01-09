// 백엔드와 약속한 에러 응답 구조 타입
export interface BackendErrorResponse {
  statusCode: number;
  message: string;
  validation?: Record<string, string>;
}

export class ApiError extends Error {
  statusCode: number;
  validation?: Record<string, string>;

  constructor(data: BackendErrorResponse) {
    // 백엔드 메시지가 없으면 상태 코드를 기본 메시지로 사용
    super(data.message || `서버 에러가 발생했습니다.`);

    this.name = 'ApiError';
    this.statusCode = data.statusCode;
    this.validation = data.validation;

    // 인스턴스 체크(instanceof)가 정상 작동하게 하기 위함
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
