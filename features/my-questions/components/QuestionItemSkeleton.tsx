import { Skeleton } from '@/shared/components/ui/skeleton';

export const QuestionItemSkeleton = () => {
  return (
    <div className='bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm'>
      <div className='flex justify-between items-start'>
        <div className='flex-1'>
          {/* 상단 메타 정보 (회사, 직무 등) */}
          <div className='flex items-center gap-2 mb-3'>
            <Skeleton className='h-3 w-16' />
            <Skeleton className='h-3 w-3' />
            <Skeleton className='h-3 w-20' />
            <Skeleton className='h-3 w-3' />
            <Skeleton className='h-3 w-12' />
          </div>

          {/* 질문 제목 (2줄 정도 예상) */}
          <div className='space-y-2'>
            <Skeleton className='h-5 w-[80%]' />
            <Skeleton className='h-5 w-[40%]' />
          </div>

          {/* 메모 부분 */}
          <div className='mt-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg'>
            <Skeleton className='h-4 w-full' />
          </div>
        </div>

        {/* 우측 버튼 아이콘 자리 */}
        <div className='flex space-x-2 ml-4'>
          <Skeleton className='h-9 w-9 rounded-lg' />
          <Skeleton className='h-9 w-9 rounded-lg' />
        </div>
      </div>

      {/* 하단 날짜 */}
      <div className='mt-4 flex justify-end'>
        <Skeleton className='h-2 w-16' />
      </div>
    </div>
  );
};
