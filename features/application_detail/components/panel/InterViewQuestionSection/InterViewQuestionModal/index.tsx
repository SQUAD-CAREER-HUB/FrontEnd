'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/shared/components/ui/dialog';

import InterViewQuestionForm from './InterViewQuestionForm';

interface InterViewQuestionModalProps {
  applicationId: number;
}

export default function InterViewQuestionModal({
  applicationId,
}: InterViewQuestionModalProps) {
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
        <Button
          variant="ghost"
          className="p-1.5 text-brand-500 hover:bg-brand-50 rounded-lg"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0">
        <DialogHeader className="text-lg font-bold mb-6 dark:text-white">
          새 질문 추가
        </DialogHeader>
        <InterViewQuestionForm
          applicationId={applicationId}
          mode="create"
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
