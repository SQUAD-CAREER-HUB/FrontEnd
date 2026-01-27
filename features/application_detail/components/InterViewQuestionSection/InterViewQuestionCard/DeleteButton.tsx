'use client';

import { Trash2 } from 'lucide-react';
import { useDeleteInterviewQuestion } from '../../../hooks/useDeleteInterviewQuestion';

interface DeleteButtonProps {
  questionArchiveId: number;
}

export default function DeleteButton({ questionArchiveId }: DeleteButtonProps) {
  const { mutate, isPending } = useDeleteInterviewQuestion();

  const handleDelete = () => {
    if (isPending) return;
    mutate(questionArchiveId);
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="p-1 text-slate-400 hover:text-red-500 disabled:opacity-50"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}
