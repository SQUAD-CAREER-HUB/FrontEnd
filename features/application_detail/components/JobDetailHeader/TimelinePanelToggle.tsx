'use client';

import { PanelRight, PanelRightClose } from 'lucide-react';
import { Button } from '../../../../shared/components/ui/button';
import { useTimelineStore } from '../../stores/useTimeLineStore';

export default function TimelinePanelToggle() {
  const togglePanel = useTimelineStore((state) => state.togglePanel);
  const isPanelOpened = useTimelineStore((state) => state.isPanelOpened);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => { togglePanel() }}
      className="p-2 rounded-lg border border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
    >
      {isPanelOpened ? (
        <PanelRightClose className="h-5 w-5" />
      ) : (
        <PanelRight className="h-5 w-5" />
      )}
    </Button>
  );
}
