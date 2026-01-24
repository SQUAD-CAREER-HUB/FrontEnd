'use client';

import { useParams } from 'next/navigation';
import { DropDown } from '@/shared/components/DropDown';
import { useTimelineStore } from '../stores/useTimeLineStore';
import { ApplicationStage } from '@/shared/types';
import { useUpdateCurrentStage } from '../hooks/useUpdateCurrentStage';
import { useGetApplicationDetail } from '../hooks/useGetApplicationDetail';

const options = [
  { value: 'DOCUMENT', label: '서류 전형' },
  { value: 'ETC', label: '기타 전형' },
  { value: 'INTERVIEW', label: '면접 전형' },
  { value: 'APPLICATION_CLOSE', label: '지원 종료' },
];

const STAGE_KO_TO_EN: Record<string, ApplicationStage> = {
  '서류 전형': 'DOCUMENT',
  '기타 전형': 'ETC',
  '면접 전형': 'INTERVIEW',
  '지원 종료': 'APPLICATION_CLOSE',
};

function toStageEnum(value: string): ApplicationStage {
  return STAGE_KO_TO_EN[value] || (value as ApplicationStage);
}

export default function CurrentStageSelector() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { mutate: updateCurrentStage } = useUpdateCurrentStage(applicationId);
  const { data } = useGetApplicationDetail(applicationId);

  const setActiveStage = useTimelineStore((state) => state.setActiveStage);

  const rawStage = data?.applicationInfo.currentStageType || 'DOCUMENT';
  const currentStage = toStageEnum(rawStage);
  const handleStageChange = (value: string) => {
    const newStage = value as ApplicationStage;
    updateCurrentStage(
      { currentStageType: newStage, previousStageType: currentStage },
      {
        onSuccess: () => {
          setActiveStage(newStage);
        },
      }
    );
  };

  return (
    <div className='flex items-center space-x-2 w-40'>
      <div className='text-xs font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap'>
        현재 단계:
      </div>
      <DropDown
        options={options}
        value={currentStage}
        onValueChange={handleStageChange}
      />
    </div>
  );
}
