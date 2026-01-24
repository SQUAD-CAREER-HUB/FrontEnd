'use client';

import { BellRing, X, Calendar, Clock, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFCM } from '@/shared/hooks/useFCM';
import PushNotificationSection from './PushNotificationSection';
import SettingsSection from './SettingsSection';

interface NotificationSettingsModalProps {
  onClose?: () => void;
}

export default function NotificationSettingsModal({ onClose }: NotificationSettingsModalProps) {
  const router = useRouter();
  const { permission, isLoading, isRegistering, requestPermissionAndToken } = useFCM();

  const isPushEnabled = permission === 'granted';
  const isPushDenied = permission === 'denied';

  const [deadlineSettings, setDeadlineSettings] = useState({
    sevenDays: true,
    threeDays: true,
    oneDay: true,
  });

  const [interviewSettings, setInterviewSettings] = useState({
    threeDays: true,
    oneDay: true,
    morning: true,
    oneHour: true,
  });

  const [etcSettings, setEtcSettings] = useState({
    threeDays: true,
    oneDay: true,
    morning: true,
  });

  const handlePushToggle = async (enabled: boolean) => {
    if (enabled && permission !== 'granted') {
      await requestPermissionAndToken();
    }
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const handleSave = () => {
    // TODO: 설정 저장 로직
    handleClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const deadlineSettingsOptions = [
    { key: 'sevenDays', label: '마감 7일 전', enabled: deadlineSettings.sevenDays },
    { key: 'threeDays', label: '마감 3일 전', enabled: deadlineSettings.threeDays },
    { key: 'oneDay', label: '마감 1일 전 (D-1)', enabled: deadlineSettings.oneDay },
  ];

  const interviewSettingsOptions = [
    { key: 'threeDays', label: '면접 3일 전', enabled: interviewSettings.threeDays },
    { key: 'oneDay', label: '면접 1일 전 (D-1)', enabled: interviewSettings.oneDay },
    { key: 'morning', label: '면접 당일 오전 9시', enabled: interviewSettings.morning },
    { key: 'oneHour', label: '면접 1시간 전', enabled: interviewSettings.oneHour },
  ];

  const etcSettingsOptions = [
    { key: 'threeDays', label: '전형 3일 전', enabled: etcSettings.threeDays },
    { key: 'oneDay', label: '전형 1일 전 (D-1)', enabled: etcSettings.oneDay },
    { key: 'morning', label: '전형 당일 오전 9시', enabled: etcSettings.morning },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl p-6 shadow-2xl animate-fade-in-up">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-brand-500" />
            알림 설정
          </h2>
          <button onClick={handleClose}>
            <X className="w-5 h-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300" />
          </button>
        </div>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
          {/* 푸시 알림 허용 */}
          <PushNotificationSection
            isPushEnabled={isPushEnabled}
            isPushDenied={isPushDenied}
            isLoading={isLoading}
            isRegistering={isRegistering}
            onToggle={handlePushToggle}
          />

          {/* 채용 공고 마감일 알림 */}
          <SettingsSection
            icon={Calendar}
            title="채용 공고 마감일 알림"
            settings={deadlineSettingsOptions}
            onSettingChange={(key, v) => setDeadlineSettings((s) => ({ ...s, [key]: v }))}
          />

          {/* 면접 일정 알림 */}
          <SettingsSection
            icon={Clock}
            title="면접 일정 알림"
            settings={interviewSettingsOptions}
            onSettingChange={(key, v) => setInterviewSettings((s) => ({ ...s, [key]: v }))}
          />

          {/* 기타 전형 알림 */}
          <SettingsSection
            icon={FileText}
            title="기타 전형 알림 (코딩테스트/과제 등)"
            settings={etcSettingsOptions}
            onSettingChange={(key, v) => setEtcSettings((s) => ({ ...s, [key]: v }))}
          />
        </div>

        {/* 푸터 버튼 */}
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 shadow-md transition-all"
          >
            설정 저장
          </button>
        </div>
      </div>
    </div>
  );
}
