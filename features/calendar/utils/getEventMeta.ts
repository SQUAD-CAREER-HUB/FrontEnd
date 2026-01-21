import { DOCUMENT_STATUS_META } from '../constants/documentStatus';
import { PROCESS_TYPE_META } from '../constants/processType';
import { RbcEvent } from '../types/rbcEvent';

type EventMeta = {
  label: string;
  styles: string;
};

export function getEventMeta(event: RbcEvent): EventMeta {
  const resource = event.resource;

  if (resource.stageType === 'DOCUMENT') {
    return DOCUMENT_STATUS_META[resource.documentStatus];
  }

  return PROCESS_TYPE_META[resource.stageType];
}
