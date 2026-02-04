'use client';

import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import ScheduleCard from '../ScheduleCard';
import { useState } from 'react';
import { useTimelineStore } from '../../../stores/useTimeLineStore';
import AddEtcSchedule from './AddEtcSchedule';
import StageWrapper from '../../common/StageWrapper';
import { ACTIVE_STAGE_STYLES } from '../../../constants/styles';
import { useGetApplicationDetail } from '../../../hooks/useGetApplicationDetail';

export default function EtcStage() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);

  const etcStageTimeLine = data?.applicationStageTimeLine.etcStageTimeLine;
  const [open, setOpen] = useState(false);
  const activeStage = useTimelineStore((state) => state.activeStage);

  return (
    <StageWrapper number={2} stage="ETC">
      <div className={`rounded-xl p-5 shadow-sm transition-all border bg-white dark:bg-slate-900 ${activeStage === 'ETC' ? ACTIVE_STAGE_STYLES.border : 'border-slate-200 dark:border-slate-700'}`}>
        <div className='flex justify-between items-center mb-5'>
          <h3 className={`font-bold text-lg ${activeStage === 'ETC' ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-slate-100'}`}>
            기타 전형
          </h3>
          <button
            onClick={() => { setOpen(prev => !prev) }}
            className='p-2 text-slate-400 hover:text-brand-500 transition-colors'
            title="전형 추가"
          >
            <Plus className='w-5 h-5' />
          </button>
        </div>
        <div className='space-y-3'>
          {etcStageTimeLine?.map((stage) => (
            <ScheduleCard
              key={stage.scheduleId}
              id={stage.scheduleId}
              title={stage.scheduleName}
              datetime={stage.startedAt}
              endDatetime={stage.endedAt}
              scheduleResult={stage.scheduleResult}
              type='other'
            />
          ))}
          {open && <AddEtcSchedule setOpen={setOpen} />}
        </div>
      </div>
    </StageWrapper>
  );
}