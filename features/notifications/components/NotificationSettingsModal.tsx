'use client';

import { BellRing, X, Calendar, Clock, FileText, Smartphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFCM } from '@/shared/hooks/useFCM';
import { ToggleSwitch } from '@/shared/components/ui/toggle-switch';
import { SettingItem } from './SettingItem';

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

  const getPushStatusMessage = () => {
    if (isPushDenied) return '브라우저 설정에서 알림을 허용해주세요';
    if (isPushEnabled) return '푸시 알림이 활성화되었습니다';
    return '알림을 받으려면 허용해주세요';
  };

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
          <div className="bg-brand-50 dark:bg-brand-900/20 p-5 rounded-xl border border-brand-200 dark:border-brand-800">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-brand-500" />
                <div>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    푸시 알림 허용
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {getPushStatusMessage()}
                  </p>
                </div>
              </div>
              <ToggleSwitch
                enabled={isPushEnabled}
                onChange={handlePushToggle}
                disabled={isLoading || isRegistering || isPushDenied}
              />
            </div>
          </div>

          {/* 채용 공고 마감일 알림 */}
          <section className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-slate-400" />
              채용 공고 마감일 알림
            </h3>
            <div className="space-y-3">
              <SettingItem
                label="마감 7일 전"
                enabled={deadlineSettings.sevenDays}
                onChange={(v) => setDeadlineSettings((s) => ({ ...s, sevenDays: v }))}
              />
              <SettingItem
                label="마감 3일 전"
                enabled={deadlineSettings.threeDays}
                onChange={(v) => setDeadlineSettings((s) => ({ ...s, threeDays: v }))}
              />
              <SettingItem
                label="마감 1일 전 (D-1)"
                enabled={deadlineSettings.oneDay}
                onChange={(v) => setDeadlineSettings((s) => ({ ...s, oneDay: v }))}
              />
            </div>
          </section>

          {/* 면접 일정 알림 */}
          <section className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-slate-400" />
              면접 일정 알림
            </h3>
            <div className="space-y-3">
              <SettingItem
                label="면접 3일 전"
                enabled={interviewSettings.threeDays}
                onChange={(v) => setInterviewSettings((s) => ({ ...s, threeDays: v }))}
              />
              <SettingItem
                label="면접 1일 전 (D-1)"
                enabled={interviewSettings.oneDay}
                onChange={(v) => setInterviewSettings((s) => ({ ...s, oneDay: v }))}
              />
              <SettingItem
                label="면접 당일 오전 9시"
                enabled={interviewSettings.morning}
                onChange={(v) => setInterviewSettings((s) => ({ ...s, morning: v }))}
              />
              <SettingItem
                label="면접 1시간 전"
                enabled={interviewSettings.oneHour}
                onChange={(v) => setInterviewSettings((s) => ({ ...s, oneHour: v }))}
              />
            </div>
          </section>

          {/* 기타 전형 알림 */}
          <section className="bg-slate-50 dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700">
            <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2 text-slate-400" />
              기타 전형 알림 (코딩테스트/과제 등)
            </h3>
            <div className="space-y-3">
              <SettingItem
                label="전형 3일 전"
                enabled={etcSettings.threeDays}
                onChange={(v) => setEtcSettings((s) => ({ ...s, threeDays: v }))}
              />
              <SettingItem
                label="전형 1일 전 (D-1)"
                enabled={etcSettings.oneDay}
                onChange={(v) => setEtcSettings((s) => ({ ...s, oneDay: v }))}
              />
              <SettingItem
                label="전형 당일 오전 9시"
                enabled={etcSettings.morning}
                onChange={(v) => setEtcSettings((s) => ({ ...s, morning: v }))}
              />
            </div>
          </section>
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
