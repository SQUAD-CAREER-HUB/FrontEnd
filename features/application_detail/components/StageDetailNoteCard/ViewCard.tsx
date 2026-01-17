'use client';

import { useParams } from 'next/navigation';
import { CardContent } from '@/shared/components/ui/card';
import { Label } from '@/shared/components/ui/label';
import { ExternalLink, Paperclip } from 'lucide-react';
import { useGetApplicationDetail } from '../../hooks/useGetApplicationDetail';

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

export default function ViewCard() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);
  const applicationInfo = data?.applicationInfo;
  const attachedFiles = applicationInfo?.attachedFiles ?? [];

  return (
    <>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                회사명 / 직무
              </Label>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {applicationInfo?.company} • {applicationInfo?.position}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  근무지
                </Label>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  {applicationInfo?.jobLocation ?? '-'}
                </div>
              </div>
              <div>
                <Label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                  공고 링크
                </Label>
                {applicationInfo?.jobPostingUrl ? (
                  <a
                    href={applicationInfo.jobPostingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brand-500 hover:text-brand-600 font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    링크 열기
                  </a>
                ) : (
                  <div className="text-sm text-slate-400 font-medium italic">
                    -
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <Label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
            자유 메모
          </Label>
          <div className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed min-h-[60px]">
            {applicationInfo?.memo || '메모가 없습니다.'}
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <Label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">
            첨부파일 {attachedFiles.length}개
          </Label>
          <div className="space-y-2">
            {attachedFiles.length > 0 ? (
              attachedFiles.map((file, index) => (
                <a
                  key={index}
                  href={file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl group transition-all hover:bg-white dark:hover:bg-slate-800 cursor-pointer"
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
                  <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-500 transition-colors" />
                </a>
              ))
            ) : (
              <div className="text-sm text-slate-400">첨부파일이 없습니다.</div>
            )}
          </div>
        </div>
      </CardContent>
    </>
  );
}