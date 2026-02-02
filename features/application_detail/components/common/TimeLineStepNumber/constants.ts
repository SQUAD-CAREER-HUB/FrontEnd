import { ApplicationStage } from "@/shared/types";

export const BASE_CLASSES =
  'relative z-10 w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center shadow-sm flex-shrink-0 transition-colors';

const STAGE_KO_TO_EN: Record<string, ApplicationStage> = {
  '서류 전형': 'DOCUMENT',
  '기타 전형': 'ETC',
  '면접 전형': 'INTERVIEW',
  '지원 종료': 'APPLICATION_CLOSE',
};

export function toStageEnum(value: string): ApplicationStage {
  return STAGE_KO_TO_EN[value] || (value as ApplicationStage);
}
