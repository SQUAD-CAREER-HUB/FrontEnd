'use client'
import { Button } from "../../../components/ui/button";

interface StatusButtonGroupProps {
  status:'WAITING' | 'PASS' | 'FAILED';
  onStatusChange?: (status: 'WAITING' | 'PASS' | 'FAILED') => void;
}


export default function StatusButtonGroup({
  status = 'WAITING',
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
        onClick={() => onStatusChange?.('WAITING')}
        className={`font-bold shadow-none rounded-xl text-slate-400 hover:text-slate-600 ${status === 'WAITING' && activeClasses.pending}`}
      >
        대기
      </Button>
      <Button 
        variant={'xs'} 
        size={'xs'} 
        onClick={() => onStatusChange?.('PASS')}
        className={`font-bold shadow-none hover:text-green-600 ${status === 'PASS' && activeClasses.passed}`}
      >
        합격
      </Button>
      <Button 
        variant={'xs'} 
        size={'xs'} 
        onClick={() => onStatusChange?.('FAILED')}
        className={`font-bold shadow-none hover:text-red-600 ${status === 'FAILED' && activeClasses.failed}`}
      >
        불합격
      </Button>
    </div>
  );
}
