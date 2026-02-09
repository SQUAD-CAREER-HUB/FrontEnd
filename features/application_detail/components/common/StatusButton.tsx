'use client'
import { ScheduleResult } from "@/shared/types";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

// StatusButton 컴포넌트
interface StatusButtonProps {
  status: ScheduleResult;
  currentStatus: ScheduleResult;
  onClick?: (status: ScheduleResult) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function StatusButton({
  status,
  currentStatus,
  onClick,
  label,
  className,
  disabled = false,
}: StatusButtonProps) {
  const isActive = status === currentStatus;
  const statusLabel = {
    WAITING: '대기',
    PASS: '합격',
    FAIL: '불합격'
  }
  const statusStyles = {
    WAITING: isActive
      ? 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200'
      : 'text-slate-400 hover:text-slate-600',
    PASS: isActive
      ? 'bg-green-500 text-white'
      : 'hover:text-green-600',
    FAIL: isActive
      ? 'bg-red-500 text-white'
      : 'hover:text-red-600'
  };

  return (
    <Button
      variant={'xs'}
      size={'xs'}
      onClick={() => !disabled && onClick?.(status)}
      disabled={disabled}
      className={cn(
        'font-bold shadow-none rounded-md',
        disabled && 'opacity-40 cursor-not-allowed',
        statusStyles[status],
        className
      )}
    >
      {label || statusLabel[status]}
    </Button>
  );
}