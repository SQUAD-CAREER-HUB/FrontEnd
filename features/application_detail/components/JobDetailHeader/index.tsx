'use client';

import { useParams } from 'next/navigation';
import { useGetApplicationDetail } from '../../hooks/useGetApplicationDetail';
import BackButton from './BackButton';
import JobTitle from './JobTitle';
import TimelinePanelToggle from './TimelinePanelToggle';
import DeleteApplicationButton from './DeleteApplicationButton';

export default function JobDetailHeader() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);

  const companyName = data?.applicationInfo.company ?? '';
  const position = data?.applicationInfo.position ?? '';

  return (
    <div className="sticky top-0 z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm flex items-center justify-between mb-6 -mt-4 -mx-4 px-4 py-4 md:-mt-8 md:-mx-8 md:px-8 border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
      {/* Left */}
      <div className="flex items-center space-x-3">
        <BackButton />
        <JobTitle companyName={companyName} position={position} />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-2">
        <TimelinePanelToggle />
        <div className="h-5 w-px bg-slate-300 dark:bg-slate-700" />
        <DeleteApplicationButton applicationId={applicationId} />
      </div>
    </div>
  );
}
