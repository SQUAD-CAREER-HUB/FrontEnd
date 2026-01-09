'use client'
import { PanelRight, PanelRightClose, Save, Trash2 } from 'lucide-react'
import { Button } from '../../../shared/components/ui/button'
import { useState } from 'react'
import { useTimelineStore } from '../stores/useTimeLineStore'

export default function JobDetailHeader() {
  const togglePanel = useTimelineStore(state => state.togglePanel);
  const isPanelOpened = useTimelineStore(state => state.isPanelOpened)
  // ===== Local State =====
  const [companyName] = useState('비바리퍼블리카')
  const [position] = useState('프로덕트 디자이너')

  // ===== Local Handlers =====

  const handleDelete = () => {
    console.log('삭제')
  }

  const handleSave = () => {
    console.log('저장')
  }

  return (
    <div className="sticky top-0 z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm flex items-center justify-between mb-6 -mt-4 -mx-4 px-4 py-4 md:-mt-8 md:-mx-8 md:px-8 border-b border-slate-200/50 dark:border-slate-800/50 transition-all">
      {/* Left */}
      <div>
        <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100">
          {companyName}
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          {position}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {togglePanel()}}
          className="p-2 rounded-lg border border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          {isPanelOpened ?
          (
            <PanelRightClose className="h-5 w-5"  />
          ): (
            <PanelRight className="h-5 w-5"  />
          )
          }
        </Button>

        <div className="h-5 w-px bg-slate-300 dark:bg-slate-700" />

        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
        >
          <Trash2 className="h-5 w-5" />
        </Button>

        <Button
          size="smButton"
          onClick={handleSave}
          className="bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-200 dark:shadow-none transition-all flex items-center gap-1"
        >
          <Save className="w-4 h-4" />
          <span>저장</span>
        </Button>
      </div>
    </div>
  )
}
