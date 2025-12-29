'use client'

import DocumentStage from './DocumentStage'
import FinalResultStage from './FinalResultStage'
import InterViewStage from './InterviewStage'
import OtherStage from './OtherStage'
import { TimelineCard } from './TimelineCard'

export default function JobDetailCard() {
  return (
    <div className="grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out flex-1 items-stretch">
      <div className="lg:col-span-2 flex flex-col min-w-0 transition-all">
        <TimelineCard>
          <DocumentStage />
          <OtherStage />
          <InterViewStage />
          <FinalResultStage />
        </TimelineCard>
      </div>
    </div>
  )
}
