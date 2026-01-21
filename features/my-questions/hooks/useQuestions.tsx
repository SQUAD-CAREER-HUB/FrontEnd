import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createQuestion,
  deleteQuestion,
  getQuestions,
  updateQuestion,
} from '../api/questions';
import { QuestionFormValues } from '../components/QuestionFormModal';
import { useQuestionModalStore } from '../store/useQuestionModalStore';

export const useQuestions = () => {
  const queryClient = useQueryClient();
  const closeModal = useQuestionModalStore((state) => state.closeModal);

  const query = useInfiniteQuery({
    queryKey: ['questions'],
    queryFn: async ({ pageParam }) => {
      return getQuestions(pageParam, 4);
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      // 서버 응답(GetQuestionsResponse)의 hasNext가 true일 때만 차기 커서 반환
      return lastPage.hasNext ? lastPage.nextCursorId : undefined;
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      // 모든 페이지의 질문들을 하나의 배열로 합침
      questions: data.pages.flatMap((page) => page.questions),
    }),
  });

  const createMutation = useMutation({
    mutationFn: (data: QuestionFormValues) =>
      createQuestion({
        ...data,
        company: data.companyName,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      closeModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: number; body: QuestionFormValues }) =>
      updateQuestion(id, {
        ...body,
        company: body.companyName,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions'] });
    },
  });

  return {
    query,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
