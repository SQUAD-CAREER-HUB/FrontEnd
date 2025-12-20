import { DOCUMENT_STATUS_META } from '../_constants/documentStatus';
import { PROCESS_TYPE_META } from '../_constants/processType';
import { RbcEvent } from '../_types/rbcEvent';

type EventMeta = {
  label: string;
  styles: string;
};

export function getEventMeta(event: RbcEvent): EventMeta {
  const resource = event.resource;

  if (resource.processType === 'DOCUMENT') {
    return DOCUMENT_STATUS_META[resource.documentStatus];
  }

  return PROCESS_TYPE_META[resource.processType];
}
