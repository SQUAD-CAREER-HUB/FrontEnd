// store/useTimelineStore.ts
import { ApplicationStage } from '@/types'
import { create } from 'zustand'


interface TimelineState {
  activeStage: ApplicationStage | null;
  completedStages: Set<ApplicationStage>
  setActiveStage: (stage: ApplicationStage) => void
  setStageCompleted: (stage: ApplicationStage, isCompleted: boolean) => void
  isStageActive: (stage: ApplicationStage) => boolean
  isStageCompleted: (stage: ApplicationStage) => boolean;
  editingEtcStageId: number | null;
  setEditingEtcStageId: (id: number | null) => void;
  editingInterviewStageId: number | null;
  setEditingInterviewStageId: (id: number | null) => void;
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

  isStageCompleted: (stage) => get().completedStages.has(stage),
  editingEtcStageId: null,
  setEditingEtcStageId: (id) => set({ editingEtcStageId: id }),
  editingInterviewStageId: null,
  setEditingInterviewStageId: (id) => set({ editingInterviewStageId: id })

}))