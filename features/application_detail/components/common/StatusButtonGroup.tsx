'use client'
import { ScheduleResult } from "@/shared/types";
import { StatusButton } from "./StatusButton";

interface StatusButtonGroupProps {
  status:'WAITING' | 'PASS' | 'FAIL';
  onStatusChange?: (status: 'WAITING' | 'PASS' | 'FAIL') => void;
  disabledStatuses?: ScheduleResult[];
}


export default function StatusButtonGroup({
  status = 'WAITING',
  onStatusChange,
  disabledStatuses = [],
}: StatusButtonGroupProps) {
  return (
    <div className='flex bg-white/50 dark:bg-slate-800/50 items-center rounded-lg'>
      <StatusButton status="WAITING" currentStatus={status} onClick={onStatusChange} label="대기" disabled={disabledStatuses.includes('WAITING')} />
      <StatusButton status="PASS" currentStatus={status} onClick={onStatusChange} label="합격" disabled={disabledStatuses.includes('PASS')} />
      <StatusButton status="FAIL" currentStatus={status} onClick={onStatusChange} label="불합격" disabled={disabledStatuses.includes('FAIL')} />
    </div>
  );
}
