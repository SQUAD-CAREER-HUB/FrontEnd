import PostEditView from '@/features/community/components/PostEditView';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = await params;

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 pb-20'>
      <div className='max-w-4xl mx-auto px-4 pt-10'>
        {/* 상단 네비게이션 */}
        <Link
          href={`/community/${postId}`}
          className='flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-6 w-fit'
        >
          <ChevronLeftIcon className='w-4 h-4' />
          상세 페이지로 돌아가기
        </Link>

        {/* 메인 수정 카드 */}
        <section className='bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden'>
          <div className='p-8 border-b border-slate-50 dark:border-slate-800'>
            <h1 className='text-2xl font-bold text-slate-900 dark:text-slate-100'>
              후기 수정하기
            </h1>
            <p className='text-sm text-slate-500 mt-1'>
              작성하신 면접 후기의 내용을 수정할 수 있습니다.
            </p>
          </div>

          <div className='p-8'>
            <PostEditView postId={postId} mode='page' />
          </div>
        </section>
      </div>
    </div>
  );
}
