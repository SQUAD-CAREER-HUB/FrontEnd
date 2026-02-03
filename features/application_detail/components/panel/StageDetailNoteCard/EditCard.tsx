'use client';

import { UseFormReturn } from 'react-hook-form';
import { Button } from "@/shared/components/ui/button";
import { CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Globe, MapPin, Paperclip, Upload, X } from "lucide-react";
import FormLabel from "../../common/FormLabel";
import { useAttachedFilesStore } from '../../../stores/useAttachedFilesStore';
import { type StageDetailFormValues } from '../../../schemas/stageDetail';

// S3 URL에서 파일명 추출 (UUID prefix 제거)
function getFileNameFromUrl(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    let fileName = pathname.split('/').pop() || url;
    fileName = decodeURIComponent(fileName);
    // UUID prefix 제거 (예: 59af0068-ad19-4f41-ad5e-2cb5ceee3a7b-)
    return fileName.replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}-/i, '');
  } catch {
    return url;
  }
}

interface EditCardProps {
  form: UseFormReturn<StageDetailFormValues>;
}

export default function EditCard({ form }: EditCardProps) {
  const { register, formState: { errors } } = form;
  const {
    attachedFiles,
    newFiles,
    removeAttachedFile,
    addNewFiles,
    removeNewFile,
  } = useAttachedFilesStore();

  const handleAddFiles = (files: FileList | null) => {

    if (!files) return;
    console.log(files);
    addNewFiles(Array.from(files));
  };

  return (
    <>
      <CardContent className='p-6 space-y-6'>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <FormLabel variant="baseBlack">
                회사명 / 직무
              </FormLabel>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white"
                    type="text"
                    {...register('company')}
                    placeholder="회사명 입력"
                  />
                  {errors.company && (
                    <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white"
                    type="text"
                    {...register('position')}
                    placeholder="직무 입력"
                  />
                  {errors.position && (
                    <p className="text-xs text-red-500 mt-1">{errors.position.message}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel variant="baseBlack">
                  근무지
                </FormLabel>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <Input
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white pl-8"
                    placeholder="근무지 입력"
                    {...register('jobLocation')}
                  />
                </div>
              </div>
              <div>
                <FormLabel variant="baseBlack">
                  공고 링크
                </FormLabel>
                <div className="relative">
                  <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <Input
                    className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white pl-8"
                    placeholder="URL 입력"
                    {...register('jobPostingUrl')}
                  />
                </div>
                {errors.jobPostingUrl && (
                  <p className="text-xs text-red-500 mt-1">{errors.jobPostingUrl.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <FormLabel variant="baseBlack">
            자유 메모
          </FormLabel>
          <Textarea
            placeholder="메모를 입력해 주세요."
            id="message"
            {...register('memo')}
          />
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-3">
            <FormLabel variant="baseBlack">
              첨부파일
            </FormLabel>
            <label className='cursor-pointer text-[10px] font-black text-brand-600 bg-brand-50 dark:bg-brand-900/30 rounded-md hover:bg-brand-100 transition-colors px-2 py-1'>
              <Upload id="files" className="w-3 h-3 inline mr-1" />
              파일 추가
              <Input
                type="file"
                className="hidden"
                id="files"
                multiple
                onChange={(e) => handleAddFiles(e.target.files)}
              />
            </label>
          </div>

          <div className="space-y-2">
            {attachedFiles.length > 0 || newFiles.length > 0 ? (
              <>
                {attachedFiles.map((file, index) => (
                  <div
                    key={`existing-${index}`}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl group transition-all hover:bg-white dark:hover:bg-slate-800"
                  >
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center shadow-sm">
                        <Paperclip className="w-4 h-4 text-slate-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                          {getFileNameFromUrl(file)}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="cursor-pointer p-1 text-slate-400 hover:text-red-500 rounded-lg"
                      onClick={() => removeAttachedFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {newFiles.map((file, index) => (
                  <div
                    key={`new-${index}`}
                    className="flex items-center justify-between p-3 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-xl group transition-all"
                  >
                    <div className="flex items-center space-x-3 overflow-hidden">
                      <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-brand-200 dark:border-brand-700 flex items-center justify-center shadow-sm">
                        <Paperclip className="w-4 h-4 text-brand-500" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-brand-700 dark:text-brand-300 truncate">
                          {file.name}
                        </div>
                        <div className="text-[10px] text-brand-500">새 파일</div>
                      </div>
                    </div>
                    <Button
                      size="xs"
                      variant="ghost"
                      className="cursor-pointer p-1 text-slate-400 hover:text-red-500 rounded-lg"
                      onClick={() => removeNewFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-sm text-slate-400">첨부파일이 없습니다.</div>
            )}
          </div>
        </div>
      </CardContent>
    </>
  );
}
