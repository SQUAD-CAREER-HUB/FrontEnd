'use client';

import { useEffect } from 'react';

import { useInView } from '@/shared/hooks/useInView';
import { useGetReviews } from '@/features/community/hooks/useGetReviews';
import PostListItem from './PostListItem';

interface Props {
  query: string;
  sort: 'NEWEST' | 'OLDEST';
}

export default function PostList({ query, sort }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetReviews({ query, sort });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className='space-y-4'>
        {/* Skeleton UI가 들어갈 자리입니다. 임시로 로딩 표시 */}
        <div className='animate-pulse flex flex-col gap-4'>
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className='h-40 bg-slate-100 dark:bg-slate-800 rounded-2xl'
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-center py-10 text-slate-500'>
        데이터를 불러오지 못했습니다.
      </div>
    );
  }

  // 4. 데이터가 아예 없는 경우 처리
  // useInfiniteQuery에서 데이터가 비어있을 때의 체크
  const isEmpty = data?.pages[0].posts.length === 0;

  if (isEmpty) {
    return (
      <div className='text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800'>
        <p className='text-slate-500 dark:text-slate-400'>
          검색 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 gap-6'>
      {data?.pages.map((page, i) => (
        <div key={i} className='contents'>
          {/* 의미 없는 div 생성을 피하기 위해 contents 클래스 사용 */}
          {page.posts.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </div>
      ))}

      <div ref={ref} className='py-4 text-center'>
        {isFetchingNextPage && (
          <p className='text-sm text-slate-500 animate-bounce'>
            더 불러오는 중...
          </p>
        )}
      </div>
    </div>
  );
}
