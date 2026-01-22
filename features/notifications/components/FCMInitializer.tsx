'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useFCM, type FCMMessage } from '@/shared/hooks/useFCM';
import { toast } from 'sonner';
import { isIOS, isWebPushSupported } from '@/shared/lib/deviceDetect';
import NotificationPermissionModal from './NotificationPermissionModal';

const NOTIFICATION_MODAL_DISMISSED_KEY = 'notification_modal_dismissed';

export default function FCMInitializer() {
  const hasRequested = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);

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

  // iOS 감지 (클라이언트에서만)
  useEffect(() => {
    setIsIOSDevice(isIOS());
  }, []);

  useEffect(() => {
    // 이미 요청했거나, 권한이 denied면 재요청 안 함
    if (hasRequested.current || permission === 'denied') {
      return;
    }

    // 웹 푸시가 지원되지 않는 환경이면 종료
    if (!isWebPushSupported()) {
      return;
    }

    // 권한이 아직 결정되지 않은 경우
    if (permission === 'default') {
      hasRequested.current = true;

      // iOS: 모달을 통해 사용자 제스처로 권한 요청
      if (isIOSDevice) {
        const dismissed = localStorage.getItem(NOTIFICATION_MODAL_DISMISSED_KEY);
        if (!dismissed) {
          const timer = setTimeout(() => {
            setShowModal(true);
          }, 1500);
          return () => clearTimeout(timer);
        }
      } else {
        // iOS 외: 기존 로직 (자동 요청)
        const timer = setTimeout(() => {
          requestPermissionAndToken();
        }, 2000);
        return () => clearTimeout(timer);
      }
    }

    // 이미 granted인 경우 토큰만 갱신
    if (permission === 'granted') {
      hasRequested.current = true;
      requestPermissionAndToken();
    }
  }, [permission, requestPermissionAndToken, isIOSDevice]);

  const handleAllowNotification = () => {
    // 사용자 클릭 이벤트 내에서 권한 요청 (iOS 필수)
    requestPermissionAndToken();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem(NOTIFICATION_MODAL_DISMISSED_KEY, 'true');
  };

  return (
    <NotificationPermissionModal
      isOpen={showModal}
      onClose={handleCloseModal}
      onAllow={handleAllowNotification}
    />
  );
}
