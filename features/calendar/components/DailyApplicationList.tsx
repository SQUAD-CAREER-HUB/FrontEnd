import { format } from 'date-fns';

import { useGetApplicationsByDate } from '../hooks/useGetApplicationsByDate';
import DailyApplicationListEmptyState from './DailyApplicationListEmptyState';
import ApplicationCard from '@/features/applications/components/ApplicationCard';

export default function DailyApplicationList({
  selectedDate,
}: {
  selectedDate: Date;
}) {
  const targetDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

  const { data } = useGetApplicationsByDate(targetDate);

  if (data.length === 0) return <DailyApplicationListEmptyState />;

  return (
    <div className='flex flex-col gap-2 max-h-[400px] overflow-y-auto'>
      {data.map((application) => (
        <ApplicationCard key={application.applicationId} data={application} />
      ))}
    </div>
  );
}
