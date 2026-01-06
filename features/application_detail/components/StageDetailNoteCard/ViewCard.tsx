import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ExternalLink, Paperclip } from "lucide-react";

export default function ViewCard() {
 
  return (
    <>
      <CardContent className='p-6 space-y-6'>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label className='block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1'>
                회사명 / 직무
              </Label>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                구글 코리아 프론트엔드 엔지니어
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className='block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1'>
                  근무지
                </Label>
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  서울, 강남
                </div>
              </div>
              <div>
                <Label className='block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1'>
                  공고 링크
                </Label>
                <div className="text-sm text-slate-400 font-medium italic">
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <Label className='block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1'>
            자유 메모
          </Label>
          <div className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap leading-relaxed min-h-[60px]">
            가가가가가가가가가가
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <Label className='block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3'>
            첨부파일 1개
          </Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl group transition-all hover:bg-white dark:hover:bg-slate-800">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 flex items-center justify-center shadow-sm">
                  <Paperclip className="w-4 h-4 text-slate-400" />
                </div>
                <div className='min-w-0'>
                  <div className='text-xs font-bold text-slate-700 dark:text-slate-300 truncate'>음악과 세계</div>
                  <div className="text-[9px] text-slate-400">1.8MB</div>
                </div>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover:text-brand-500 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
}