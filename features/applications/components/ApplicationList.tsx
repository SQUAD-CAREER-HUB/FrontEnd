'use client';

import { JobApplication } from '@/types';
import JobApplicationCard from './ApplicationCard';
import JobApplicationGrid from './ApplicationGrid';
import ApplicationEmptyState from './ApplicationEmptyState';
import ApplicationListSkeleton from './ApplicationListSkeleton';

interface ApplicationListProps {
  applications: JobApplication[];
  isLoading?: boolean;
  error?: string | null;
}

const ApplicationList = ({
  applications,
  isLoading = false,
  error = null,
}: ApplicationListProps) => {
  if (isLoading) {
    return <ApplicationListSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return <ApplicationEmptyState />;
  }

  return (
    <JobApplicationGrid>
      {applications.map((application) => (
        <JobApplicationCard key={application.id} data={application} />
      ))}
    </JobApplicationGrid>
  );
};

export default ApplicationList;
