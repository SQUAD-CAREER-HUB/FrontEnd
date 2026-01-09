'use server';

import { cookies } from 'next/headers';

/**
 * 소셜 로그인 성공 후 전달받은 토큰을 보안 쿠키에 저장하고
 * 대시보드로 사용자를 안내합니다.
 */
export async function setAuthSession(
  accessToken: string,
  refreshToken?: string
) {
  const cookieStore = await cookies();

  // 쿠키 옵션 공통 설정
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };

  // 1. Access Token 저장 (1일)
  cookieStore.set('access_token', accessToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24,
  });

  // 2. Refresh Token 저장 (7일)
  if (refreshToken) {
    cookieStore.set('refresh_token', refreshToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24 * 7,
    });
  }
}
