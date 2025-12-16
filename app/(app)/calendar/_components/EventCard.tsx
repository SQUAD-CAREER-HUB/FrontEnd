import { format } from 'date-fns';
import { RbcEvent } from '../_types/rbcEvent';

import { cn } from '@/lib/utils';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { ArrowRightIcon, Clock5Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getEventMeta } from '../_utils/getEventMeta';

export default function EventCard({ event }: { event: RbcEvent }) {
  const { bgColor, color, borderColor } = getEventMeta(event);

  const handleNavigateToApplicationDetail = () => {
    // TODO 지원 관리 상세 라우팅 추가
  };

  return (
    <Card
      key={event.resource.id}
      className={cn('rounded-lg border', bgColor, color, borderColor)}
    >
      <CardHeader className='flex flex-col'>
        <span className='text-sm font-bold text-nowrap'>
          {event.resource.companyName}
        </span>{' '}
        <span className='text-sm'>{event.title}</span>
      </CardHeader>
      <CardContent>
        <p className={cn('flex items-center gap-1 text-xs mb-1', color)}>
          <Clock5Icon className={cn('w-3 h-3', color)} />
          {format(new Date(event.start), 'HH:mm')} ~{' '}
          {format(new Date(event.end), 'HH:mm')}
        </p>
      </CardContent>
      <CardFooter className='justify-end'>
        <CardAction onClick={handleNavigateToApplicationDetail}>
          <Button
            variant='ghost'
            className='flex items-center gap-1 text-xs font-medium'
          >
            상세 보기
            <ArrowRightIcon className={cn('w-3 h-3', color)} />
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
