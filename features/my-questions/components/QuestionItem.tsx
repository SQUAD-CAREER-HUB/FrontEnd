'use client';

import { Building2, Briefcase, Edit2, Trash2 } from 'lucide-react';
import { QuestionItem as QuestionItemType } from '../types';
import { useQuestionModalStore } from '../store/useQuestionModalStore';
import { useConfirmStore } from '@/shared/stores/useConfirmStore';
import { useQuestions } from '../hooks/useQuestions';
import { INTERVIEW_LABEL_MAP } from '@/shared/constants/interview';
import { RelativeTime } from '@/shared/components/RelativeTime';

interface QuestionItemProps {
  question: QuestionItemType;
}

export const QuestionItem = ({ question }: QuestionItemProps) => {
  const { deleteMutation } = useQuestions();
  const openEditModal = useQuestionModalStore((state) => state.openEditModal);
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const handleClickEditButton = () => {
    openEditModal(question);
  };

  const handleClickDeleteButton = () => {
    openConfirm({
      title: '정말 삭제하시겠습니까?',
      description:
        '삭제된 질문은 복구할 수 없으며, 모든 답변 데이터가 함께 삭제됩니다.',
      confirmText: '삭제하기',
      variant: 'destructive',
      onConfirm: () => {
        deleteMutation.mutate(question.id);
      },
    });
  };

  return (
    <div className='bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-300 dark:hover:border-brand-700 transition-all group'>
      <div className='flex justify-between items-start'>
        <div className='flex-1 min-w-0'>
          <div className='flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2'>
            <div className='flex items-center gap-1'>
              <Building2 className='w-3.5 h-3.5' />
              <span>{question.company}</span>
            </div>
            <span className='text-slate-300 dark:text-slate-700'>|</span>
            <div className='flex items-center gap-1'>
              <Briefcase className='w-3.5 h-3.5' />
              <span>{question.position}</span>
            </div>
            <span className='text-slate-300 dark:text-slate-700'>|</span>
            <span>{INTERVIEW_LABEL_MAP[question.interviewType]}</span>
          </div>
          <h3 className='text-lg font-bold text-slate-800 dark:text-slate-200 leading-snug wrap-break-words'>
            {question.question}
          </h3>
          {question.answer && (
            <div className='mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg text-sm text-slate-600 dark:text-slate-400'>
              <span className='font-bold text-slate-400 mr-2'>메모</span>
              {question.answer}
            </div>
          )}
        </div>
        <div className='flex items-center space-x-1 ml-4 shrink-0'>
          <button
            onClick={handleClickEditButton}
            className='p-2 text-slate-300 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/30 rounded-lg transition-colors'
            title='수정'
          >
            <Edit2 className='w-5 h-5' />
          </button>
          <button
            onClick={handleClickDeleteButton}
            className='p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors'
            title='삭제'
          >
            <Trash2 className='w-5 h-5' />
          </button>
        </div>
      </div>
      <div className='mt-3 text-[10px] text-slate-400 text-right uppercase tracking-wider'>
        <RelativeTime date={question.updatedAt} />
      </div>
    </div>
  );
};
