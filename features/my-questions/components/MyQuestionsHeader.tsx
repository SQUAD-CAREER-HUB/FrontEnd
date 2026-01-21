'use client';

import { BookMarkedIcon, PlusIcon } from 'lucide-react';
import { useQuestionModalStore } from '../store/useQuestionModalStore';

export default function MyQuestionsHeader() {
  const openCreateModal = useQuestionModalStore(
    (state) => state.openCreateModal
  );

  const handleClickAddQuestionButton = () => {
    openCreateModal();
  };

  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
      <div>
        <h1 className='text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center'>
          <BookMarkedIcon className='w-6 h-6 mr-2 text-brand-500' />
          나만의 면접 질문 모음
        </h1>
        <p className='text-slate-500 dark:text-slate-400 mt-1'>
          커뮤니티에서 저장한 면접 질문들을 복습해보세요.
        </p>
      </div>
      <button
        onClick={handleClickAddQuestionButton}
        className='px-4 py-2.5 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 flex items-center space-x-2 transition-all shadow-lg'
      >
        <PlusIcon className='w-5 h-5' />
        <span>질문 추가</span>
      </button>
    </div>
  );
}
