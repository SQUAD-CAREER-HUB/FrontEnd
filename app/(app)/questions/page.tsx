import MyQuestionsHeader from '@/features/my-questions/components/MyQuestionsHeader';
import MyQuestionsSearchbar from '@/features/my-questions/components/MyQuestionsSearchbar';
import { QuestionFormModal } from '@/features/my-questions/components/QuestionFormModal';
import QuestionList from '@/features/my-questions/components/QuestionList';

export default function MyQuestionsPage() {
  return (
    <div className='p-4'>
      <MyQuestionsHeader />

      <MyQuestionsSearchbar />

      <QuestionList />

      <QuestionFormModal />
    </div>
  );
}
