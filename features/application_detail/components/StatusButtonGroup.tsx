'use client'
import { StatusButton } from "./StatusButton";

interface StatusButtonGroupProps {
  status:'WAITING' | 'PASS' | 'FAILED';
  onStatusChange?: (status: 'WAITING' | 'PASS' | 'FAILED') => void;
}


export default function StatusButtonGroup({
  status = 'WAITING',
  onStatusChange,
}: StatusButtonGroupProps) {
  return (
    <div className='flex bg-white/50 dark:bg-slate-800/50 items-center rounded-lg'>
      <StatusButton status="WAITING" currentStatus={status} onClick={onStatusChange} label="대기" />
      <StatusButton status="PASS" currentStatus={status} onClick={onStatusChange} label="합격" />
      <StatusButton status="FAILED" currentStatus={status} onClick={onStatusChange} label="불합격" />
    </div>
  );
}
