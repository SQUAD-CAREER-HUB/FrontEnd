import { CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import FileUploadButton from "@/shared/components/FileUploadButton";
import { FileList, FileItem } from "@/shared/components/FileList";
import { Globe, MapPin } from "lucide-react";
import FormLabel from "../common/FormLabel";

// TODO: 실제 데이터로 교체 필요
const mockFiles: FileItem[] = [
  { name: '음악과 세계', size: 1.8 * 1024 * 1024 },
  { name: '음악과 세계', size: 1.8 * 1024 * 1024 },
];

export default function EditCard() {

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
                <Input className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white" type="text" value="SK하이닉스" />
                <Input className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white" type="text" value="Solution SW" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel variant="baseBlack">
                  근무지
                </FormLabel>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <Input className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white pl-8" placeholder="근무지 입력" value="경기, 분당" />
                </div>
              </div>
              <div>
                <FormLabel variant="baseBlack">
                  공고 링크
                </FormLabel>
                <div className="relative">
                  <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <Input className="w-full p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm dark:text-white pl-8" placeholder="URL 입력" value="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <FormLabel variant="baseBlack">
            자유 메모
          </FormLabel>
          <Textarea placeholder="Type your message here." id="message" />
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-3">
            <FormLabel variant="baseBlack">
              첨부파일
            </FormLabel>
            <FileUploadButton variant="compact" />
          </div>
          
          <FileList
            files={mockFiles}
            onRemove={(index) => console.log('Remove file:', index)}
          />
        </div>
      </CardContent>
    </>
  );
}