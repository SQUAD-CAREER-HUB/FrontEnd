'use client';

import { Interview } from '@/shared/types/interview';

interface ScheduleItemProps {
  interview: Interview; // 구체적인 인터페이스 정의 권장
  onClick: () => void;
}

export const ScheduleItem = ({ interview, onClick }: ScheduleItemProps) => {
  const isUpcoming = new Date(interview.scheduledAt) > new Date();

  return (
    <div
      className='p-4 mb-4 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors'
      onClick={onClick}
    >
      <div className='flex justify-between items-center'>
        {/* 디데이 배지 */}
        <div className='flex-shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center font-extrabold shadow-sm bg-red-500 text-white'>
          <span className='text-[9px] font-bold opacity-80 leading-none mb-1 text-center'>
            D-
          </span>
          <span className='text-base leading-none'>Day</span>
        </div>

        {/* 전형 정보 */}
        <div className='flex-1 min-w-0 mx-4'>
          <div className='flex items-center justify-between mb-1'>
            <h4 className='font-bold text-slate-900 dark:text-slate-100 truncate text-sm'>
              {interview.companyName || '우아한형제들'}
            </h4>
            <span className='text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap bg-orange-100 text-orange-600 dark:bg-orange-900/30'>
              {interview.type || '면접'}
            </span>
          </div>
          <div className='flex items-center text-xs text-slate-400 dark:text-slate-500'>
            <span className='truncate mr-2 font-medium'>
              {interview.title || '과제 발표'}
            </span>
            <span className='flex-shrink-0 font-bold'>• 오후 02:00</span>
          </div>
        </div>

        {/* 상태 표시 */}
        <div
          className={`text-xs font-bold ${
            isUpcoming ? 'text-brand-500' : 'text-slate-400'
          }`}
        >
          {isUpcoming ? '예정' : '완료'}
        </div>
      </div>
    </div>
  );
};
