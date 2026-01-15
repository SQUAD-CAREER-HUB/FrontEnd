'use client';

import { CirclePlay } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
} from '../../../shared/components/ui/card';
import { DropDown } from '../../../shared/components/DropDown';
import { ReactNode } from 'react';
import { useTimelineStore } from '../stores/useTimeLineStore';
import { useShallow } from 'zustand/shallow';
import { ApplicationStage } from '@/shared/types';

interface TimelineCardProps {
  children: ReactNode;
}

// 타임라인 카드 컴포넌트
export function TimelineCard({ children }: TimelineCardProps) {
  const options = [
    { value: 'document', label: '서류 전형' },
    { value: 'other', label: '기타 전형' },
    { value: 'interview', label: '면접 전형' },
    { value: 'result', label: '지원 종료' },
  ];
  const { activeStage, setActiveStage } = useTimelineStore(
    useShallow((state) => ({
      activeStage: state.activeStage,
      setActiveStage: state.setActiveStage,
    }))
  );
  return (
    <Card className='p-0 bg-white gap-0 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col overflow-hidden'>
      <CardHeader className='p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center flex-shrink-0 relative'>
        <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center'>
          <CirclePlay className='w-5 h-5 text-brand-500 mr-2' />
          지원 관리 타임라인
        </h2>
        <div className='flex items-center space-x-2 w-40'>
          <div className='text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap'>
            현재 단계:
          </div>
          <DropDown
            options={options}
            value={activeStage || 'document'}
            onValueChange={(value) => setActiveStage(value as ApplicationStage)}
          />
        </div>
      </CardHeader>
      <CardContent className='p-6 md:p-8 relative flex-1 overflow-y-auto custom-scrollbar'>
        <div className='absolute left-10 md:left-12 top-8 bottom-8 w-0.5 bg-slate-100 dark:bg-slate-800'></div>
        {children}
      </CardContent>
    </Card>
  );
}
