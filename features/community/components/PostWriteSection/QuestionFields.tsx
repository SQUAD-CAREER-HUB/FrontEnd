import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, X } from 'lucide-react';

import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { PostWriteFormValues } from '@/features/community/schema/post-write-form';

export default function QuestionFields() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<PostWriteFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'questions',
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({ content: '' });
    }
  }, [fields.length, append]);

  return (
    <div className='space-y-1.5'>
      <Label className='block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5 ml-1'>
        받았던 질문 (최소 1개 필수) <span className='text-red-500'>*</span>
      </Label>

      <div className='space-y-2'>
        {fields.map((field, idx) => (
          <div key={field.id} className='space-y-1'>
            <div className='flex gap-2 items-center'>
              {/* 2. Input 컴포넌트 적용 + 디자인 클래스 주입 */}
              <Input
                {...register(`questions.${idx}.content` as const)}
                className={cn(
                  // 1. 기본 구조 스타일
                  'flex-1 p-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm transition-all outline-none h-auto',

                  // 2. 포커스 스타일 통일 (Shadcn 기본 ring 무시하고 우리 브랜드 컬러 적용)
                  'focus-visible:ring-1 focus-visible:ring-brand-500 focus-visible:border-brand-500',

                  // 3. 에러 상태에 따른 스타일 분기
                  errors.questions?.[idx]?.content
                    ? 'border-red-500 focus-visible:ring-red-100'
                    : 'border-slate-200 dark:border-slate-700',

                  'dark:text-slate-100 placeholder:text-slate-400'
                )}
                placeholder={`${idx + 1}번째 질문 입력...`}
              />

              {/* 삭제 버튼 (기본 구조 유지) */}
              {fields.length > 1 && idx !== 0 && (
                <Button
                  type='button'
                  onClick={() => remove(idx)}
                  className='shrink-0 p-1 text-slate-400 hover:text-red-500 transition-colors hover:bg-red-50'
                  size='icon'
                  variant='ghost'
                >
                  <X className='w-4 h-4' />
                </Button>
              )}
            </div>

            {/* 에러 메시지 */}
            {errors.questions?.[idx] && (
              <p className='text-[10px] text-red-500 ml-1'>
                {errors.questions[idx]?.message || '질문을 입력해 주세요.'}
              </p>
            )}
          </div>
        ))}

        {/* 3. 질문 추가 버튼 스타일 일치 */}
        <Button
          variant='ghost'
          type='button'
          onClick={() => append({ content: '' })}
          className='text-xs font-bold text-brand-500 hover:text-brand-600 flex items-center px-1 transition-colors mt-1'
        >
          <Plus className='w-3 h-3 mr-1' aria-hidden='true' />
          질문 추가
        </Button>
      </div>
    </div>
  );
}
