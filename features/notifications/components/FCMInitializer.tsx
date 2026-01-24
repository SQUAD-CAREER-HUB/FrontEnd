'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useFCM, type FCMMessage } from '@/shared/hooks/useFCM';
import { toast } from 'sonner';

export default function FCMInitializer() {
  const hasRequested = useRef(false);

  const handleMessage = useCallback((message: FCMMessage) => {
    // 포그라운드에서 알림 수신 시 토스트로 표시
    if (message.data) {
      toast(message.data.title || '새 알림', {
        description: message.data.body,
      });
    }
  }, []);

  const { permission, requestPermissionAndToken } = useFCM({
    onMessage: handleMessage,
  });

  useEffect(() => {
    // 이미 요청했거나, 권한이 denied면 재요청 안 함
    if (hasRequested.current || permission === 'denied') {
      return;
    }

    // 권한이 아직 결정되지 않은 경우에만 자동 요청
    if (permission === 'default') {
      hasRequested.current = true;
      // 약간의 딜레이 후 요청 (UX 개선)
      const timer = setTimeout(() => {
        requestPermissionAndToken();
      }, 2000);

      return () => clearTimeout(timer);
    }

    // 이미 granted인 경우 토큰만 갱신
    if (permission === 'granted') {
      hasRequested.current = true;
      requestPermissionAndToken();
    }
  }, [permission, requestPermissionAndToken]);

  return null;
}
