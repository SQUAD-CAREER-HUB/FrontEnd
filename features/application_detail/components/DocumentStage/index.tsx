"use client"
import { useState } from "react"
import { useTimelineStore } from "../../stores/useTimeLineStore"
import { ScheduleResult } from "@/shared/types"
import DocumentStageForm from "./DocumentStageForm"
import ViewCard from "./ViewCard"
import StageWrapper from "../common/StageWrapper"
import StageEditButton from "../common/StageEditButton"
import { useStageEdit } from "../../hooks/useStageEdit"
import { STATUS_BG_STYLES, STATUS_FONT_STYLES, ACTIVE_STAGE_STYLES } from "../../constants/styles"

export default function DocumentStage() {
  const activeStage = useTimelineStore(state => state.activeStage);
  const [status] = useState<ScheduleResult>('WAITING');
  const { isEditing, toggleEdit } = useStageEdit(false);

  return (
    <StageWrapper number={1} stage='document'>
      <div className={`rounded-xl p-5 shadow-sm transition-all border ${activeStage === 'document' && status === 'WAITING' && ACTIVE_STAGE_STYLES.border} ${STATUS_BG_STYLES[status]}`}>
        <div className='flex justify-between items-center mb-5'>
          <h3 className={`font-bold text-lg ${STATUS_FONT_STYLES[status]}`}>서류 전형</h3>
          <StageEditButton onClick={toggleEdit} />
        </div>

        {isEditing ? (
          <DocumentStageForm />
        ) : (
          <ViewCard />
        )}
      </div>
    </StageWrapper>
  )
}