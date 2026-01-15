'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { useGetReviewDetail } from '@/features/community/hooks/useGetReviewDetail';
import PostWriteForm from './PostWriteSection/PostWriteForm';
import { PostWriteFormValues } from '../schema/post-write-form';

interface Props {
  postId: number;
  mode: 'modal' | 'page';
}

export default function PostEditView({ postId, mode }: Props) {
  const router = useRouter();
  const { data } = useGetReviewDetail(postId);

  const initialData: PostWriteFormValues = {
    companyName: data.companyName,
    position: data.position,
    interviewType: data.interviewType,
    questions: data.questions,
    content: data.content,
  };

  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900 w-full rounded-3xl transition-colors',
        mode === 'modal'
          ? 'max-w-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto animate-fade-in-up border border-slate-100 dark:border-slate-800'
          : 'p-0'
      )}
    >
      {/* 모달 모드일 때만 표시되는 헤더 */}
      {mode === 'modal' && (
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
            후기 수정하기
          </h2>
        </div>
      )}

      <PostWriteForm
        onClose={() => router.back()}
        isEdit
        initialData={initialData}
        postId={postId}
      />
    </div>
  );
}
