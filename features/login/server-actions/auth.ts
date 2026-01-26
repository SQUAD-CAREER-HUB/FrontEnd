'use server';

import { serverApi } from '@/shared/lib/api/serverApi';
import { cookies } from 'next/headers';

/**
 * 소셜 로그인 성공 후 전달받은 토큰을 서버 사이드에서 보안 쿠키에 저장
 */
export async function loginAction(accessToken: string, refreshToken?: string) {
  try {
    const cookieStore = await cookies();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    cookieStore.set('access_token', accessToken, {
      ...cookieOptions,
      maxAge: 60 * 60 * 24,
    });

    if (refreshToken) {
      cookieStore.set('refresh_token', refreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    // 성공했음을 명시적으로 알림
    return { success: true };
  } catch (error) {
    console.error('Login Action Error:', error);
    return { success: false, error: '쿠키 저장 실패' };
  }
}

/**
 * 로그아웃 처리: 백엔드 세션 종료 요청 및 브라우저 쿠키 삭제
 * Next.js 서버 액션으로 구현되어, 클라이언트에서 호출 시 자동으로 서버 사이드에서 실행
 */
export async function logoutAction() {
  try {
    // 백엔드에 요청을 보내 세션 종료 요청
    await serverApi('/v1/auth/logout', { method: 'POST' });
  } catch (error) {
    console.error('백엔드 세션 종료 실패:', error);
  }

  // 백엔드 통신 성공 여부와 상관없이 내 브라우저의 쿠키를 지워 로그아웃 처리
  const cookieStore = await cookies();
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
}
