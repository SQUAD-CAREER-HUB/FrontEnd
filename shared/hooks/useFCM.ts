'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  getFCMToken,
  setupForegroundMessageListener,
} from '@/shared/lib/firebase';
import { useRegisterFCMToken } from '@/features/notifications/hooks/useRegisterFCMToken';

export interface FCMMessage {
  collapseKey?: string;
  messageId?: string;
  from?: string;
  data?: {
    title?: string;
    body?: string;
    linkUrl?: string;
  };
}

interface UseFCMOptions {
  onMessage?: (message: FCMMessage) => void;
  onTokenChange?: (token: string) => void;
  autoRegister?: boolean;
}

interface UseFCMReturn {
  token: string | null;
  permission: NotificationPermission | null;
  isLoading: boolean;
  error: Error | null;
  isRegistering: boolean;
  requestPermissionAndToken: () => Promise<string | null>;
}

export function useFCM(options: UseFCMOptions = {}): UseFCMReturn {
  const { onMessage, onTokenChange, autoRegister = true } = options;

  const [token, setToken] = useState<string | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 최신 콜백 참조 유지
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  const { mutate: registerToken, isPending: isRegistering } = useRegisterFCMToken();

  // FCM 토큰 발급 요청
  const requestPermissionAndToken = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const newToken = await getFCMToken();

      if (newToken) {
        setToken(newToken);
        setPermission('granted');
        onTokenChange?.(newToken);

        // 서버에 토큰 등록
        if (autoRegister) {
          registerToken(newToken);
        }

        return newToken;
      } else {
        const currentPermission = Notification.permission;
        setPermission(currentPermission);
        return null;
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('FCM 토큰 발급 실패');
      setError(error);
      console.error('FCM 토큰 발급 에러:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [onTokenChange, autoRegister, registerToken]);

  // 포그라운드 메시지 리스너 설정
  useEffect(() => {
    if (!token) return;

    console.log('[useFCM] 포그라운드 메시지 리스너 설정');
    const unsubscribe = setupForegroundMessageListener((payload) => {
      console.log('[useFCM] 메시지 수신:', payload);
      onMessageRef.current?.(payload);
    });

    return () => {
      console.log('[useFCM] 포그라운드 메시지 리스너 해제');
      unsubscribe?.();
    };
  }, [token]);

  // 초기 권한 상태 확인
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  return {
    token,
    permission,
    isLoading,
    error,
    isRegistering,
    requestPermissionAndToken,
  };
}
