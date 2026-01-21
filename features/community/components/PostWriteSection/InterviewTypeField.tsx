import { useFormContext } from 'react-hook-form';
import { ClipboardCheck } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { cn } from '@/shared/lib/utils';
import { PostWriteFormValues } from '@/features/community/schema/post-write-form';

export default function InterviewTypeField() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<PostWriteFormValues>();

  const selectedValue = watch('interviewType');
  const interviewOptions = [
    '1차 면접',
    '2차 면접',
    '기술 면접',
    '컬처핏 면접',
    '임원 면접',
    '인사 면접',
    '최종 면접',
    '직접 입력',
  ];
  const isCustomInput =
    selectedValue === '직접 입력' ||
    (selectedValue && !interviewOptions.includes(selectedValue));

  return (
    <div className='space-y-1.5'>
      <Label className='block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5 ml-1'>
        면접 종류 <span className='text-red-500'>*</span>
      </Label>

      <div className='relative z-[100]'>
        <ClipboardCheck className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-20' />

        <Select
          onValueChange={(val) => setValue('interviewType', val)}
          value={
            interviewOptions.includes(selectedValue)
              ? selectedValue
              : '직접 입력'
          }
        >
          {/* 1. 디자인에 있던 파란색 테두리와 링(Ring) 효과 그대로 적용 */}
          <SelectTrigger
            className={cn(
              'w-full flex items-center justify-between pl-9 pr-3 py-2.5 bg-white dark:bg-slate-800 border rounded-xl text-left transition-all cursor-pointer text-sm outline-none',
              'focus:ring-1 focus:ring-brand-500 focus:border-brand-500',
              'data-[state=open]:ring-1 data-[state=open]:ring-brand-500 data-[state=open]:border-brand-500',
              errors.interviewType
                ? 'border-red-500 ring-2 ring-red-100 focus:ring-red-100 data-[state=open]:ring-red-100'
                : 'border-slate-200 dark:border-slate-700',
              'text-slate-700 dark:text-slate-200'
            )}
          >
            <div className='block truncate'>
              <SelectValue placeholder='면접 단계를 선택해 주세요' />
            </div>
          </SelectTrigger>

          {/* 3. 드롭다운 박스: custom-scrollbar 적용 및 그림자 효과 */}
          <SelectContent
            className='z-[100] mt-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar animate-fade-in-up'
            position='popper'
          >
            <div className='p-1'>
              {interviewOptions.map((type) => {
                const isSelected = selectedValue === type;
                return (
                  <SelectItem
                    key={type}
                    value={type}
                    // 4. 선택된 아이템의 특수한 배경색과 글자색 (brand-50)
                    className={cn(
                      'px-3 py-2 rounded-lg cursor-pointer flex items-center justify-between text-sm transition-colors mb-0.5 last:mb-0 outline-none',
                      isSelected
                        ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 font-bold'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                    )}
                  >
                    <span className='truncate'>{type}</span>
                  </SelectItem>
                );
              })}
            </div>
          </SelectContent>
        </Select>
      </div>

      {isCustomInput && (
        <div className='animate-in fade-in slide-in-from-top-1 duration-200'>
          <Input
            {...register('interviewType')}
            placeholder='면접 종류를 직접 입력해 주세요'
            className='mt-2 w-full p-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all'
            // 만약 '직접 입력'이라는 글자가 찍혀있다면 지워주기 위한 초기화 로직이 필요할 수 있습니다.
            onChange={(e) => setValue('interviewType', e.target.value)}
          />
        </div>
      )}

      {errors.interviewType && (
        <p className='text-[10px] text-red-500 mt-1 ml-1'>
          {errors.interviewType.message}
        </p>
      )}
    </div>
  );
}
