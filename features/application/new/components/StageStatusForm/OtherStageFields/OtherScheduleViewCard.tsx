'use client'

import { Card, CardContent } from '@/shared/components/ui/card'
import { Clock, Trash2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { StatusButton } from '@/features/application_detail/components/StatusButton'
import { STATUS_BG_STYLES, STATUS_FONT_STYLES, LABEL_STYLES } from '@/features/application_detail/constants/styles'

type ScheduleResult = 'WAITING' | 'PASS' | 'FAILED'

interface OtherSchedule {
  id: string
  scheduleName: string
  startedAt: string
  endedAt: string
  scheduleResult: ScheduleResult
}

interface OtherScheduleViewCardProps {
  schedule: OtherSchedule
  onDelete?: (id: string) => void
}

const formatDateTime = (isoString: string) => {
  const date = new Date(isoString)
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function OtherScheduleViewCard({
  schedule,
  onDelete,
}: OtherScheduleViewCardProps) {
  return (
    <Card className={`p-4 rounded-xl border group relative transition-all ${STATUS_BG_STYLES[schedule.scheduleResult]}`}>
      <CardContent className="px-0">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0 pr-4">
            <h4 className={`font-bold ${STATUS_FONT_STYLES[schedule.scheduleResult]}`}>
              {schedule.scheduleName}
            </h4>
            <div className="text-[11px] text-slate-500 mt-1.5 space-y-0.5">
              <div>
                <Clock className="w-3 h-3 inline mr-1" />
                시작: {formatDateTime(schedule.startedAt)}
              </div>
              <div>
                <Clock className="w-3 h-3 inline mr-1" />
                종료: {formatDateTime(schedule.endedAt)}
              </div>
            </div>
          </div>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onDelete(schedule.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>

      <div className="px-0 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex flex-col items-start gap-1">
        <span className={`${LABEL_STYLES.baseBlack} tracking-widest`}>
          전형 결과
        </span>
        <StatusButton
          status={schedule.scheduleResult}
          currentStatus={schedule.scheduleResult}
        />
      </div>
    </Card>
  )
}
