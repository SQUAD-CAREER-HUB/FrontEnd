import StatusButtonGroup from "../StatusButtonGroup";
import { BottomActiveButtons } from "../BottomActiveButtons";
import { useState } from "react";
import { ScheduleResult } from "@/types";
import FormLabel from "../common/FormLabel";

export default function EditCard() {
  const [status, setStatus] = useState<ScheduleResult>('WAITING');

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
      <div className="flex flex-col gap-1">
        <FormLabel className="ml-1">최종 상태</FormLabel>
        <StatusButtonGroup status={status} onStatusChange={setStatus} />
      </div>
      <div className="flex items-center gap-2 self-end">
        <BottomActiveButtons />
      </div>
    </div>
  );
}