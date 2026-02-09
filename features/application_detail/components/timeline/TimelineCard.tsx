'use client';

import { CirclePlay } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/components/ui/card';
import { ReactNode } from 'react';
import CurrentStageSelector from './CurrentStageSelector';

interface TimelineCardProps {
  children: ReactNode;
}

// 타임라인 카드 컴포넌트
export function TimelineCard({ children }: TimelineCardProps) {
  return (
    <Card className='p-0 bg-white gap-0 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col overflow-hidden'>
      <CardHeader className='p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center flex-shrink-0 relative'>
        <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center'>
          <CirclePlay className='w-5 h-5 text-brand-500 mr-2' />
          지원 관리 타임라인
        </h2>
        <CurrentStageSelector />
      </CardHeader>
      <CardContent className='p-6 md:p-8 relative flex-1 overflow-y-auto custom-scrollbar'>
        <div className='absolute left-10 md:left-12 top-8 bottom-8 w-0.5 bg-slate-100 dark:bg-slate-800'></div>
        {children}
      </CardContent>
    </Card>
  );
}
