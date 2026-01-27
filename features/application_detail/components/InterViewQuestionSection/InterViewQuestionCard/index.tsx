'use client';

import EditModal from '../InterViewQuestionModal/EditModal';
import DeleteButton from './DeleteButton';

interface InterViewQuestionCardProps {
  applicationId: number;
  questionArchiveId: number;
  interviewType: string;
  question: string;
  memo: string;
}

export default function InterViewQuestionCard({
  applicationId,
  questionArchiveId,
  interviewType,
  question,
  memo,
}: InterViewQuestionCardProps) {
  return (
    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border group">
      <div className="flex justify-between mb-2">
        <span className="text-[10px] text-slate-500 font-bold">
          {interviewType}
        </span>
        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
          <EditModal
            applicationId={applicationId}
            initialData={{
              questionArchiveId,
              interviewType,
              question,
              memo,
            }}
          />
          <DeleteButton questionArchiveId={questionArchiveId} />
        </div>
      </div>
      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {question}
      </p>
    </div>
  );
}
