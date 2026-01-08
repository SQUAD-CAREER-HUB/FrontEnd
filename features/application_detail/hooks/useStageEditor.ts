import { useShallow } from "zustand/shallow";
import { useTimelineStore } from "../stores/useTimeLineStore";

type StageType = 'interview' | 'other';

/**
 * OtherStageItem과 InterviewStage에서 사용하는 편집 로직을 공통화한 훅
 * @param id - 스테이지 ID
 * @param type - 스테이지 타입 ('interview' | 'other')
 * @returns 편집 상태 체크 함수와 편집 모드 설정 함수
 */
export function useStageEditor(id: number | null, type: StageType) {
  const { editingInterviewStageId, editingEtcStageId, setEditingInterviewStageId, setEditingEtcStageId } =
    useTimelineStore(useShallow(state => ({
      editingInterviewStageId: state.editingInterviewStageId,
      editingEtcStageId: state.editingEtcStageId,
      setEditingInterviewStageId: state.setEditingInterviewStageId,
      setEditingEtcStageId: state.setEditingEtcStageId,
    })));

  const isEditing = type === 'interview'
    ? id === editingInterviewStageId
    : id === editingEtcStageId;

  const setEditingStageId = (stageId: number | null) => {
    if (type === 'interview') {
      setEditingInterviewStageId(stageId);
    } else {
      setEditingEtcStageId(stageId);
    }
  };

  return {
    isEditing,
    setEditingStageId,
  };
}
