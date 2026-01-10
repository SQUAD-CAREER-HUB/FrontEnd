import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import JobApplicationGrid from './ApplicationGrid';

const ApplicationCardSkeleton = () => {
  return (
    <Card className="relative rounded-2xl gap-6 p-5 border flex flex-col justify-between min-h-[180px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <CardHeader className="flex justify-between items-start gap-0 px-0 mb-0">
        <div className="flex-1 min-w-0">
          <div className="h-6 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-2" />
          <div className="h-4 w-48 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-1.5 shrink-0 ml-4">
          <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-5 w-16 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col px-0">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-40 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-4 w-56 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
          <div className="h-4 w-32 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
        </div>
      </CardContent>
      <CardFooter className="mt-4 pt-3 px-0 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <div className="h-4 w-16 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
      </CardFooter>
    </Card>
  );
};

const ApplicationListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <JobApplicationGrid>
      {Array.from({ length: count }).map((_, index) => (
        <ApplicationCardSkeleton key={index} />
      ))}
    </JobApplicationGrid>
  );
};

export default ApplicationListSkeleton;
