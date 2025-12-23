'use client';

import RbcCalendarWrapper from './RbcCalendarWrapper';
import DateScheduleCreateModal from './DateScheduleCreateModal';
import DateScheduleListModal from './DateScheduleListModal';
import CalendarFilterPanel from './CalendarFilterPanel';
import { useFilterPanelStore } from '../stores/useFilterPanelStore';
import CalendarFilterPanelMobile from './CalendarFilterPanelMobile';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';
import { useQuery } from '@tanstack/react-query';

/**
 * 캘린더 + 필터 UI 컨테이너
 * @returns
 */
export default function CalendarContainer() {
  const { isOpen } = useFilterPanelStore();
  const isDesktop = useMediaQuery('(min-width: 768px)');

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
  console.log('🚀 ~ CalendarContainer ~ data:', data);

  return (
    <>
      <div className='flex h-full w-full'>
        {/* react-big-calendar 래퍼 (캘린더 라이브러리 의존 영역) */}
        <RbcCalendarWrapper events={data} />

        {/* Desktop 사이드 패널 */}
        {isDesktop && isOpen && <CalendarFilterPanel />}
      </div>

      {/* Mobile Drawer (Sheet는 모바일에서만 렌더) */}
      {!isDesktop && <CalendarFilterPanelMobile />}

      {/* 캘린더 페이지 전용 UI 레이어 */}
      <DateScheduleListModal />
      <DateScheduleCreateModal />
    </>
  );
}
