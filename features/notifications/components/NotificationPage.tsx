'use client';

import { useRouter } from 'next/navigation';
import NotificationHeader from './NotificationHeader';
import NotificationList from './NotificationList';
import { useGetNotifications } from '../hooks/useGetNotifications';
import { useReadAllNotifications } from '../hooks/useReadAllNotifications';
import { useTestNotification } from '../hooks/useTestNotification';

export default function NotificationPage() {
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetNotifications();
  const { mutate: readAllNotifications } = useReadAllNotifications();
  const { mutate: testNotification } = useTestNotification();

  const notifications = data?.pages.flatMap((page) => page.notifications) ?? [];

  const handleSettingsClick = () => {
    router.push('/notifications/settings');
  };

  const handleMarkAllReadClick = () => {
    readAllNotifications();
  };

  const handleDeleteAllClick = () => {
    // TODO: 전체 삭제 API 연동 후 교체
    testNotification();
  };

  if (isLoading) {
    return (
      <div className="animate-fade-in p-4">
        <NotificationHeader
          onSettingsClick={handleSettingsClick}
          onMarkAllReadClick={handleMarkAllReadClick}
          onDeleteAllClick={handleDeleteAllClick}
        />
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm min-h-[400px] flex items-center justify-center">
          <div className="text-slate-500">알림을 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="animate-fade-in p-4">
        <NotificationHeader
          onSettingsClick={handleSettingsClick}
          onMarkAllReadClick={handleMarkAllReadClick}
          onDeleteAllClick={handleDeleteAllClick}
        />
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm min-h-[400px] flex items-center justify-center">
          <div className="text-red-500">알림을 불러오는데 실패했습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in p-4">
      <NotificationHeader
        onSettingsClick={handleSettingsClick}
        onMarkAllReadClick={handleMarkAllReadClick}
        onDeleteAllClick={handleDeleteAllClick}
      />

      <NotificationList
        notifications={notifications}
        onLoadMore={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
