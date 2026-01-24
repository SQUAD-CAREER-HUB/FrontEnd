'use client';

import Link from 'next/link';
import { FileX } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';

export default function ApplicationNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-slate-100 p-4 dark:bg-slate-800">
          <FileX className="size-12 text-slate-400 dark:text-slate-500" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            지원서를 찾을 수 없습니다
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            요청하신 지원서가 존재하지 않거나 삭제되었습니다.
          </p>
        </div>
      </div>
      <Button asChild variant="outline">
        <Link href="/applications">지원서 목록으로 돌아가기</Link>
      </Button>
    </div>
  );
}
