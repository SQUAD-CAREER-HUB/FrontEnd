'use client'
import { ApplicationStatus } from "@/types";
import { Button } from "../../../components/ui/button";

interface StatusButtonGroupProps {
  status: 'pending' | 'passed' | 'failed';
  onStatusChange?: (status: 'pending' | 'passed' | 'failed') => void;
}


export default function StatusButtonGroup({
  status = 'pending',
  onStatusChange,
}: StatusButtonGroupProps) {
  const activeClasses = {
    pending: 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200',
    passed: 'bg-green-500 text-white',
    failed: 'bg-red-500 text-white'
  }
  return (
    <div className='flex bg-white/50 dark:bg-slate-800/50 items-center rounded-lg'>
      <Button 
        variant={'xs'} 
        size={'xs'} 
        onClick={() => onStatusChange?.('pending')}
        className={`font-bold shadow-none rounded-xl text-slate-400 hover:text-slate-600 ${status === 'pending' && activeClasses.pending}`}
      >
        대기
      </Button>
      <Button 
        variant={'xs'} 
        size={'xs'} 
        onClick={() => onStatusChange?.('passed')}
        className={`font-bold shadow-none hover:text-green-600 ${status === 'passed' && activeClasses.passed}`}
      >
        합격
      </Button>
      <Button 
        variant={'xs'} 
        size={'xs'} 
        onClick={() => onStatusChange?.('failed')}
        className={`font-bold shadow-none hover:text-red-600 ${status === 'failed' && activeClasses.failed}`}
      >
        불합격
      </Button>
    </div>
  );
}
