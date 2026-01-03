import { DropDown } from "@/components/DropDown";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export default function InterViewModal() {
  const interviewOptions = [
    { label: '1차 면접', value: '1차 면접' },
    { label: '2차 면접', value: '2차 면접' },
    { label: '기술 면접', value: '기술 면접' },
    { label: '컬처핏 면접', value: '컬처핏 면접' },
    { label: '임원 면접', value: '임원 면접' },
    { label: '인사 면접', value: '인사 면접' },
    { label: '최종 면접', value: '최종 면접' },
    { label: '직접 입력', value: '직접 입력' },
  ];
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'ghost'} className="p-1.5 text-brand-500 hover:bg-brand-50 rounded-lg">
          <Plus className='w-5 h-5' />
        </Button>
      </DialogTrigger>

      <DialogContent className="gap-0">
        <DialogHeader className="text-lg font-bold mb-6 dark:text-white">
          새 질문 추가
        </DialogHeader>
        <div className="space-y-5">
          <div>
            <Label className='block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1'>
              면접 전형 선택
            </Label>
            <DropDown options={interviewOptions} />
            <Input placeholder="면접 전형 직접 입력..." className='w-full mt-2 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white' />
          </div>
          <div>
            <Label className='block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1'>
              면접 전형 선택
            </Label>
            <Textarea
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white h-24 focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder='면접관이 물어본 질문을 적어주세요.'
            />
          </div>
          <div>
            <Label className='block text-xs font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-1'>
              메모 및 답변 포인트
            </Label>
            <Textarea
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm dark:text-white h-20 focus:ring-2 focus:ring-brand-500 outline-none"
              placeholder="답변 키워드나 주의사항을 기록하세요."
            />
          </div>
          <DialogFooter className="flex space-x-3 mt-8 mb-0">
            <Button className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold transition-all hover:bg-slate-200">
              취소
            </Button>
            <Button className="flex-1 py-3 bg-brand-500 text-white rounded-xl font-bold transition-all shadow-md active:scale-95">
              저장
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>

    </Dialog>
  )
}