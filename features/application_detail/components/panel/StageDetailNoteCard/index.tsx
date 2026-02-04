'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ViewCard from "./ViewCard";
import EditCard from "./EditCard";
import { Card, CardHeader } from "@/shared/components/ui/card";
import { CirclePlay, Save } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import StageEditButton from "../../common/StageEditButton";
import { useStageEdit } from "../../../hooks/useStageEdit";
import { useGetApplicationDetail } from '../../../hooks/useGetApplicationDetail';
import { useUpdateApplication } from '../../../hooks/useUpdateApplication';
import { useAttachedFilesStore } from '../../../stores/useAttachedFilesStore';
import { stageDetailSchema, type StageDetailFormValues } from '../../../schemas/stageDetail';

export default function StageDetailNoteCard() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);
  const { mutate: updateApplication, isPending } = useUpdateApplication(applicationId);
  const { isEditing, toggleEdit } = useStageEdit(false);

  const form = useForm<StageDetailFormValues>({
    resolver: zodResolver(stageDetailSchema),
    defaultValues: {
      company: '',
      position: '',
      jobLocation: '',
      jobPostingUrl: '',
      memo: '',
    },
  });

  const { attachedFiles, newFiles, reset: resetFiles } = useAttachedFilesStore();
  useEffect(() => {
    if (data?.applicationInfo) {
      const info = data.applicationInfo;
      // 서버에서 받은 원본 URL 확인
      console.log('[서버 원본 URL]', info.attachedFiles);
      form.reset({
        company: info.company ?? '',
        position: info.position ?? '',
        jobLocation: info.jobLocation ?? '',
        jobPostingUrl: info.jobPostingUrl ?? '',
        memo: info.memo ?? '',
      });
      resetFiles(info.attachedFiles ?? []);
    }
  }, [data?.applicationInfo]);

  const handleSave = form.handleSubmit((formValues) => {
    // 기존 URL과 새 파일을 합쳐서 files로 전송
    const allFiles: (File | string)[] = [...attachedFiles, ...newFiles];
    console.log('[저장 요청 files]', allFiles);

    updateApplication(
      {
        request: {
          company: formValues.company,
          position: formValues.position,
          jobLocation: formValues.jobLocation,
          jobPostingUrl: formValues.jobPostingUrl,
          memo: formValues.memo,
        },
        files: allFiles.length > 0 ? allFiles : undefined,
      },
      {
        onSuccess: () => {
          toggleEdit();
        },
      }
    );
  });

  const handleCancel = () => {
    if (data?.applicationInfo) {
      const info = data.applicationInfo;
      form.reset({
        company: info.company ?? '',
        position: info.position ?? '',
        jobLocation: info.jobLocation ?? '',
        jobPostingUrl: info.jobPostingUrl ?? '',
        memo: info.memo ?? '',
      });
      resetFiles(info.attachedFiles ?? []);
    }
    toggleEdit();
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
              onClick={handleCancel}
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
        <EditCard form={form} />
      ) : (
        <ViewCard />
      )}
    </Card>
  );
}
