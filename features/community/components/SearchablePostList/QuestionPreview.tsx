import { BrainCircuit } from 'lucide-react';

export default function QuestionPreview({
  questions,
}: {
  questions: string[];
}) {
  const displayQuestions = questions.slice(0, 2);
  const extraCount = questions.length - displayQuestions.length;

  return (
    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white dark:bg-slate-900 z-10 flex flex-col justify-center'>
      <div className='flex items-center space-x-1 text-xs font-bold text-brand-500 mb-1'>
        <BrainCircuit className='w-3 h-3' />
        <span>질문 미리보기</span>
      </div>
      <div className='space-y-1'>
        {displayQuestions.map((q, idx) => (
          <div
            key={idx}
            className='text-sm text-slate-800 dark:text-slate-200 font-bold truncate flex items-center'
          >
            <span className='w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 mr-2 flex-shrink-0' />
            <span className='truncate'>{q}</span>
          </div>
        ))}
        {extraCount > 0 && (
          <div className='text-[10px] text-slate-400 dark:text-slate-500 pl-3.5'>
            + {extraCount}개 더보기
          </div>
        )}
      </div>
    </div>
  );
}
