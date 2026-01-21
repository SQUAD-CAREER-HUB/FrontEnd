'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { useQuestionModalStore } from '../store/useQuestionModalStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { SaveIcon } from 'lucide-react';
import { INTERVIEW_PRESETS } from '@/shared/constants/interview';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { useQuestions } from '../hooks/useQuestions';

const questionSchema = z.object({
  interviewType: z.string().min(1, '면접 종류를 선택해주세요.'),
  companyName: z.string().min(1, '회사명을 입력해주세요.'),
  position: z.string().min(1, '직무를 입력해주세요.'),
  question: z.string().min(1, '질문 내용을 입력해주세요.'),
  answer: z.string().optional(), // API 명세에 따라 추가 가능
});

export type QuestionFormValues = z.infer<typeof questionSchema>;

export const QuestionFormModal = () => {
  const { isOpen, closeModal, mode, selectedQuestion } =
    useQuestionModalStore();
  const { createMutation, updateMutation } = useQuestions();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: '',
      companyName: '',
      position: '',
      interviewType: '',
      answer: '',
    },
  });

  // 모달이 열릴 때/수정 데이터가 들어올 때 폼 초기화
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && selectedQuestion) {
        reset({
          ...selectedQuestion,
          companyName: selectedQuestion.company,
        });
      } else {
        reset({
          question: '',
          companyName: '',
          position: '',
          interviewType: '',
          answer: '',
        });
      }
    }
  }, [isOpen, mode, selectedQuestion, reset]);

  const onSubmit = (data: QuestionFormValues) => {
    if (mode === 'create') {
      createMutation.mutate(data);
    } else {
      if (!selectedQuestion?.id) return;

      updateMutation.mutate({
        id: selectedQuestion.id,
        body: data,
      });
    }
  };

  if (!isOpen) return null;

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? '새 질문 추가' : '질문 수정'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit, (errors) =>
            console.log('검증 실패 원인:', errors)
          )}
          className='space-y-4'
        >
          <div className='space-y-1.5'>
            <Label
              htmlFor='interviewType'
              className='block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5'
            >
              면접 종류 <span className='text-red-500'>*</span>
            </Label>
            <Controller
              name='interviewType'
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id='interviewType'
                    className='w-full h-[50px] rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200'
                  >
                    <SelectValue placeholder='면접 종류를 선택하세요' />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERVIEW_PRESETS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.interviewType && (
              <p className='text-xs text-red-500'>
                {errors.interviewType.message}
              </p>
            )}
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div className='space-y-1.5'>
              <Label
                htmlFor='companyName'
                className='block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5'
              >
                회사명 <span className='text-red-500'>*</span>
              </Label>
              <Input
                {...register('companyName')}
                id='companyName'
                required
                placeholder='회사명 *'
                className='p-3 border rounded-xl bg-slate-50 dark:bg-slate-800'
              />
              {errors.companyName && (
                <p className='text-xs text-red-500'>
                  {errors.companyName.message}
                </p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label
                htmlFor='position'
                className='block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5'
              >
                직무 <span className='text-red-500'>*</span>
              </Label>
              <Input
                {...register('position')}
                id='position'
                required
                placeholder='직무 *'
                className='w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-800'
              />
              {errors.position && (
                <p className='text-xs text-red-500'>
                  {errors.position.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label
              htmlFor='question'
              className='block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5'
            >
              질문 내용 <span className='text-red-500'>*</span>
            </Label>
            <Textarea
              id='question'
              required
              {...register('question')}
              className='w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-800 h-20'
            />
            {errors.question && (
              <p className='text-xs text-red-500'>{errors.question.message}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor='answer'
              className='block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5'
            >
              메모
            </Label>
            <Textarea
              id='answer'
              {...register('answer')}
              className='w-full p-3 border rounded-xl bg-slate-50 dark:bg-slate-800 h-20'
            />
            {errors.answer && (
              <p className='text-xs text-red-500'>{errors.answer.message}</p>
            )}
          </div>

          <div className='flex gap-x-2'>
            <Button
              type='button'
              onClick={closeModal}
              variant='outline'
              className='flex-1'
              disabled={isLoading}
            >
              취소
            </Button>
            <Button
              type='submit'
              variant='default'
              className='flex-1 font-bold flex items-center justify-center'
              disabled={isLoading}
            >
              {isLoading ? (
                <span className='animate-spin mr-2'>...</span>
              ) : (
                <SaveIcon size={16} className='mr-2' />
              )}
              <span>{mode === 'create' ? '저장하기' : '수정 완료'}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
