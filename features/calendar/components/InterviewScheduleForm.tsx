'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Button } from '@/shared/components/ui/button';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

import { interviewSchema, type InterviewFormValues } from '../constants/schema';

import { INTERVIEW_PRESETS } from '@/shared/constants/interview';
import MyApplicationsSelect from './MyApplicationsSelect';
import { useCreateInterviewSchedule } from '../hooks/useCreateInterviewSchedule';

interface Props {
  selectedDate: Date | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function InterviewScheduleForm({
  selectedDate,
  onSuccess,
  onCancel,
}: Props) {
  const { mutate, isPending } = useCreateInterviewSchedule();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InterviewFormValues>({
    resolver: zodResolver(interviewSchema),
    defaultValues: {
      startedAt: selectedDate ? format(selectedDate, "yyyy-MM-dd'T'HH:mm") : '',
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const interviewType = watch('interviewType');

  const onSubmit = (data: InterviewFormValues) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
    mutate(
      {
        applicationId: data.applicationId,
        location: data.location,
        startedAt: new Date(data.startedAt).toISOString(),
        scheduleName:
          data.interviewType === 'ETC'
            ? data.customInterviewType!
            : data.interviewType,
      },
      { onSuccess }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, (errors) =>
        console.log('유효성 검사 실패 필드:', errors)
      )}
      className='space-y-4 animate-in fade-in duration-300'
    >
      <MyApplicationsSelect
        onValueChange={(val) =>
          setValue('applicationId', val, { shouldValidate: true })
        }
        error={errors.applicationId}
      />

      <div className='flex flex-col gap-y-2'>
        <Label className='font-black text-sm'>면접 종류</Label>
        <Select
          onValueChange={(val) =>
            setValue('interviewType', val, { shouldValidate: true })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='면접 종류 선택' />
          </SelectTrigger>
          <SelectContent>
            {INTERVIEW_PRESETS.map((t) => (
              <SelectItem key={t.value} value={t.value}>
                {t.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {interviewType === 'ETC' && (
          <Input
            {...register('customInterviewType')}
            placeholder='면접 종류 직접 입력'
            className='mt-1'
          />
        )}
        {errors.interviewType && (
          <p className='text-xs text-red-500'>{errors.interviewType.message}</p>
        )}
        {interviewType === 'ETC' && errors.customInterviewType && (
          <p className='text-xs text-red-500'>
            {errors.customInterviewType.message}
          </p>
        )}
      </div>

      <div className='flex flex-col gap-y-2'>
        <Label className='font-black text-sm'>시작일시</Label>
        <Input type='datetime-local' {...register('startedAt')} />
        {errors.startedAt && (
          <p className='text-xs text-red-500'>{errors.startedAt.message}</p>
        )}
      </div>

      <div className='flex flex-col gap-y-2'>
        <Label className='font-black text-sm'>장소 / 링크</Label>
        <Input
          {...register('location')}
          placeholder='Google Meet 링크 또는 본사 주소'
        />
        {errors.location && (
          <p className='text-xs text-red-500'>{errors.location.message}</p>
        )}
      </div>

      <div className='flex justify-end gap-2 pt-4'>
        <Button type='button' variant='outline' onClick={onCancel}>
          취소
        </Button>
        <Button type='submit' disabled={isPending}>
          {isPending ? '추가 중...' : '일정 추가'}
        </Button>
      </div>
    </form>
  );
}
