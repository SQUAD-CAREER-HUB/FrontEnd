'use client';

import { useEffect, useRef, useCallback } from 'react';
import ApplicationCard from './ApplicationCard';
import ApplicationGrid from './ApplicationGrid';
import ApplicationEmptyState from './ApplicationEmptyState';
import ApplicationListSkeleton from './ApplicationListSkeleton';
import { useGetApplications, ApplicationsFilter } from '../hooks/useGetApplications';
import { Loader2 } from 'lucide-react';

interface ApplicationListProps {
  filter?: ApplicationsFilter;
}

const ApplicationList = ({ filter = {} }: ApplicationListProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetApplications(filter);

  // Intersection Observer로 무한스크롤 구현
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
      rootMargin: '100px',
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  if (isLoading) {
    return <ApplicationListSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-red-500 dark:text-red-400 text-sm">
          {error.message || '데이터를 불러오는 중 오류가 발생했습니다.'}
        </p>
      </div>
    );
  }

  const applications = data?.pages.flatMap((page) => page.contents) ?? [];

  if (applications.length === 0) {
    return <ApplicationEmptyState />;
  }

  return (
    <>
      <ApplicationGrid>
        {applications.map((application) => (
          <ApplicationCard key={application.applicationId} data={application} />
        ))}
      </ApplicationGrid>

      {/* 무한스크롤 트리거 영역 */}
      <div ref={observerRef} className="w-full py-4 flex justify-center">
        {isFetchingNextPage && (
          <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
        )}
      </div>
    </>
  );
};

export default ApplicationList;
