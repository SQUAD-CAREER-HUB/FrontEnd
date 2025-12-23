import { format } from 'date-fns';
import { RbcEvent } from '../types/rbcEvent';

import { cn } from '@/shared/lib/utils';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/shared/components/ui/card';
import { ArrowRightIcon, Clock5Icon } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { getEventMeta } from '../utils/getEventMeta';

export default function EventCard({ event }: { event: RbcEvent }) {
  const { styles } = getEventMeta(event);

  const handleNavigateToApplicationDetail = () => {
    // TODO 지원 관리 상세 라우팅 추가
  };

  return (
    <Card key={event.resource.id} className={cn('rounded-lg border', styles)}>
      <CardHeader className='flex flex-col'>
        <span className='text-sm font-bold text-nowrap'>
          {event.resource.companyName}
        </span>{' '}
        <span className='text-sm'>{event.title}</span>
      </CardHeader>
      <CardContent>
        <p className={cn('flex items-center gap-1 text-xs mb-1', styles)}>
          <Clock5Icon className={cn('w-3 h-3')} />
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
            <ArrowRightIcon className={cn('w-3 h-3')} />
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
