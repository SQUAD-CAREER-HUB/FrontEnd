'use client'
import { Clock } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import StatusButtonGroup from "./StatusButtonGroup";
import { ScheduleResult } from "@/types";
import { useState } from "react";

interface OtherStageItemProps {
  id: number;
  title: string;
  datetime: string;
  scheduleResult:  ScheduleResult;
  onStatusChange?: (status:ScheduleResult) => void;
}

// 5. 기타 전형 아이템 컴포넌트
export default function OtherStageItem({
  id,
  title,
  datetime,
  scheduleResult,
  onStatusChange
}: OtherStageItemProps) {
  const activeBg =  {
    WAITING: 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800',
    PASS: 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800',
    FAILED: 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800 '
  }
  const activeFont = {
    WAITING: 'text-slate-900 dark:text-slate-100',
    PASS: 'text-green-800 dark:text-green-400',
    FAILED: 'text-red-800 dark:text-red-400'
  }
  const [result, setResult] = useState<ScheduleResult>(scheduleResult);
  return (
    <Card className={`p-4 rounded-xl shadow-sm transition-all group relative overflow-hidden dark:border-slate-80
      ${activeBg[result]}
    `}>
      <CardContent className='px-0'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h4 className={`font-bold ${activeFont[result]}`}>{title}</h4>
          </div>
          <StatusButtonGroup status = {result} onStatusChange={setResult} />
        </div>
        <div className='flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1'>
          <Clock className='w-3.5 h-3.5 mr-1.5' />
          {datetime}
        </div>
      </CardContent>
    </Card>
  );
}