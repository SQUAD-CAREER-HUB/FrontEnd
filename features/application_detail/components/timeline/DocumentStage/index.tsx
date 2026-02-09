'use client';

import { useParams } from 'next/navigation';
import { useTimelineStore } from '../../../stores/useTimeLineStore';
import DocumentStageForm from './DocumentStageForm';
import ViewCard from './ViewCard';
import StageWrapper from '../../common/StageWrapper';
import StageEditButton from '../../common/StageEditButton';
import { useStageEdit } from '../../../hooks/useStageEdit';
import {
  STATUS_BG_STYLES,
  STATUS_FONT_STYLES,
  ACTIVE_STAGE_STYLES,
} from '../../../constants/styles';
import { useGetApplicationDetail } from '../../../hooks/useGetApplicationDetail';

export default function DocumentStage() {
  const params = useParams();
  const applicationId = Number(params.id);
  const { data } = useGetApplicationDetail(applicationId);

  const activeStage = useTimelineStore((state) => state.activeStage);
  const docsStage = data?.applicationStageTimeLine.docsStageTimeLine;
  const status = docsStage?.scheduleResult ?? 'WAITING';
  const { isEditing, toggleEdit } = useStageEdit(false);

  return (
    <StageWrapper number={1} stage='DOCUMENT'>
      <div className={`rounded-xl p-5 shadow-sm transition-all border ${activeStage === 'DOCUMENT' && status === 'WAITING' && ACTIVE_STAGE_STYLES.border} ${STATUS_BG_STYLES[status]}`}>
        <div className='flex justify-between items-center mb-5'>
          <h3 className={`font-bold text-lg ${STATUS_FONT_STYLES[status]}`}>서류 전형</h3>
          <StageEditButton onClick={toggleEdit} />
        </div>

        {isEditing ? (
          <DocumentStageForm onCancel={toggleEdit} onSave={toggleEdit} />
        ) : (
          <ViewCard />
        )}
      </div>
    </StageWrapper>
  )
}