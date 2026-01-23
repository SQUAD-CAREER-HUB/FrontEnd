'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Bell, Calendar, FileText, Clock, Share, PlusSquare, Settings, BellOff } from 'lucide-react';

interface NotificationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => void;
  isIOSSafari?: boolean;
  isDenied?: boolean;
}

export default function NotificationPermissionModal({
  isOpen,
  onClose,
  onAllow,
  isIOSSafari = false,
  isDenied = false,
}: NotificationPermissionModalProps) {
  const handleAllow = () => {
    onAllow();
    onClose();
  };
  console.log(isDenied, isIOSSafari);
  // 알림이 차단된 경우: 설정 안내
  if (isDenied) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
              <BellOff className="w-8 h-8 text-red-500" />
            </div>
            <DialogTitle className="text-xl">알림이 차단되어 있습니다</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              중요한 일정 알림을 받으려면 브라우저 설정에서 알림을 허용해주세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                알림 허용하는 방법
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center shrink-0">
                  <Settings className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  1. 브라우저 주소창 왼쪽의 <strong>자물쇠</strong> 아이콘 클릭
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center shrink-0">
                  <Bell className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  2. <strong>알림</strong>을 &quot;허용&quot;으로 변경
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                알림을 허용하면 이런 정보를 받을 수 있어요
              </p>
              <div className="flex gap-2 justify-center text-xs text-slate-500 flex-wrap">
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">면접 리마인더</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">서류 마감</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">현황 업데이트</span>
              </div>
            </div>
          </div>

          <Button
            variant="default"
            className="w-full font-bold"
            onClick={onClose}
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  // iOS Safari: PWA 설치 안내
  if (isIOSSafari) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-brand-500" />
            </div>
            <DialogTitle className="text-xl">푸시 알림 받기</DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400">
              iOS에서 푸시 알림을 받으려면 앱을 홈 화면에 추가해주세요
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-3">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                홈 화면에 추가하는 방법
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center shrink-0">
                  <Share className="w-4 h-4 text-brand-500" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  1. 하단의 <strong>공유</strong> 버튼을 탭하세요
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center shrink-0">
                  <PlusSquare className="w-4 h-4 text-brand-500" />
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  2. <strong>홈 화면에 추가</strong>를 선택하세요
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                홈 화면에 추가하면 이런 알림을 받을 수 있어요
              </p>
              <div className="flex gap-2 justify-center text-xs text-slate-500">
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">면접 리마인더</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">서류 마감</span>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">현황 업데이트</span>
              </div>
            </div>
          </div>

          <Button
            variant="default"
            className="w-full font-bold"
            onClick={onClose}
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  // 일반 알림 권한 요청 모달
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-8 h-8 text-brand-500" />
          </div>
          <DialogTitle className="text-xl">알림을 받으시겠습니까?</DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-slate-400">
            중요한 일정과 업데이트를 놓치지 마세요
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 my-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <Calendar className="w-5 h-5 text-brand-500 shrink-0" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              면접 일정 리마인더
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <FileText className="w-5 h-5 text-brand-500 shrink-0" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              서류 마감일 알림
            </span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
            <Clock className="w-5 h-5 text-brand-500 shrink-0" />
            <span className="text-sm text-slate-600 dark:text-slate-300">
              지원 현황 업데이트
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            나중에
          </Button>
          <Button
            variant="default"
            className="flex-1 font-bold"
            onClick={handleAllow}
          >
            알림 허용
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
