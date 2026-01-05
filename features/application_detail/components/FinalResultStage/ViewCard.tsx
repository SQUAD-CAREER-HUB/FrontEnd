import { Label } from "@/components/ui/label";
import { ScheduleResult } from "@/types";
import { useState } from "react"
import { StatusButton } from "../StatusButton";

export default function ViewCard() {
  const status = 'WAITING';

  return (<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
    <div className="flex flex-col items-start gap-1">
      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">최종 상태</span>
      <StatusButton status="WAITING" currentStatus="WAITING"/>
    </div>
  </div>)
}