import { Label } from "@/components/ui/label";
import { Clock } from "lucide-react";
import { StatusButton } from "../StatusButton";

export default function ViewCard() {
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5'>
        <div>
          <Label className='text-[10px] text-slate-400 font-bold mb-1.5 block uppercase tracking-wider'>서류 상태</Label>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">제출 완료</div>
        </div>
        <div>
          <Label className='text-[10px] text-slate-400 font-bold mb-1.5 block uppercase tracking-wider'>지원 방식</Label>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300">홈페이지 지원</div>
        </div>
        <div>
          <Label className='text-[10px] text-slate-400 font-bold mb-1.5 block uppercase tracking-wider'>마감 일시</Label>
          <div className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 opacity-50" />
            2026. 12. 20. 오후 2:00:00
          </div>
        </div>
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex flex-col items-start gap-1">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            전형 결과
          </span>
          <StatusButton status="WAITING" currentStatus="WAITING"></StatusButton>
        </div>
      </div>
    </>
  )
}