'use client';

import { useRouter } from 'next/navigation';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import PostDetailView from './PostDetailView';

/**
 * - 모달의 전체적인 레이아웃과 상태 경계(Suspense, ErrorBoundary)를 담당합니다.
 */
export default function PostDetailModal({ postId }: { postId: number }) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={(open) => !open && router.back()}>
      <DialogContent className='max-w-4xl  p-0 overflow-hidden bg-white dark:bg-slate-900 border-none shadow-2xl rounded-3xl flex flex-col'>
        <PostDetailView postId={postId} />
      </DialogContent>
    </Dialog>
  );
}
