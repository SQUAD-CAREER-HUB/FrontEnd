'use client';

import NotificationHeader from './NotificationHeader';
import NotificationList from './NotificationList';
import { NotificationType } from './NotificationItem';

// 임시 더미 데이터
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'schedule' as NotificationType,
    title: '면접 D-1',
    description: '우아한형제들 - 2차 마케팅 과제 발표 일정이 내일입니다. 준비는 되셨나요?',
    date: '2026. 1. 17. 오후 9:37:42',
    isRead: false,
  },
  {
    id: 2,
    type: 'deadline' as NotificationType,
    title: '서류 마감 D-3',
    description: '라인플러스 - Global SW Engineer 포지션의 서류 마감이 3일 남았습니다.',
    date: '2026. 1. 17. 오전 9:00:00',
    isRead: false,
  },
  {
    id: 3,
    type: 'info' as NotificationType,
    title: 'CareerHub에 오신 것을 환영합니다!',
    description: '성공적인 취업 준비를 위한 첫 걸음을 내딛으셨네요. 지금 바로 새 지원 카드를 생성해보세요.',
    date: '2026. 1. 16. 오후 2:00:00',
    isRead: true,
  },
];

export default function NotificationPage() {
  const handleSettingsClick = () => {
    // TODO: 알림 설정 모달 열기
  };

  const handleMarkAllReadClick = () => {
    // TODO: 모든 알림 읽음 처리
  };

  const handleDeleteAllClick = () => {
    // TODO: 전체 삭제 처리
  };

  const handleNotificationClick = (id: number) => {
    // TODO: 알림 클릭 처리 (읽음 처리 등)
    console.log('clicked', id);
  };

  const handleNotificationDelete = (id: number) => {
    // TODO: 알림 삭제 처리
    console.log('delete', id);
  };

  return (
    <div className="animate-fade-in p-4">
      <NotificationHeader
        onSettingsClick={handleSettingsClick}
        onMarkAllReadClick={handleMarkAllReadClick}
        onDeleteAllClick={handleDeleteAllClick}
      />

      <NotificationList
        notifications={MOCK_NOTIFICATIONS}
        onClick={handleNotificationClick}
        onDelete={handleNotificationDelete}
      />
    </div>
  );
}
