'use client';

import { useInView } from '@/shared/hooks/useInView';
import { useQuestions } from '../hooks/useQuestions';
import EmptyQuestion from './EmptyQuestion';
import { QuestionItem } from './QuestionItem';
import { useEffect } from 'react';
import { Loader2Icon } from 'lucide-react';
import { QuestionListSkeleton } from './QuestionListSkeleton';

export default function QuestionList() {
  const {
    query: { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading },
  } = useQuestions();

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 첫 로딩 시 스켈레톤 표시
  if (isLoading) {
    return <QuestionListSkeleton />;
  }

  // 데이터가 비어있을 때 (data가 undefined일 수 있으므로 옵셔널 체이닝 확인)
  const questions = data?.questions || [];
  if (questions.length === 0) {
    return <EmptyQuestion />;
  }

  return (
    <div className='space-y-4'>
      {questions.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}

      {/* 무한 스크롤 트리거 요소 */}
      {hasNextPage && (
        <div ref={ref} className='h-10 flex justify-center items-center'>
          {isFetchingNextPage && (
            <Loader2Icon className='w-6 h-6 animate-spin text-slate-400' />
          )}
        </div>
      )}
    </div>
  );
}
