'use client';

import { useEffect } from 'react';
import { setAuthSession } from '@/features/login/server-actions/auth';
import { useRouter } from 'next/navigation';

/**
 * URL의 인증 토큰을 브라우저 세션(쿠키)으로 동기화하는 컴포넌트입니다.
 */
export default function AuthInitializer({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    // 서버 액션을 통해 쿠키 저장 및 리다이렉트 수행
    const initialize = async () => {
      try {
        // 1. 서버 액션으로 쿠키 저장 (await로 확실히 기다림)
        await setAuthSession(accessToken, refreshToken);

        router.replace('/dashboard');
      } catch (error) {
        console.error('인증 초기화 중 에러 발생:', error);
        router.replace('/login'); // 에러 시 로그인 페이지로 후퇴
      }
    };

    if (accessToken) {
      initialize();
    }
  }, [accessToken, refreshToken, router]);

  return (
    <div className='fixed inset-0 bg-white/80 flex items-center justify-center z-50'>
      <p className='font-bold'>로그인 정보를 확인 중입니다...</p>
    </div>
  );
}
