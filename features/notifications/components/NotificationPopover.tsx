'use client';

import {
  Calendar,
  CircleAlert,
  Info,
  Check,
  Settings,
  ChevronRight,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useGetNotifications } from '../hooks/useGetNotifications';
import { useReadNotification } from '../hooks/useReadNotification';
import { useReadAllNotifications } from '../hooks/useReadAllNotifications';
import { useDeleteNotification } from '../hooks/useDeleteNotification';
import { Notification, NotificationType } from '../types/notification';
import { useMemo } from 'react';
import { RelativeTime } from '@/shared/components/RelativeTime';

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case 'INTERVIEW_REMINDER':
    case 'SCHEDULE_REMINDER':
      return <Calendar className='w-5 h-5 text-brand-500' />;
    case 'DOCUMENT_DEADLINE':
      return <CircleAlert className='w-5 h-5 text-red-500' />;
    case 'STATUS_CHANGE':
    default:
      return <Info className='w-5 h-5 text-blue-500' />;
  }
}

interface NotificationPopoverItemProps {
  notification: Notification;
  onRead: (id: number) => void;
  onDelete: (id: number) => void;
}

function NotificationPopoverItem({
  notification,
  onRead,
  onDelete,
}: NotificationPopoverItemProps) {
  const handleClick = () => {
    if (!notification.is_read) {
      onRead(notification.notificationId);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(notification.notificationId);
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group flex gap-3 ${
        notification.is_read
          ? 'opacity-60'
          : 'bg-brand-50/10 dark:bg-brand-900/10'
      }`}
    >
      <div className='mt-0.5 flex-shrink-0'>
        {getNotificationIcon(notification.type)}
      </div>
      <div className='flex-1 min-w-0'>
        <div className='flex justify-between items-start mb-1'>
          <h4
            className={`text-sm font-bold truncate ${
              notification.is_read
                ? 'text-slate-600 dark:text-slate-400'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {notification.title}
          </h4>
          <span className='text-[10px] text-slate-400 whitespace-nowrap ml-2'>
            <RelativeTime date={notification.createdAt} />
          </span>
        </div>
        <p className='text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2'>
          {notification.message}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className='opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all self-center'
      >
        <Trash2 className='w-4 h-4' />
      </button>
    </div>
  );
}

export default function NotificationPopover() {
  const { data } = useGetNotifications(10);
  const { mutate: readNotification } = useReadNotification();
  const { mutate: readAllNotifications } = useReadAllNotifications();
  const { mutate: deleteNotification } = useDeleteNotification();

  const notifications = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.notifications);
  }, [data]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.is_read).length;
  }, [notifications]);

  const handleRead = (id: number) => {
    readNotification(id);
  };

  const handleDelete = (id: number) => {
    deleteNotification(id);
  };

  const handleReadAll = () => {
    readAllNotifications();
  };

  return (
    <div className='bg-white dark:bg-slate-900 rounded-2xl overflow-hidden'>
      {/* Header */}
      <div className='p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50'>
        <h3 className='font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2'>
          알림
          {unreadCount > 0 && (
            <span className='text-xs font-normal text-slate-500 bg-white dark:bg-slate-700 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-600'>
              {unreadCount}
            </span>
          )}
        </h3>
        <div className='flex items-center space-x-1'>
          <button
            onClick={handleReadAll}
            className='p-1.5 text-slate-400 hover:text-brand-500 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors'
            title='모두 읽음'
          >
            <Check className='w-4 h-4' />
          </button>
          <Link
            href='/notifications/settings'
            className='p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors'
            title='설정'
          >
            <Settings className='w-4 h-4' />
          </Link>
        </div>
      </div>

      {/* Notification List */}
      <div className='max-h-[350px] overflow-y-auto'>
        {notifications.length === 0 ? (
          <div className='p-8 text-center text-slate-400 text-sm'>
            알림이 없습니다
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationPopoverItem
              key={notification.notificationId}
              notification={notification}
              onRead={handleRead}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {/* Footer */}
      <div className='p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30'>
        <Link
          href='/notifications'
          className='w-full py-2 text-xs font-bold text-slate-500 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center'
        >
          알림 전체 보기
          <ChevronRight className='w-3 h-3 ml-1' />
        </Link>
      </div>
    </div>
  );
}
