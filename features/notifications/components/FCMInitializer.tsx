'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { useFCM, type FCMMessage } from '@/shared/hooks/useFCM';
import { toast } from 'sonner';
import { isIOS, isStandalone, isWebPushSupported } from '@/shared/lib/deviceDetect';
import NotificationPermissionModal from './NotificationPermissionModal';

const NOTIFICATION_MODAL_DISMISSED_KEY = 'notification_modal_dismissed';
const NOTIFICATION_DENIED_MODAL_SHOWN_KEY = 'notification_denied_modal_shown';

export default function FCMInitializer() {
  const hasRequested = useRef(false);
  const [showModal, setShowModal] = useState(false);
  const [isIOSDevice, setIsIOSDevice] = useState(false);
  const [isIOSPWA, setIsIOSPWA] = useState(false);
  const [isDenied, setIsDenied] = useState(false);

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

  // iOS 및 PWA 감지 (클라이언트에서만)
  useEffect(() => {
    const iosDevice = isIOS();
    setIsIOSDevice(iosDevice);
    setIsIOSPWA(iosDevice && isStandalone());
  }, []);

  useEffect(() => {
    if (hasRequested.current) {
      return;
    }

    // iOS Safari (PWA 아님): 모달을 띄워 PWA 설치 안내
    if (isIOSDevice && !isIOSPWA) {
      const dismissed = localStorage.getItem(NOTIFICATION_MODAL_DISMISSED_KEY);
      if (!dismissed) {
        hasRequested.current = true;
        const timer = setTimeout(() => {
          setShowModal(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
      return;
    }

    // 웹 푸시가 지원되지 않는 환경이면 종료 (iOS Safari 제외)
    if (!isWebPushSupported()) {
      return;
    }

    // 권한이 denied인 경우: 한 번만 모달 표시 (설정 안내)
    console.log(permission);
    if (permission === 'denied') {
      const deniedShown = localStorage.getItem(NOTIFICATION_DENIED_MODAL_SHOWN_KEY);
      if (!deniedShown) {
        hasRequested.current = true;
        const timer = setTimeout(() => {
          setIsDenied(true);
          setShowModal(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
      return;
    }

    // 권한이 아직 결정되지 않은 경우: 모달을 통해 권한 요청
    if (permission === 'default') {
      const dismissed = localStorage.getItem(NOTIFICATION_MODAL_DISMISSED_KEY);
      if (!dismissed) {
        hasRequested.current = true;
        const timer = setTimeout(() => {
          setShowModal(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }

    // 이미 granted인 경우 토큰만 갱신
    if (permission === 'granted') {
      hasRequested.current = true;
      requestPermissionAndToken();
    }
  }, [permission, requestPermissionAndToken, isIOSDevice, isIOSPWA]);

  const handleAllowNotification = () => {
    // 사용자 클릭 이벤트 내에서 권한 요청 (iOS 필수)
    requestPermissionAndToken();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (isDenied) {
      localStorage.setItem(NOTIFICATION_DENIED_MODAL_SHOWN_KEY, 'true');
    } else {
      localStorage.setItem(NOTIFICATION_MODAL_DISMISSED_KEY, 'true');
    }
  };

  return (
    <NotificationPermissionModal
      isOpen={showModal}
      onClose={handleCloseModal}
      onAllow={handleAllowNotification}
      isIOSSafari={isIOSDevice && !isIOSPWA}
      isDenied={isDenied}
    />
  );
}
