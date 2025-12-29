// store/useTimelineStore.ts
import { ApplicationStage } from '@/types'
import { create } from 'zustand'


interface TimelineState {
  activeStage: ApplicationStage | null;
  completedStages: Set<ApplicationStage>
  setActiveStage: (stage: ApplicationStage) => void
  setStageCompleted: (stage: ApplicationStage, isCompleted: boolean) => void
  isStageActive: (stage: ApplicationStage) => boolean
  isStageCompleted: (stage: ApplicationStage) => boolean
}

export const useTimelineStore = create<TimelineState>((set, get) => ({
  activeStage: null,
  completedStages: new Set(),
  
  setActiveStage: (stage) => set({ activeStage: stage }),
  
  setStageCompleted: (stage, isCompleted) => set((state) => {
    const newCompleted = new Set(state.completedStages)
    if (isCompleted) {
      newCompleted.add(stage)
    } else {
      newCompleted.delete(stage)
    }
    return { completedStages: newCompleted }
  }),
  
  isStageActive: (stage) => get().activeStage === stage,
  
  isStageCompleted: (stage) => get().completedStages.has(stage)
}))