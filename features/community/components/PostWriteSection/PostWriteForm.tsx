import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import CompanyJobFields from './CompanyJobFields';
import QuestionFields from './QuestionFields';
import InterviewTypeField from './InterviewTypeField';
import ContentField from './ContentField';
import PostWriteFooter from './PostWriteFooter';
import { useCreateReview } from '@/features/community/hooks/useCreateReview';
import { useUpdateReview } from '@/features/community/hooks/useUpdateReview';
import {
  PostWriteFormValues,
  postWriteSchema,
} from '@/features/community/schema/post-write-form';

interface PostWriteFormProps {
  onClose: () => void;
  initialData?: PostWriteFormValues;
  isEdit?: boolean;
  postId?: number;
}

export default function PostWriteForm({
  onClose,
  initialData,
  isEdit,
  postId,
}: PostWriteFormProps) {
  const { mutate: createReview, isPending: isCreating } = useCreateReview();
  const { mutate: updateReview, isPending: isUpdating } = useUpdateReview(
    Number(postId)!
  );

  const methods = useForm<PostWriteFormValues>({
    resolver: zodResolver(postWriteSchema),
    defaultValues: initialData || {
      companyName: '',
      position: '',
      interviewType: '1차 면접',
      questions: [{ content: '' }],
      content: '',
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data: PostWriteFormValues) => {
    const action = isEdit ? updateReview : createReview;

    action(data, {
      onSuccess: () => {
        alert(
          isEdit ? '성공적으로 수정되었습니다.' : '성공적으로 등록되었습니다.'
        );
        onClose();
      },
      onError: (error) => {
        alert(
          error instanceof Error
            ? error.message
            : '작업 중 오류가 발생했습니다.'
        );
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex-1 space-y-4 animate-fade-in'
      >
        <CompanyJobFields />
        <InterviewTypeField />
        <QuestionFields />
        <ContentField />
        <PostWriteFooter
          onClose={onClose}
          isEdit={isEdit}
          isCreating={isCreating}
          isUpdating={isUpdating}
        />
      </form>
    </FormProvider>
  );
}
