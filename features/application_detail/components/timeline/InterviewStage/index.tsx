'use client';

import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import ScheduleCard from '../ScheduleCard';
import { useTimelineStore } from '../../../stores/useTimeLineStore';
import { ScheduleResult } from '@/shared/types';
import { useState } from 'react';
import AddInterviewSchedule from './AddInterviewSchedule';
import StageWrapper from '../../common/StageWrapper';
import { ACTIVE_STAGE_STYLES, STATUS_FONT_STYLES } from '../../../constants/styles';
import { useGetApplicationDetail } from '../../../hooks/useGetApplicationDetail';

export default function InterViewStage() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);
  const interviewStageTimeLine =
    data?.applicationStageTimeLine.interviewStageTimeLine ?? [];
  const activeStage = useTimelineStore((state) => state.activeStage);
  const [open, setOpen] = useState(false);

  const result: ScheduleResult = interviewStageTimeLine.every(
    stage => stage.scheduleResult === 'PASS'
  )
    ? 'PASS'
    : interviewStageTimeLine.every(
      stage => stage.scheduleResult === 'FAIL'
    )
      ? 'FAIL'
      : 'WAITING';

  return (
    <StageWrapper number={3} stage="INTERVIEW">
      <div className='transition-opacity opacity-90'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className={`font-bold text-lg text-slate-900 dark:text-slate-100 ${activeStage === 'INTERVIEW' && ACTIVE_STAGE_STYLES.font} ${STATUS_FONT_STYLES[result]}`}>
            면접 전형
          </h3>
          <div
            onClick={() => { setOpen(prev => !prev) }}
            className='p-2 text-slate-400 hover:text-brand-500 transition-colors cursor-pointer'
            title="전형 추가"
          >
            <Plus className='w-5 h-5 mr-1' />
          </div>
        </div>
        <div className={`space-y-3 p-3 rounded-xl transition-all ${activeStage === 'INTERVIEW' && ACTIVE_STAGE_STYLES.bg}`}>
          {interviewStageTimeLine?.map((stage) => (
            <ScheduleCard
              key={stage.scheduleId}
              id={stage.scheduleId}
              title={stage.scheduleName}
              datetime={stage.startedAt}
              location={stage.location}
              scheduleResult={stage.scheduleResult}
              type='interview'
            />
          ))}
          {open && <AddInterviewSchedule setOpen={setOpen} />}
        </div>
      </div>
    </StageWrapper>
  );
}