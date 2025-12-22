'use client'
interface TimelineStepNumberProps {
  number?: number;
  isCompleted: boolean;
}

// 3. 타임라인 스텝 번호 컴포넌트
export default function TimelineStepNumber({ 
  number, 
  isCompleted 
}: TimelineStepNumberProps) {
  return (
    <div className={`relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center shadow-sm flex-shrink-0 transition-colors ${
      isCompleted 
        ? 'bg-green-500 border-green-500 text-white' 
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'
    }`}>
      {number && (
        <span className='text-xs md:text-sm font-bold'>
          {number}
        </span>
      )}
    </div>
  );
}