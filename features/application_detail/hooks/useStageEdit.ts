import { useState } from "react";

/**
 * Edit/View 모드를 전환하는 공통 훅
 * @param initialState - 초기 편집 상태 (기본값: false)
 * @returns isEditing 상태와 토글 함수
 */
export function useStageEdit(initialState = false) {
  const [isEditing, setIsEditing] = useState(initialState);

  const toggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  const setEdit = (value: boolean) => {
    setIsEditing(value);
  };

  return {
    isEditing,
    toggleEdit,
    setEdit,
  };
}
