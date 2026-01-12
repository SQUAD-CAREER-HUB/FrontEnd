import CalendarContainer from '@/features/calendar/components/CalendarContainer';
import CalendarFilterPanelWrapper from '@/features/calendar/components/CalendarFilterPanelWrapper';
import DateScheduleCreateModal from '@/features/calendar/components/DateScheduleCreateModal';
import DateScheduleListModal from '@/features/calendar/components/DateScheduleListModal';

export default function CalendarPage() {
  return (
    <div className='flex h-full w-full relative'>
      <main className='flex-1 h-full min-w-0'>
        <CalendarContainer />
      </main>

      {/* 필터 영역: 상태에 따라 보여야 하므로 클라이언트 래퍼로 분리 */}
      <CalendarFilterPanelWrapper />

      {/* 전역 레이어: 클라이언트 전용 모달들 */}
      <DateScheduleListModal />
      <DateScheduleCreateModal />
    </div>
  );
}
