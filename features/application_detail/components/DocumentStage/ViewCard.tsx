'use client';

import { useParams } from 'next/navigation';
import { Label } from '@/shared/components/ui/label';
import { Clock } from 'lucide-react';
import { StatusButton } from '../StatusButton';
import { useGetApplicationDetail } from '../../hooks/useGetApplicationDetail';
import { formatDateTime } from '@/shared/lib/utils';

const SUBMISSION_STATUS_LABEL = {
  NOT_SUBMITTED: '미제출',
  SUBMITTED: '제출 완료',
} as const;

export default function ViewCard() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);

  const applicationInfo = data?.applicationInfo;
  const docsStage = data?.applicationStageTimeLine.docsStageTimeLine;

  const submissionStatus = docsStage?.submissionStatus ?? 'NOT_SUBMITTED';
  const scheduleResult = docsStage?.scheduleResult ?? 'WAITING';

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div>
          <Label className="text-[10px] text-slate-400 font-bold mb-1.5 block uppercase tracking-wider">
            서류 상태
          </Label>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {SUBMISSION_STATUS_LABEL[submissionStatus]}
          </div>
        </div>
        <div>
          <Label className="text-[10px] text-slate-400 font-bold mb-1.5 block uppercase tracking-wider">
            지원 방식
          </Label>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {applicationInfo?.applicationMethod ?? '-'}
          </div>
        </div>
        <div>
          <Label className="text-[10px] text-slate-400 font-bold mb-1.5 block uppercase tracking-wider">
            마감 일시
          </Label>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 opacity-50" />
            {formatDateTime(applicationInfo?.deadline)}
          </div>
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col items-start gap-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            전형 결과
          </span>
          <StatusButton status={scheduleResult} currentStatus={scheduleResult} />
        </div>
      </div>
    </>
  );
}