'use client';

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDateScheduleListStore } from '../_stores/useDateScheduleListStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { useDateScheduleCreateStore } from '../_stores/useDateScheduleCreateStore';
import { useQuery } from '@tanstack/react-query';
import { mapCalendarEventsToRbcEvents } from '../_utils/mapCalendarEventsToRbcEvents';
import EventCard from './EventCard';
import { useCalendarViewStore } from '../_stores/useCalendarViewStore';
import { CalendarPlusIcon, CalendarSearchIcon } from 'lucide-react';
import EmptyEvent from './EmptyEvent';

export default function DateScheduleListModal() {
  const { isOpen, selectedDate, close } = useDateScheduleListStore();
  const { setViewAndDate } = useCalendarViewStore();

  const { open } = useDateScheduleCreateStore();

  const { data } = useQuery({
    queryKey: ['calendar-events'],
    queryFn: async () => {
      const response = await fetch('/api/calendar/events');
      if (!response.ok) {
        throw new Error('캘린더 이벤트를 불러오는 데 실패했습니다.');
      }
      return response.json();
    },
  });

  const handleGoToDayView = () => {
    if (!selectedDate) return;

    setViewAndDate('day', selectedDate);
    close();
  };

  const rbcEventsForSelectedDate = mapCalendarEventsToRbcEvents(data)?.filter(
    (event) => {
      if (!selectedDate) return false;
      const eventDate = new Date(event.start);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    }
  );

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>
            {selectedDate
              ? format(selectedDate, 'yyyy년 MM월 dd일 EEEE', {
                  locale: ko,
                })
              : '일정'}
          </DialogTitle>
          <DialogDescription>선택한 날짜의 일정 목록입니다.</DialogDescription>
        </DialogHeader>

        <div className='flex-1'>
          {rbcEventsForSelectedDate?.length === 0 && <EmptyEvent />}

          {/* 일정 리스트 영역 */}
          <div className='flex flex-col gap-1 max-h-[400px] overflow-y-auto'>
            {rbcEventsForSelectedDate?.map((event) => (
              <EventCard key={event.resource.id} event={event} />
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-y-2'>
          <Button onClick={() => open(selectedDate!)} className='font-bold'>
            <CalendarPlusIcon /> 일정 추가
          </Button>

          <Button variant='outline' onClick={handleGoToDayView}>
            <CalendarSearchIcon />
            일간 뷰로 자세히 보기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
