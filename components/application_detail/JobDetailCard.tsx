'use client'

import { useState } from 'react'
import DocumentStage from './DocumentStage'
import FinalResultStage from './FinalResultStage'
import OtherStage from './OtherStage'
import { TimelineCard } from './TimelineCard'

export default function JobDetailCard() {
  // ===== Local State =====
  const [currentStage] = useState('서류 전형');
  return (
    <div className="grid grid-cols-1 gap-6 transition-all duration-300 ease-in-out flex-1 items-stretch">
      <div className="lg:col-span-2 flex flex-col min-w-0 transition-all">
        <TimelineCard currentStage={currentStage}>
          <DocumentStage />

          <OtherStage type='기타 전형'/>
          <OtherStage type='면접 전형'/>

          <FinalResultStage />
        </TimelineCard>
      </div>

      <div />
    </div>
  )
}
