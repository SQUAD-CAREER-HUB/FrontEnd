import { ApiError } from './errors';

const isDev = process.env.NODE_ENV === 'development';

export const apiLogger = {
  /**
   * API 호출 성공 로깅
   */
  success<T>(path: string, data: T, context?: string) {
    if (!isDev) return;

    console.groupCollapsed(
      `✅ [API CALL Success] ${context ? `${context} : ` : ''}${path}`
    );
    console.log('Response Data:', data);
    console.groupEnd();
  },

  /**
   * API 호출 에러 로깅
   */
  error(error: unknown, context?: string) {
    if (!isDev) {
      // 운영 환경: 필요 시 Sentry 등으로 전송
      // if (error instanceof ApiError) Sentry.captureException(error);
      return;
    }

    const tag = context ? ` [${context}]` : '';

    if (error instanceof ApiError) {
      console.group(`🚨 [BACKEND API Error]${tag}`);
      console.error(`Status: ${error.statusCode}`);
      console.error(`Message: ${error.message}`);
      console.groupEnd();
    } else if (error instanceof Error) {
      console.error(`⚠️ [System Error]${tag}: ${error.message}`);
    } else {
      console.error(`❓ [Unknown Error]${tag}:`, error);
    }
  },
};
