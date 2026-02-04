'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DropDown } from '@/shared/components/DropDown';
import { Button } from '@/shared/components/ui/button';
import { DialogFooter } from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Textarea } from '@/shared/components/ui/textarea';

import { DIRECT_INPUT_VALUE, interviewOptions } from '../../../../constants';
import {
  interviewQuestionSchema,
  InterviewQuestionFormValues,
} from '../../../../constants/schema';
import { useCreateInterviewQuestion } from '../../../../hooks/useCreateInterviewQuestion';
import { useUpdateInterviewQuestion } from '../../../../hooks/useUpdateInterviewQuestion';

export interface InterviewQuestionInitialData {
  questionArchiveId: number;
  interviewType: string;
  question: string;
  memo: string;
}

interface InterViewQuestionFormProps {
  applicationId: number;
  mode: 'create' | 'edit';
  initialData?: InterviewQuestionInitialData;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function InterViewQuestionForm({
  applicationId,
  mode,
  initialData,
  onSuccess,
  onCancel,
}: InterViewQuestionFormProps) {
  const isEditMode = mode === 'edit';

  // 초기 interviewType이 옵션 목록에 있는지 확인
  const getInitialSelectedOption = () => {
    if (!initialData?.interviewType) return '';
    const isPresetOption = interviewOptions.some(
      (opt) => opt.value === initialData.interviewType && opt.value !== DIRECT_INPUT_VALUE
    );
    return isPresetOption ? initialData.interviewType : DIRECT_INPUT_VALUE;
  };

  const getInitialCustomType = () => {
    if (!initialData?.interviewType) return '';
    const isPresetOption = interviewOptions.some(
      (opt) => opt.value === initialData.interviewType && opt.value !== DIRECT_INPUT_VALUE
    );
    return isPresetOption ? '' : initialData.interviewType;
  };

  const [selectedOption, setSelectedOption] = useState(getInitialSelectedOption);
  const [customInterviewType, setCustomInterviewType] = useState(getInitialCustomType);

  const { mutate: createMutate, isPending: isCreating } = useCreateInterviewQuestion();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateInterviewQuestion();

  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<InterviewQuestionFormValues>({
    resolver: zodResolver(interviewQuestionSchema),
    defaultValues: {
      applicationId,
      interviewType: initialData?.interviewType ?? '',
      question: initialData?.question ?? '',
      memo: initialData?.memo ?? '',
    },
  });

  // 초기 데이터가 변경될 때 폼 값 업데이트
  useEffect(() => {
    if (initialData) {
      setValue('interviewType', initialData.interviewType);
      setValue('question', initialData.question);
      setValue('memo', initialData.memo);
      setSelectedOption(getInitialSelectedOption());
      setCustomInterviewType(getInitialCustomType());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  const isDirectInput = selectedOption === DIRECT_INPUT_VALUE;

  const handleInterviewTypeChange = (value: string) => {
    setSelectedOption(value);
    if (value !== DIRECT_INPUT_VALUE) {
      setValue('interviewType', value);
      setCustomInterviewType('');
    } else {
      setValue('interviewType', '');
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomInterviewType(value);
    setValue('interviewType', value);
  };

  const resetForm = () => {
    reset();
    setSelectedOption('');
    setCustomInterviewType('');
  };

  const onSubmit = (data: InterviewQuestionFormValues) => {
    if (isEditMode && initialData) {
      updateMutate(
        {
          questionArchiveId: initialData.questionArchiveId,
          data: {
            applicationId: data.applicationId,
            interviewType: data.interviewType,
            question: data.question,
            memo: data.memo,
          },
        },
        {
          onSuccess: () => {
            onSuccess();
          },
        }
      );
    } else {
      createMutate(data, {
        onSuccess: () => {
          resetForm();
          onSuccess();
        },
      });
    }
  };

  const handleCancel = () => {
    if (!isEditMode) {
      resetForm();
    }
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-5">
        <div>
          <Label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
            면접 전형 선택
          </Label>
          <DropDown
            options={interviewOptions}
            value={selectedOption}
            onValueChange={handleInterviewTypeChange}
          />
          {isDirectInput && (
            <Input
              placeholder="면접 전형 직접 입력..."
              value={customInterviewType}
              onChange={handleCustomInputChange}
              className="w-full mt-2 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white"
            />
          )}
          {errors.interviewType && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {errors.interviewType.message}
            </p>
          )}
        </div>

        <div>
          <Label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
            질문 내용
          </Label>
          <Textarea
            {...register('question')}
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white h-24 focus:ring-2 focus:ring-brand-500 outline-none"
            placeholder="면접관이 물어본 질문을 적어주세요."
          />
          {errors.question && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {errors.question.message}
            </p>
          )}
        </div>

        <div>
          <Label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
            메모 및 답변 포인트
          </Label>
          <Textarea
            {...register('memo')}
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white h-20 focus:ring-2 focus:ring-brand-500 outline-none"
            placeholder="답변 키워드나 주의사항을 기록하세요."
          />
          {errors.memo && (
            <p className="text-xs text-red-500 mt-1 ml-1">
              {errors.memo.message}
            </p>
          )}
        </div>

        <DialogFooter className="flex space-x-3 mt-8 mb-0">
          <Button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all hover:bg-slate-200"
          >
            취소
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="flex-1 py-3 bg-brand-500 text-white rounded-xl font-bold transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            {isPending ? '저장 중...' : '저장'}
          </Button>
        </DialogFooter>
      </div>
    </form>
  );
}
