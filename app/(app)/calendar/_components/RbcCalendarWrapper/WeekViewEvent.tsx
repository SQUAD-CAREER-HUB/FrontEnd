import { cn } from '@/lib/utils';
import { RbcEvent } from '../../_types/rbcEvent';
import { getEventMeta } from '../../_utils/getEventMeta';
import { format } from 'date-fns';
import { Clock4Icon } from 'lucide-react';

export default function WeekViewEvent({ event }: { event: RbcEvent }) {
  console.log('🚀 ~ WeekViewEvent ~ event:', event);

  const { styles } = getEventMeta(event);

  return (
    <>
      <div className={cn('h-full px-1 py-2 rounded border', styles)}>
        {/* 여기서 rbc-event-label 대신 직접 시간 표시 */}
        <div className='flex items-center mb-1'>
          <Clock4Icon className='w-3 h-3' />
          <span className='text-[10px] font-medium px-1'>
            {format(event.start, 'HH:mm')} ~ {format(event.end, 'HH:mm')}
          </span>
          {/* 전형 상태 배지 등을 여기에 넣을 수 있습니다 */}
        </div>

        <div className='flex flex-col gap-y-1'>
          <span className='text-xs font-bold'>
            {event.resource.companyName}
          </span>
          <span className='text-xs'>{event.title}</span>
        </div>
      </div>
    </>
  );
}
