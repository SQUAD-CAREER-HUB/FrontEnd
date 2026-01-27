'use client'

import { useTimelineStore } from '../stores/useTimeLineStore'
import DocumentStage from './DocumentStage'
import FinalResultStage from './FinalResultStage'
import InterViewQuestionSection from './InterViewQuestionSection'
import InterViewStage from './InterviewStage'
import OtherStage from './OtherStage'
import StageDetailNoteCard from './StageDetailNoteCard'
import { TimelineCard } from './TimelineCard'

export default function JobDetailCard() {
  const isPanelOpened = useTimelineStore(state => state.isPanelOpened);
  const gridColumns = isPanelOpened ? 'lg:grid-cols-3' : 'lg:grid-cols-1';
  const timelineColumnSpan = isPanelOpened ? 'lg:col-span-2' : 'lg:col-span-1';
  
  return (
    <div className={`grid grid-cols-1 ${gridColumns} gap-6 flex-1 items-stretch`}>
      <div className={`${timelineColumnSpan} flex flex-col min-w-0 transition-all`}>
        <TimelineCard>
          <DocumentStage />
          <OtherStage />
          <InterViewStage />
          <FinalResultStage />
        </TimelineCard>
      </div>
      {isPanelOpened && (
        <div className='flex flex-col space-y-6 min-w-0'>
          <StageDetailNoteCard />
          <InterViewQuestionSection />
        </div>
      )}
    </div>
  )
}