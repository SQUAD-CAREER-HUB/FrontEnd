import { useFormContext } from 'react-hook-form';
import { Loader2Icon, SaveIcon, SendIcon } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

interface PostWriteFooterProps {
  onClose: () => void;
  isEdit?: boolean;
  isUpdating?: boolean;
  isCreating?: boolean;
}

export default function PostWriteFooter({
  onClose,
  isEdit,
  isUpdating,
  isCreating,
}: PostWriteFooterProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const isLoading = isSubmitting || isUpdating || isCreating;

  const submitText = isEdit ? '수정하기' : '등록하기';
  const loadingText = isEdit ? '수정 중...' : '등록 중...';
  const SubmitIcon = isEdit ? SaveIcon : SendIcon;

  return (
    <div className='flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-2'>
      {/* 왼쪽: 추가 도구 (이미지, 이모지 등) */}
      <div className='flex items-center text-slate-400'>
        {/* <Button
          type='button'
          variant='ghost'
          className='p-2 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-500 rounded-full transition-colors'
        >
          <ImageIcon className='w-5 h-5' />
        </Button>
        <Button
          type='button'
          variant='ghost'
          className='p-2 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-500 rounded-full transition-colors'
        >
          <Smile className='w-5 h-5' />
        </Button> */}
      </div>

      {/* 오른쪽: 액션 버튼 */}
      <div className='flex gap-2'>
        <Button
          type='button'
          onClick={onClose}
          variant='ghost'
          disabled={isLoading}
          className='px-4 py-2 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-sm transition-colors'
        >
          취소
        </Button>
        <Button
          type='submit'
          disabled={isLoading}
          className='px-6 py-2.5 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-600 shadow-md transition-all flex items-center gap-2 text-sm disabled:opacity-50'
        >
          {isLoading ? (
            <>
              <Loader2Icon className='w-4 h-4 animate-spin' />
              {loadingText}
            </>
          ) : (
            <>
              <SubmitIcon className='w-4 h-4' />
              {submitText}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
