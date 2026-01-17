'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ViewCard from "./ViewCard";
import EditCard from "./EditCard";
import { Card, CardHeader } from "@/shared/components/ui/card";
import { CirclePlay, Save } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import StageEditButton from "../common/StageEditButton";
import { useStageEdit } from "../../hooks/useStageEdit";
import { useGetApplicationDetail } from '../../hooks/useGetApplicationDetail';
import { useUpdateApplication } from '../../hooks/useUpdateApplication';

export interface StageDetailFormData {
  company: string;
  position: string;
  jobLocation: string;
  jobPostingUrl: string;
  memo: string;
  attachedFiles: string[];
  newFiles: File[];
}

export default function StageDetailNoteCard() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);
  const { mutate: updateApplication, isPending } = useUpdateApplication(applicationId);
  const { isEditing, toggleEdit } = useStageEdit(false);

  const [formData, setFormData] = useState<StageDetailFormData>({
    company: '',
    position: '',
    jobLocation: '',
    jobPostingUrl: '',
    memo: '',
    attachedFiles: [],
    newFiles: [],
  });

  useEffect(() => {
    if (data?.applicationInfo) {
      const info = data.applicationInfo;
      setFormData({
        company: info.company ?? '',
        position: info.position ?? '',
        jobLocation: info.jobLocation ?? '',
        jobPostingUrl: info.jobPostingUrl ?? '',
        memo: info.memo ?? '',
        attachedFiles: info.attachedFiles ?? [],
        newFiles: [],
      });
    }
  }, [data?.applicationInfo]);

  const handleSave = () => {
    updateApplication(
      {
        request: {
          company: formData.company,
          position: formData.position,
          jobLocation: formData.jobLocation,
          jobPostingUrl: formData.jobPostingUrl,
          memo: formData.memo,
        },
        files: formData.newFiles.length > 0 ? formData.newFiles : undefined,
      },
      {
        onSuccess: () => {
          toggleEdit();
        },
      }
    );
  };

  return (
    <Card className='p-0 bg-white gap-0 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-all'>
      <CardHeader className='p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center flex-shrink-0 relative'>
        <h2 className='text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center'>
          <CirclePlay className='w-5 h-5 text-brand-500 mr-2' />
          상세 정보 및 메모
        </h2>
        {!isEditing ? (
          <StageEditButton onClick={toggleEdit} />
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={toggleEdit}
              variant="ghost"
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              취소
            </Button>
            <Button
              onClick={handleSave}
              variant="ghost"
              className="text-xs font-bold text-brand-600 flex items-center gap-1"
              disabled={isPending}
            >
              <Save className="w-3 h-3" />{isPending ? '저장 중...' : '저장'}
            </Button>
          </div>
        )}
      </CardHeader>
      {isEditing ? (
        <EditCard formData={formData} setFormData={setFormData} />
      ) : (
        <ViewCard />
      )}
    </Card>
  );
}