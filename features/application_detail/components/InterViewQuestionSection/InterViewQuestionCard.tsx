'use client';

import { Pen, Trash2 } from 'lucide-react';

interface InterViewQuestionCardProps {
  interviewType: string;
  question: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function InterViewQuestionCard({
  interviewType,
  question,
  onEdit,
  onDelete,
}: InterViewQuestionCardProps) {
  return (
    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border group">
      <div className="flex justify-between mb-2">
        <span className="text-[10px] text-slate-500 font-bold">
          {interviewType}
        </span>
        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={onEdit}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <Pen className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="p-1 text-slate-400 hover:text-red-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {question}
      </p>
    </div>
  );
}
