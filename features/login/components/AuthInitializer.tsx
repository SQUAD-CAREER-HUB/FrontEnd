'use client';

import { useEffect, useState } from 'react';
import { loginAction } from '@/features/login/server-actions/auth';
import { useRouter } from 'next/navigation';
import Logo from '@/assets/career-hub-only-icon.png';
import Image from 'next/image';

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
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('인증 정보 확인 중...');

  useEffect(() => {
    const initialize = async () => {
      try {
        // 1단계: 초기 진입 (10%)
        setProgress(10);
        await new Promise((res) => setTimeout(res, 300)); // 시각적 피드백을 위한 미세 지연

        // 2단계: 서버 액션 호출 시작 (30%)
        setStatusText('보안 세션 생성 중...');
        setProgress(30);

        // 실제 서버 통신
        const result = await loginAction(accessToken, refreshToken);

        if (result?.success) {
          setStatusText('로그인 완료! 대시보드로 이동합니다.');
          setProgress(80);

          setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
              router.replace('/dashboard');
            }, 200);
          }, 100);
        } else {
          // 서버에서 success: false를 보낸 경우
          throw new Error(result?.error || '알 수 없는 에러');
        }
      } catch (error) {
        console.log('🚀 ~ initialize ~ error:', error);
        setProgress(0);
        setStatusText('인증에 실패했습니다.');
        router.replace('/login');
      }
    };

    if (accessToken) {
      initialize();
    }
  }, [accessToken, refreshToken, router]);

  return (
    <div
      role='dialog' // 현재 화면이 대화상자임을 명시
      aria-modal='true' // 모달임을 브라우저에 알림
      aria-labelledby='auth-status' // 현재 상태 텍스트와 연결
      className='fixed inset-0 bg-white dark:bg-slate-950 flex flex-col items-center justify-center z-60'
    >
      <div className='relative flex flex-col items-center gap-8'>
        {/* 로고 펄스 애니메이션 */}
        <div className='relative animate-pulse'>
          <Image
            src={Logo}
            alt='Logo'
            width={200}
            priority
            className='opacity-80'
          />
        </div>

        {/* 하단 로딩 바 */}
        <div className='relative h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden'>
          <div
            className='h-full bg-brand-500 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(var(--brand-rgb),0.4)]'
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 상태 텍스트 및 퍼센트 */}
        <div
          id='auth-status'
          className='flex justify-between items-end font-bold'
        >
          <div className='flex flex-col gap-1'>
            <span className='text-[10px] text-brand-500 uppercase tracking-widest animate-pulse'>
              System Status
            </span>
            <span className='text-sm text-slate-600 dark:text-slate-300 transition-all'>
              {statusText}
            </span>
          </div>
          <span className='text-2xl text-slate-900 dark:text-white tabular-nums'>
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
