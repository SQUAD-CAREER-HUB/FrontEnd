import { Button } from "@/components/ui/button";
import { BookMarked, Plus } from "lucide-react";

export default function InterViewQuestionCard () {
  return (<div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
        <BookMarked className="w-5 h-5 text-slate-400"/>
        <span>면접 질문</span>
      </h2>
      <Button variant={'ghost'} className="p-1.5 text-brand-500 hover:bg-brand-50 rounded-lg">
        <Plus className = 'w-5 h-5'/>
      </Button>
    </div>
  </div>)
}