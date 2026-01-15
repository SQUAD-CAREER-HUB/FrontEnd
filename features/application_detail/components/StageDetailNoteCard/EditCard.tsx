'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/shared/components/ui/button";
import { CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Globe, MapPin, Paperclip, Upload, X } from "lucide-react";
import FormLabel from "../common/FormLabel";
import { useGetApplicationDetail } from '../../hooks/useGetApplicationDetail';

export default function EditCard() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);
  const applicationInfo = data?.applicationInfo;

  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobPostingUrl, setJobPostingUrl] = useState('');
  const [memo, setMemo] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);

  useEffect(() => {
    if (applicationInfo) {
      setCompany(applicationInfo.company ?? '');
      setPosition(applicationInfo.position ?? '');
      setJobLocation(applicationInfo.jobLocation ?? '');
      setJobPostingUrl(applicationInfo.jobPostingUrl ?? '');
      setMemo(applicationInfo.memo ?? '');
      setAttachedFiles(applicationInfo.attachedFiles ?? []);
    }
  }, [applicationInfo]);

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
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
                <Input
                  className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="회사명 입력"
                />
                <Input
                  className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white"
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="직무 입력"
                />
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
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
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
                    value={jobPostingUrl}
                    onChange={(e) => setJobPostingUrl(e.target.value)}
                  />
                </div>
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
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
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
              <Input type="file" className="hidden" id="files" />
            </label>
          </div>
          
          <div className="space-y-2">
            {attachedFiles.length > 0 ? (
              attachedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl group transition-all hover:bg-white dark:hover:bg-slate-800"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center shadow-sm">
                      <Paperclip className="w-4 h-4 text-slate-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                        {file}
                      </div>
                    </div>
                  </div>
                  <Button
                    size="xs"
                    variant="ghost"
                    className="cursor-pointer p-1 text-slate-400 hover:text-red-500 rounded-lg"
                    onClick={() => handleRemoveFile(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
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