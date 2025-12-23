export async function initMsw() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // 브라우저
  if (typeof window !== 'undefined') {
    const { worker } = await import('@/mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
    return;
  }

  // 서버 (Next.js server-side 대응)
  const { server } = await import('@/mocks/server');
  server.listen({
    onUnhandledRequest: 'bypass',
  });
}
