'use client';

import { useState } from 'react';
import { Pen } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

import InterViewQuestionForm, { InterviewQuestionInitialData } from './InterViewQuestionForm';

interface EditModalProps {
  applicationId: number;
  initialData: InterviewQuestionInitialData;
}

export default function EditModal({
  applicationId,
  initialData,
}: EditModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="p-1 text-slate-400 hover:text-slate-600"
        >
          <Pen className="w-3.5 h-3.5" />
        </button>
      </DialogTrigger>

      <DialogContent className="gap-0">
        <DialogHeader className="text-lg font-bold mb-6 dark:text-white">
          질문 수정
        </DialogHeader>
        <InterViewQuestionForm
          applicationId={applicationId}
          mode="edit"
          initialData={initialData}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
