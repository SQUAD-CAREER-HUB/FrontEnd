'use client';

import { useParams } from 'next/navigation';
import { useGetApplicationDetail } from '../../hooks/useGetApplicationDetail';
import { ApplicationStatus } from '../../types';
import { ScheduleResult } from '@/shared/types';
import { StatusButton } from '../StatusButton';

const APPLICATION_STATUS_TO_RESULT: Record<ApplicationStatus, ScheduleResult> = {
  IN_PROGRESS: 'WAITING',
  FINAL_PASS: 'PASS',
  FINAL_FAIL: 'FAILED',
};

export default function ViewCard() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);

  const applicationStatus = data?.applicationInfo.applicationStatus ?? 'IN_PROGRESS';
  const scheduleResult = APPLICATION_STATUS_TO_RESULT[applicationStatus];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
      <div className="flex flex-col items-start gap-1">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
          최종 상태
        </span>
        <StatusButton status={scheduleResult} currentStatus={scheduleResult} />
      </div>
    </div>
  );
}