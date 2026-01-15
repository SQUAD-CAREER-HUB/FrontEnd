'use client';

import { useParams } from 'next/navigation';
import ApplicationNotFound from '@/features/application_detail/components/ApplicationNotFound';
import JobDetailCard from '@/features/application_detail/components/JobDetailCard';
import JobDetailHeader from '@/features/application_detail/components/JobDetailHeader';
import { useGetApplicationDetail } from '@/features/application_detail/hooks/useGetApplicationDetail';

export default function JobDetailPage() {
  const params = useParams();
  const applicationId = Number(params.id);

  const { data, isLoading, isError } = useGetApplicationDetail(applicationId);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-slate-500">로딩 중...</div>
      </div>
    );
  }

  if (isError || !data) {
    return <ApplicationNotFound />;
  }

  return (
    <div className="flex flex-1 flex-col p-4">
      <JobDetailHeader />
      <JobDetailCard />
    </div>
  );
}