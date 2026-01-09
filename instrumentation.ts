export async function register() {
  // 1. 서버 사이드(Node.js) 환경에서만 실행되도록 제한
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;

  // 2. 개발 환경 및 MSW 활성화 여부 확인
  const isDev = process.env.NODE_ENV === 'development';
  const isMswEnabled = process.env.NEXT_PUBLIC_MSW_ENABLED === 'true';

  if (isDev && isMswEnabled) {
    /**
     * 서버 사이드 모킹 (BFF 및 서버 컴포넌트 fetch 대응)
     * instrumentation은 서버 부팅 시점에 실행되므로 window 체크가 필요 없습니다.
     */
    const { server } = await import('./mocks/server');

    server.listen({
      onUnhandledRequest: 'bypass', // 모킹되지 않은 요청은 실제 네트워크로 보냄
    });

    console.log('🛠️ [Server] MSW Mocking 활성화 (BFF 대응)');
  } else {
    console.log('🌐 실제 백엔드 서버를 사용합니다.');
  }
}
