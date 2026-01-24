'use client';

import { Bell, Settings, CircleCheck, Trash2 } from 'lucide-react';

interface NotificationHeaderProps {
  onSettingsClick?: () => void;
  onMarkAllReadClick?: () => void;
  onDeleteAllClick?: () => void;
}

export default function NotificationHeader({
  onSettingsClick,
  onMarkAllReadClick,
  onDeleteAllClick,
}: NotificationHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-brand-500" />
          알림 센터
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          모든 알림을 확인하고 관리할 수 있습니다.
        </p>
      </div>

      <div className="flex space-x-2 md:space-x-3">
        <button
          onClick={onSettingsClick}
          className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center text-sm shadow-sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">알림 설정</span>
          <span className="sm:hidden">설정</span>
        </button>

        <button
          onClick={onMarkAllReadClick}
          className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center text-sm shadow-sm"
        >
          <CircleCheck className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">모두 읽음</span>
          <span className="sm:hidden">읽음</span>
        </button>

        <button
          onClick={onDeleteAllClick}
          className="px-3 py-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center text-sm"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">전체 삭제</span>
          <span className="sm:hidden">삭제</span>
        </button>
      </div>
    </div>
  );
}
