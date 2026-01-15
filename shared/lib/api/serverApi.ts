import { cookies } from 'next/headers';
import { ENV } from '@/shared/constants/env';
import { setAuthSession } from '@/features/login/server-actions/auth'; // 쿠키 설정을 위해 기존 서버 액션 재사용

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
export async function serverApi(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const cookieStore = await cookies();
  const backendUrl = `${ENV.BACKEND_API_URL}${path}`;
  const accessToken = cookieStore.get('access_token')?.value;
  const headers = new Headers(options.headers);

  // FormData 전송 시 브라우저가 자동으로 경계값(Boundary)을 설정하도록 Content-Type 수동 설정을 피함
  if (!(options.body instanceof FormData)) {
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

  /**
   * [왜 response.json()을 여기서 호출하지 않나요?]
   * * 1. 응답 유연성 유지:
   * 이 함수는 공통 API 래퍼입니다. 어떤 API는 JSON을 반환하지만, 어떤 API는 이미지(Blob),
   * 텍스트, 혹은 204 No Content(빈 응답)를 반환합니다.
   * 여기서 .json()을 해버리면 JSON이 아닌 응답에서 파싱 에러가 발생합니다.
   * * 2. BFF 프록시로의 원본 전달:
   * BFF(Next.js Route Handler)는 백엔드에서 받은 상태 코드, 헤더, 원본 본문을
   * 그대로 클라이언트에 전달해야 합니다. 파싱되지 않은 'Response' 객체를 넘겨야
   * BFF가 .text()나 .status 등을 자유롭게 활용하여 가공할 수 있습니다.
   * * 3. 이중 파싱 방지 (성능):
   * 여기서 .json()을 하고 다시 BFF에서 NextResponse.json()을 하면
   * [문자열 -> 객체 -> 문자열]의 불필요한 직렬화 과정이 반복됩니다.
   */
  return response;
}
