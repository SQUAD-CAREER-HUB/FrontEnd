import { cookies } from 'next/headers';
import { ENV } from '@/shared/constants/env';
import { setAuthSession } from '@/features/login/server-actions/auth'; // 쿠키 설정을 위해 기존 서버 액션 재사용

// 동시 요청 제어를 위한 변수 (모듈 스코프에 위치)
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// 재발급 로직을 별도 함수로 분리
async function refreshTokenFlow(): Promise<string> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    console.error('Debug: No refresh token found in cookies.');
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    throw new Error('No refresh token available.');
  }

  console.log('Debug: Attempting token refresh with token:', refreshToken);

  const refreshRes = await fetch(`${ENV.BACKEND_API_URL}/v1/auth/reissue`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!refreshRes.ok) {
    const errorBody = await refreshRes.text(); // JSON이 아닐 수 있으니 text()로 읽습니다.
    console.error('--- TOKEN REFRESH FAILED ---');
    console.error('Status:', refreshRes.status, refreshRes.statusText);
    console.error('Backend Response Body:', errorBody);
    console.error('-----------------------------');

    // 리프레시 실패 시 쿠키 삭제
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    throw new Error('Session expired. Please log in again.');
  }

  const { accessToken: newAccess, refreshToken: newRefresh } =
    await refreshRes.json();
  console.log('Debug: Token refresh successful.');

  // 서버 액션을 사용하여 쿠키를 일관성 있게 설정
  await setAuthSession(newAccess, newRefresh);

  return newAccess;
}

export async function serverApi<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const cookieStore = await cookies();
  const backendUrl = `${ENV.BACKEND_API_URL}${path}`;

  const accessToken = cookieStore.get('access_token')?.value;
  const headers = new Headers(options.headers);
  // Content-Type이 전달되지 않은 경우에만 기본값 설정 (multipart/form-data 유지를 위해)
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let response = await fetch(backendUrl, {
    ...options,
    headers,
    redirect: 'manual',
  });

  console.log(
    `Debug: Initial fetch to ${path} completed with status:`,
    response.status
  );

  if (response.status === 401) {
    if (!isRefreshing) {
      // 첫 번째 요청이 리프레시 로직을 실행하고, Promise를 할당
      isRefreshing = true;
      refreshPromise = refreshTokenFlow().finally(() => {
        isRefreshing = false;
        refreshPromise = null;
      });
    }

    try {
      // 후속 요청들은 진행중인 리프레시 Promise가 끝나기를 기다림
      const newAccessToken = await refreshPromise;
      headers.set('Authorization', `Bearer ${newAccessToken}`);
      // 재요청
      response = await fetch(backendUrl, { ...options, headers });
    } catch (error) {
      // 리프레시 자체가 실패한 경우 (세션 만료 등)
      // 에러를 그대로 던져서 최종 에러 처리 로직으로 전달
      throw error;
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    // 백엔드 에러 메시지를 우선적으로 사용
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
