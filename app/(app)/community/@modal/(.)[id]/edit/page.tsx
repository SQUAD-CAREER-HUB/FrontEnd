'use client';

import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import PostEditView from '@/features/community/components/PostEditView';
import { use } from 'react';

export default function EditModalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const { id } = use(params);

  return (
    <Dialog open onOpenChange={() => router.back()}>
      {/* p-0과 border-none을 사용하여 내부 Form 컴포넌트의 디자인이 
         다이얼로그 전체를 꽉 채우도록 설정합니다.
      */}
      <DialogContent className='max-w-2xl p-0 bg-white dark:bg-slate-900 border-none rounded-3xl overflow-hidden shadow-2xl'>
        <DialogTitle className='sr-only'>후기 수정하기</DialogTitle>
        <PostEditView postId={id} mode='modal' />
      </DialogContent>
    </Dialog>
  );
}
