import { cookies } from 'next/headers';
import { ENV } from '@/shared/constants/env';
import { setAuthSession } from '@/features/login/server-actions/auth';

/**
 * 전역 상태 관리를 통한 동시성 제어
 * 여러 요청이 동시에 401 에러를 받을 경우, 토큰 재발급 API를 한 번만 호출하기 위함입니다.
 */
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

/**
 * [RefreshTokenFlow]
 * 리프레시 토큰을 사용하여 새로운 액세스 토큰을 발급받고 쿠키를 갱신합니다.
 */
async function refreshTokenFlow(): Promise<string> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  // 리프레시 토큰 부재 시 즉시 세션 종료
  if (!refreshToken) {
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    throw new Error('No refresh token available.');
  }

  // 백엔드에 토큰 재발급 요청
  const refreshRes = await fetch(`${ENV.BACKEND_API_URL}/v1/auth/reissue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  // 재발급 실패 처리 (리프레시 토큰 만료 등)
  if (!refreshRes.ok) {
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    throw new Error('Session expired. Please log in again.');
  }

  // 새로운 토큰 저장 및 쿠키 업데이트 (Server Action 활용)
  const { accessToken: newAccess, refreshToken: newRefresh } =
    await refreshRes.json();
  await setAuthSession(newAccess, newRefresh);

  return newAccess;
}

/**
 * [ServerApi]
 * 서버 사이드 전용 Fetch 래퍼 함수입니다.
 * 인증 헤더 자동 주입 및 401 에러 시 토큰 자동 재발급(Silent Refresh)을 수행합니다.
 */
export async function serverApi<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const backendUrl = `${ENV.BACKEND_API_URL}${path}`;
  const accessToken = cookieStore.get('access_token')?.value;
  const headers = new Headers(options.headers);

  // FormData/Blob인 경우 Content-Type을 설정하지 않음 (브라우저가 자동 설정)
  const isFormData = options.body instanceof Blob || options.body instanceof FormData;
  
  if (!isFormData && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  // 액세스 토큰이 존재할 경우 인증 헤더 주입
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  // 1차 요청 수행
  let response = await fetch(backendUrl, {
    ...options,
    headers,
  });

  /**
   * 401 Unauthorized 에러 발생 시 토큰 재발급 로직 진입
   */
  if (response.status === 401) {
    // [동시성 처리] 리프레시가 진행 중이 아니라면 재발급 프로세스 시작
    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshTokenFlow().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    try {
      // 진행 중인(혹은 방금 시작된) 재발급 작업이 완료될 때까지 모든 401 요청들이 대기함
      const newAccessToken = await refreshPromise;
      if (newAccessToken) {
        // 새 토큰으로 헤더를 교체하고 2차 재요청 수행
        headers.set('Authorization', `Bearer ${newAccessToken}`);
        response = await fetch(backendUrl, { ...options, headers });
      }
    } catch (error) {
      // 재발급 프로세스 중 에러(토큰 만료 등) 발생 시 에러 전달
      throw error;
    }
  }

  // HTTP 에러 응답 처리
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`
    );
  }

  // 응답 본문이 비어있는 경우 (204 No Content 등) 빈 객체 반환
  const contentLength = response.headers.get('content-length');
  if (contentLength === '0') {
    return {} as T;
  }

  // 응답 본문이 있는지 text로 먼저 확인 후 파싱
  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}