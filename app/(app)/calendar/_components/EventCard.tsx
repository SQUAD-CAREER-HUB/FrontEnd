import { format } from 'date-fns';
import { RbcEvent } from '../_types/rbcEvent';
import { PROCESS_TYPE_META } from '../_constants/processType';
import { cn } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ArrowRightIcon, Clock5Icon } from 'lucide-react';

export default function EventCard({ event }: { event: RbcEvent }) {
  const bgColor = PROCESS_TYPE_META[event.resource.processType].bgColor;
  const color = PROCESS_TYPE_META[event.resource.processType].color;
  const borderColor = PROCESS_TYPE_META[event.resource.processType].borderColor;

  return (
    <Card
      key={event.resource.id}
      className={cn(`rounded-lg border ${bgColor} ${color} ${borderColor}`)}
    >
      <CardHeader>
        <span className='font-semibold text-sm'>{event.title}</span>
      </CardHeader>
      <CardContent>
        <p className={cn('flex items-center gap-1 text-xs mb-1', color)}>
          <Clock5Icon className={cn('w-3 h-3', color)} />
          {format(new Date(event.start), 'HH:mm')} -{' '}
          {format(new Date(event.end), 'HH:mm')}
        </p>
      </CardContent>
      <CardFooter>
        <CardAction className='flex items-center gap-1 text-end text-xs font-medium underline'>
          {/* TODO 지원 관리 상세 라우팅 추가 */}
          상세 보기
          <ArrowRightIcon className={cn('w-3 h-3', color)} />
        </CardAction>
      </CardFooter>
    </Card>
  );
}
