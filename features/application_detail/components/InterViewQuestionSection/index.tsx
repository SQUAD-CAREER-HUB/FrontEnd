'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { BookMarked, Loader2 } from 'lucide-react';

import { useGetInterviewQuestions } from '../../hooks/useGetInterviewQuestions';
import InterViewQuestionModal from './InterViewQuestionModal';
import InterViewQuestionCard from './InterViewQuestionCard';

export default function InterViewQuestionSection() {
  const params = useParams();
  const applicationId = Number(params.id);
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInterviewQuestions({
    applicationId,
    linkStatus: 'LINKED',
  });

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
      rootMargin: '50px',
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleObserver]);

  const questions = data?.pages.flatMap((page) => page.contents) ?? [];


  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
          <BookMarked className="w-5 h-5 text-slate-400" />
          <span>면접 질문</span>
        </h2>
        <InterViewQuestionModal applicationId={applicationId} />
      </div>
      <div className="space-y-3 overflow-y-auto max-h-[300px] custom-scrollbar">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
          </div>
        ) : questions.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">
            등록된 면접 질문이 없습니다.
          </p>
        ) : (
          <>
            {questions.map((item) => (
              <InterViewQuestionCard
                key={item.questionArchiveId}
                applicationId={applicationId}
                questionArchiveId={item.questionArchiveId}
                interviewType={item.interviewType}
                question={item.question}
                memo={item.memo}
              />
            ))}
            <div ref={observerRef} className="w-full py-2 flex justify-center">
              {isFetchingNextPage && (
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
