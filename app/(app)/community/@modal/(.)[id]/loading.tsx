export default function PostDetailLoading() {
  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm'>
      {/* 실제 모달의 max-w-4xl, h-[90vh] 디자인을 그대로 복사 */}
      <div className='max-w-4xl w-full h-[90vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden flex flex-col shadow-2xl mx-4'>
        {/* 헤더 스켈레톤 */}
        <div className='p-8 pb-6 border-b border-slate-50 dark:border-slate-800 shrink-0'>
          <div className='flex gap-2 mb-4'>
            <div className='w-20 h-4 bg-slate-100 dark:bg-slate-800 animate-pulse rounded' />
            <div className='w-20 h-4 bg-slate-100 dark:bg-slate-800 animate-pulse rounded' />
          </div>
          <div className='w-2/3 h-8 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg' />
          <div className='w-40 h-4 mt-4 bg-slate-50 dark:bg-slate-800 animate-pulse rounded' />
        </div>

        {/* 본문 스켈레톤 */}
        <div className='flex-1 p-8 space-y-8'>
          <div className='space-y-4'>
            <div className='w-32 h-6 bg-slate-100 dark:bg-slate-800 animate-pulse rounded' />
            <div className='space-y-3'>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className='w-full h-16 bg-slate-50 dark:bg-slate-800/50 animate-pulse rounded-2xl'
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
