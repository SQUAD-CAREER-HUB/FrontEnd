import { Building2Icon, BriefcaseIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { cn } from '@/shared/lib/utils';
import { PostWriteFormValues } from '@/features/community/schema/post-write-form';

export default function CompanyJobFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<PostWriteFormValues>();

  const inputBaseStyles = cn(
    'w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm transition-all outline-none',
    'focus-visible:ring-1 focus-visible:ring-brand-500 focus-visible:ring-offset-0 focus-visible:border-brand-500',
    'placeholder:text-slate-400'
  );

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
      <div className='space-y-1.5'>
        <Label htmlFor='companyName' className='text-xs font-bold ml-1'>
          회사명 <span className='text-red-500'>*</span>
        </Label>
        <div className='relative'>
          <Building2Icon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10' />
          <Input
            {...register('companyName')}
            className={cn(
              inputBaseStyles,
              errors.companyName
                ? 'border-red-500'
                : 'border-slate-200 dark:border-slate-700'
            )}
            placeholder='회사명 입력해주세요.'
          />
        </div>
        {errors.companyName && (
          <p className='text-xs text-red-500 mt-1 ml-1'>
            {errors.companyName.message}
          </p>
        )}
      </div>

      <div className='space-y-1.5'>
        <Label htmlFor='position' className='text-xs font-bold ml-1'>
          직무 <span className='text-red-500'>*</span>
        </Label>
        <div className='relative'>
          <BriefcaseIcon className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10' />
          <Input
            {...register('position')}
            className={cn(
              inputBaseStyles,
              errors.position
                ? 'border-red-500'
                : 'border-slate-200 dark:border-slate-700'
            )}
            placeholder='직무를 입력해주세요.'
          />
        </div>
        {errors.position && (
          <p className='text-xs text-red-500 mt-1 ml-1'>
            {errors.position.message}
          </p>
        )}
      </div>
    </div>
  );
}
