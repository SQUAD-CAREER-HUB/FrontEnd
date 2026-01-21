import { BookMarkedIcon } from 'lucide-react';

export default function EmptyQuestion() {
  return (
    <div className='text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800'>
      <BookMarkedIcon className='w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3' />
      <p className='text-slate-500 dark:text-slate-400 font-medium'>
        검색 결과가 없거나 저장된 질문이 없습니다.
      </p>
    </div>
  );
}
