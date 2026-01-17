'use client';

import NotificationItem, { NotificationItemProps } from './NotificationItem';

interface NotificationListProps {
  notifications: Omit<NotificationItemProps, 'onDelete' | 'onClick'>[];
  onDelete?: (id: number) => void;
  onClick?: (id: number) => void;
}

export default function NotificationList({
  notifications,
  onDelete,
  onClick,
}: NotificationListProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden min-h-[400px]">
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            {...notification}
            onDelete={onDelete}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
}
