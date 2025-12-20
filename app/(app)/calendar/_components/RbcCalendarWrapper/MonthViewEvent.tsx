import { cn } from '@/lib/utils';
import { RbcEvent } from '../../_types/rbcEvent';
import { getEventMeta } from '../../_utils/getEventMeta';

export default function MonthViewEvent({ event }: { event: RbcEvent }) {
  const { styles } = getEventMeta(event);

  return (
    <>
      <div
        className={cn(
          'h-full px-2 py-0.5 rounded border hover:scale-[1.03] transition-all',
          styles
        )}
      >
        <div className='flex items-center gap-1'>
          <span className='text-no-wrap text-xs font-bold'>
            {event.resource.companyName}
          </span>
          |<span className='text-xs truncate'>{event.title}</span>
        </div>
      </div>
    </>
  );
}
