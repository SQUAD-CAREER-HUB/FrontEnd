'use client';

import ApplicationFilterPanel from '@/features/applications/components/ApplicationFilterPanel';
import ApplicationFilterPanelMobile from '@/features/applications/components/ApplicationFilterPanelMobile';
import ApplicationHeader from '@/features/applications/components/ApplicationHeader';
import ApplicationList from '@/features/applications/components/ApplicationList';
import { useApplicationFilterValueStore } from '@/features/applications/stores/useApplicationFilterValueStore';
import { useGetApplications } from '@/features/applications/hooks/useGetApplications';
import { useMediaQuery } from '@/shared/hooks/useMediaQuery';

export default function ApplicationsContainer() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const { query, stageTypes, submissionStatus, stageResult } =
    useApplicationFilterValueStore();

  // 서류전형이 선택되어 있거나 아무것도 선택하지 않았을 때만 submissionStatus를 전달
  const shouldIncludeSubmissionStatus =
    stageTypes.length === 0 || stageTypes.includes('DOCUMENT');

  const filter = {
    query: query || undefined,
    stageType: stageTypes.length > 0 ? stageTypes : undefined,
    submissionStatus: shouldIncludeSubmissionStatus
      ? submissionStatus || undefined
      : undefined,
    stageResult: stageResult || undefined,
  };

  const { data } = useGetApplications(filter);
  const totalCount = data?.pages.flatMap((page) => page.contents).length ?? 0;

  return (
    <div className='flex flex-col lg:flex-row relative bg-slate-50 dark:bg-slate-950 min-h-full'>
      <div className="flex-1 flex flex-col min-w-0 p-4">
        <ApplicationHeader totalCount={totalCount} />

        <div className="flex flex-1 overflow-hidden">
          {/* 메인 콘텐츠 */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <ApplicationList filter={filter} />
          </div>
        </div>
      </div>
      {/* Desktop 사이드 패널 */}
      {isDesktop && <ApplicationFilterPanel />}

      {/* Mobile Drawer (Sheet는 모바일에서만 렌더) */}
      {!isDesktop && <ApplicationFilterPanelMobile />}
    </div>
  );
}
