import { cn } from '@/shared/lib/utils';
import { ExpandIcon } from 'lucide-react';
import { DateCellWrapperProps } from 'react-big-calendar';

export default function DateCellWrapper({
  children,
  value,
  range,
}: DateCellWrapperProps) {
  // 예: 오늘 날짜인지 확인
  const isToday = new Date().toDateString() === value.toDateString();

  return (
    <div
      className={cn(
        'border-l border-border relative h-full w-full transition-colors group',
        isToday ? 'bg-brand-50/50' : 'bg-white',
        'hover:bg-brand-50/30 cursor-pointer'
      )}
    >
      {/* 캘린더가 기본적으로 제공하는 내부 요소(이벤트 등)를 렌더링하기 위해 children이 반드시 필요합니다. */}
      {children}

      {/* 칸 하단에 마우스 호버 시 나타나는 커스텀 UI 예시 */}
      <div className='absolute bottom-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity'>
        <span className='text-[10px] text-slate-400'>
          <ExpandIcon className='w-3 h-3' />
        </span>
      </div>
    </div>
  );
}
