'use client';

import { useEffect, useState } from 'react';

/**
 * MswProvider: 클라이언트 사이드(브라우저)에서 MSW 서비스 워커를 초기화하는 컴포넌트입니다.
 * RootLayout에서 앱 전체를 감싸는 형태로 사용됩니다.
 */
export default function MswProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // MSW 서비스 워커가 준비되었는지 확인하는 상태입니다.
  // 준비가 되기 전까지 children 렌더링을 지연시켜 실제 API가 백엔드로 새나가는 것을 방지합니다.
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const isMswEnabled = process.env.NEXT_PUBLIC_MSW_ENABLED === 'true';

    // 1. 개발 환경이고 MSW 활성화 플래그가 켜져 있을 때만 브라우저 워커 실행
    if (isDev && isMswEnabled) {
      const startWorker = async () => {
        // dynamic import를 사용하여 클라이언트 사이드에서만 browser 관련 파일 로드
        const { worker } = await import('@/mocks/browser');

        await worker.start({
          onUnhandledRequest: 'bypass', // 모킹되지 않은 요청은 실제 네트워크로 통과
        });

        setIsReady(true);
      };

      startWorker();
    } else {
      // MSW를 사용하지 않는 환경(운영 등)에서는 즉시 자식 컴포넌트 렌더링
      setIsReady(true);
    }
  }, []);

  // 2. 워커가 준비되기 전에는 자식 컴포넌트(API 호출이 포함된)를 렌더링하지 않음
  // 이렇게 해야 첫 렌더링 시 발생하는 API 요청이 모킹되지 않고 백엔드로 날아가는 것을 방지합니다.
  if (!isReady) {
    return null; // 또는 가벼운 스켈레톤/로딩 UI
  }

  return <>{children}</>;
}
