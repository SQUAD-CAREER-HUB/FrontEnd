'use client'
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";

interface StatusButtonGroupProps {
  onStatusChange?: (status: 'pending' | 'passed' | 'failed') => void;
  currentStatus?: 'pending' | 'passed' | 'failed';
}

export default function StatusButtonGroup({ 
  onStatusChange, 
  currentStatus 
}: StatusButtonGroupProps) {
  return (
    <ButtonGroup className='flex bg-white/50 dark:bg-slate-800/50 items-center rounded-lg border border-slate-100/50 dark:border-slate-700/50'>
      <Button 
        variant={'xs'} 
        size={'xs'} 
        onClick={() => onStatusChange?.('pending')}
        className='text-slate-400 hover:text-slate-600'
      >
        대기
      </Button>
      <Button 
        variant={'xs'} 
        size={'xs'} 
        onClick={() => onStatusChange?.('passed')}
        className='hover:text-green-600'
      >
        합격
      </Button>
      <Button 
        variant={'xs'} 
        size={'xs'} 
        onClick={() => onStatusChange?.('failed')}
        className='hover:text-red-600'
      >
        불합격
      </Button>
    </ButtonGroup>
  );
}
