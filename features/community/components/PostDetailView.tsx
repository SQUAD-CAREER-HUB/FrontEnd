'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookmarkPlusIcon,
  BrainCircuitIcon,
  BriefcaseIcon,
  Building2Icon,
  CircleUserRoundIcon,
  MessageSquareIcon,
} from 'lucide-react';

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useGetReviewDetail } from '../hooks/useGetReviewDetail';
import { PostListItemMenu } from './SearchablePostList/PostListItemMenu';
import { useConfirmStore } from '@/shared/stores/useConfirmStore';
import { PostReportModal } from './PostReportModal';
import { useDeleteReview } from '../hooks/useDeleteReview';

/**
 *
 * - useGetReviewDetail을 사용하여 데이터를 렌더링합니다.
 */
export default function PostDetailView({ postId }: { postId: number }) {
  const { data } = useGetReviewDetail(postId);
  const { mutate: deleteReview, isPending } = useDeleteReview();
  const router = useRouter();
  const { openConfirm } = useConfirmStore();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleEdit = () => {
    router.push(`/community/${postId}/edit`);
  };

  const handleDelete = () => {
    openConfirm({
      title: '후기 삭제',
      description: '삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
      variant: 'destructive',
      onConfirm: () => {
        deleteReview(postId, {
          onSuccess: () => {
            router.back();
          },
        });
      },
    });
  };

  return (
    <>
      {/* 상단 고정 헤더 */}
      <DialogHeader className='p-8 pb-6 border-b border-slate-50 dark:border-slate-800 space-y-0 shrink-0'>
        <div className='flex items-center gap-2 text-xs font-bold text-brand-500 mb-2'>
          <Building2Icon className='w-4 h-4' />
          <span className='truncate'>{data.companyName}</span>
          <span className='text-slate-300 dark:text-slate-700'>|</span>
          <BriefcaseIcon className='w-4 h-4' />
          <span className='truncate'>{data.position}</span>
        </div>

        <DialogTitle className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
          {data.interviewType} 후기
        </DialogTitle>

        <DialogDescription className='flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400'>
          <span className='flex items-center gap-1'>
            <CircleUserRoundIcon className='w-3.5 h-3.5' /> {data.authorName}
          </span>
          <span>{data.createdAt}</span>
        </DialogDescription>
      </DialogHeader>

      {/* 본문 스크롤 영역 */}
      <div className='flex-1 overflow-y-auto p-8 pt-6 space-y-8 custom-scrollbar animate-fade-in-up'>
        {/* 질문 리스트 섹션 */}
        <section>
          <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2'>
            <BrainCircuitIcon className='w-5 h-5 text-brand-500' />
            면접 질문 리스트
          </h3>
          <div className='space-y-3'>
            {data.questions?.map((question, idx) => (
              <div
                key={question.id}
                className='p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex justify-between items-center group/item transition-colors hover:border-brand-200'
              >
                <div className='flex gap-3 flex-1 min-w-0'>
                  <span className='text-brand-500 font-bold shrink-0'>
                    Q{idx + 1}.
                  </span>
                  <p className='text-slate-800 dark:text-slate-200 font-medium leading-relaxed'>
                    {question.content}
                  </p>
                </div>
                <button className='ml-4 p-2 bg-white dark:bg-slate-700 text-slate-400 hover:text-brand-500 rounded-xl shadow-sm border border-slate-100 dark:border-slate-600 transition-all md:opacity-0 md:group-hover/item:opacity-100 flex items-center gap-1.5 whitespace-nowrap text-xs font-bold'>
                  <BookmarkPlusIcon className='w-4 h-4' />
                  저장하기
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 상세 후기 섹션 */}
        <section>
          <h3 className='text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2'>
            <MessageSquareIcon className='w-5 h-5 text-brand-500' />
            상세 후기
          </h3>
          <div className='bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed whitespace-pre-wrap'>
            {data.content}
          </div>
        </section>

        {/* 하단 푸터 (신고하기/수정/삭제 등) */}
        <div className='relative py-6 border-t border-slate-100 dark:border-slate-800 flex justify-end items-center'>
          <PostListItemMenu
            isMyPost={data.isMine}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReport={() => setIsReportModalOpen(true)}
          />
        </div>
      </div>

      <PostReportModal
        postId={Number(postId)}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </>
  );
}
