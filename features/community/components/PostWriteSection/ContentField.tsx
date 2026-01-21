import { useFormContext } from 'react-hook-form';

import { Textarea } from '@/shared/components/ui/textarea';
import { cn } from '@/shared/lib/utils';
import { Label } from '@/shared/components/ui/label';
import { PostWriteFormValues } from '@/features/community/schema/post-write-form';

export default function ContentField() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostWriteFormValues>();

  return (
    <div className='space-y-1.5'>
      <Label
        htmlFor='content'
        className='text-xs font-bold text-slate-900 dark:text-slate-100 ml-1'
      >
        상세 후기 <span className='text-red-500'>*</span>
      </Label>

      <Textarea
        {...register('content')}
        className={cn(
          'w-full p-4 bg-slate-50 dark:bg-slate-800 border rounded-2xl text-sm transition-all outline-none resize-none min-h-[140px]',

          'focus-visible:ring-1 focus-visible:ring-brand-500 focus-visible:border-brand-500',

          // 에러 상태 스타일
          errors.content
            ? 'border-red-500 ring-2 ring-red-100 focus:ring-red-100'
            : 'border-slate-200 dark:border-slate-700',

          'dark:text-slate-100 placeholder:text-slate-400'
        )}
        placeholder='면접 분위기, 질문의 난이도, 면접관의 반응 등을 자세히 공유해주세요.'
      />
      {errors.content && (
        <p className='text-[10px] text-red-500 ml-1'>
          {errors.content.message}
        </p>
      )}
    </div>
  );
}
