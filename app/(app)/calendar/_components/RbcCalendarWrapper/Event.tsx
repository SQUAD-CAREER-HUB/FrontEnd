import { cn } from '@/lib/utils';
import { RbcEvent } from '../../_types/rbcEvent';
import { getEventMeta } from '../../_utils/getEventMeta';

export default function Event({ event }: { event: RbcEvent }) {
  const { bgColor, color, borderColor } = getEventMeta(event);

  return (
    <div
      className={cn(
        'h-full px-1 py-0.5 rounded border',
        bgColor,
        color,
        borderColor
      )}
    >
      <div className='flex items-center gap-1'>
        <span className='text-xs font-bold'>{event.resource.companyName}</span>{' '}
        | <span className='text-xs truncate'>{event.title}</span>
      </div>
    </div>
  );
}
