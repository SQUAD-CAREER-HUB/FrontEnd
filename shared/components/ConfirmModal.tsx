'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import { useConfirmStore } from '@/shared/stores/useConfirmStore';
import { buttonVariants } from '@/shared/components/ui/button';

export const ConfirmModal = () => {
  const { isOpen, config, closeConfirm } = useConfirmStore();

  const handleConfirm = () => {
    config.onConfirm();
    closeConfirm();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={closeConfirm}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{config.title}</AlertDialogTitle>
          <AlertDialogDescription>{config.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={closeConfirm}>
            {config.cancelText || '취소'}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            // variant가 destructive일 경우 빨간 버튼으로 표시
            className={buttonVariants({ variant: config.variant || 'default' })}
          >
            {config.confirmText || '확인'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
