'use client'

import { Button } from "@/shared/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function Header() {
  return (<div className="flex items-center space-x-4 mb-8">
    <Button variant={'ghost'} className = 'p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors'>
      <ChevronLeft className = 'w-6 h-6 text-slate-500'/>
    </Button>
    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
      지원 관리 추가
      </h1>
  </div>)
}