'use client'
import { Clock } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import StatusButtonGroup from "./StatusButtonGroup";
import { useState } from "react";
import { ApplicationStatus } from "@/types";

interface OtherStageItemProps {
  key: string;
  title: string;
  datetime: string;
  onStatusChange?: (status: 'pending' | 'passed' | 'failed') => void;
}

// 5. 기타 전형 아이템 컴포넌트
export default function OtherStageItem({
  key,
  title,
  datetime,
}: OtherStageItemProps) {
  const [status, setStatus] = useState<ApplicationStatus>('pending');
  const activeBg =  {
    pending: 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800',
    passed: 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800',
    failed: 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800 '
  }
  const activeFont = {
    pending: 'text-slate-900 dark:text-slate-100',
    passed: 'text-green-800 dark:text-green-400',
    failed: 'text-red-800 dark:text-red-400'
  }
  return (
    <Card className={`p-4 rounded-xl shadow-sm transition-all group relative overflow-hidden dark:border-slate-80
      ${activeBg[status]}
    `}>
      <CardContent className='px-0'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <h4 className={`font-bold ${activeFont[status]}`}>{title}</h4>
          </div>
          <StatusButtonGroup status = {status} onStatusChange={setStatus} />
        </div>
        <div className='flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1'>
          <Clock className='w-3.5 h-3.5 mr-1.5' />
          {datetime}
        </div>
      </CardContent>
    </Card>
  );
}