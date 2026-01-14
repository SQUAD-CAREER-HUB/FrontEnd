'use client';

import ApplicationFilterPanel from '@/features/applications/components/ApplicationFilterPanel';
import ApplicationFilterPanelMobile from '@/features/applications/components/ApplicationFilterPanelMobile';
import ApplicationHeader from '@/features/applications/components/ApplicationHeader';
import ApplicationList from '@/features/applications/components/ApplicationList';
import { useApplicationFilterValueStore } from '@/features/applications/stores/useApplicationFilterValueStore';

export default function ApplicationsPage() {
  const { query, stageTypes, submissionStatus, stageResult } =
    useApplicationFilterValueStore();

  const filter = {
    query: query || undefined,
    stageType: stageTypes.length > 0 ? stageTypes : undefined,
    submissionStatus: submissionStatus || undefined,
    stageResult: stageResult || undefined,
  };

  return (
    <div className='flex flex-col h-full'>
      <ApplicationHeader />

      <div className='flex flex-1 overflow-hidden'>
        {/* 메인 콘텐츠 */}
        <div className='flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar'>
          <ApplicationList filter={filter} />
        </div>

        {/* 데스크탑: 항상 보이는 static 사이드바 */}
        <div className='hidden lg:block flex-shrink-0'>
          <ApplicationFilterPanel />
        </div>
      </div>

      {/* 모바일: Sheet 오버레이 */}
      <div className='lg:hidden'>
        <ApplicationFilterPanelMobile />
      </div>
    </div>
  );
}
