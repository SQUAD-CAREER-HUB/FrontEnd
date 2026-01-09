import { ReactNode } from "react";
import TimelineStepNumber from "../TimeLineStepNumber";
import { ApplicationStage } from "@/shared/types";

interface StageWrapperProps {
  number?: number;
  stage: ApplicationStage;
  children: ReactNode;
}

/**
 * Timeline Stage의 공통 래퍼 컴포넌트
 * 모든 스테이지에서 사용하는 공통 레이아웃 구조를 제공합니다.
 */
export default function StageWrapper({ number, stage, children }: StageWrapperProps) {
  return (
    <div className='relative flex gap-6 mb-10 group z-20'>
      <TimelineStepNumber number={number} stage={stage} />
      <div className='flex-1'>
        {children}
      </div>
    </div>
  );
}
