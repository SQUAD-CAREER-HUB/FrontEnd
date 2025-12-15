import { PROCESS_TYPE_META } from '../../_constants/processType';

import { RbcEvent } from '../../_types/rbcEvent';

export default function Event({ event }: { event: RbcEvent }) {
  const bgColor = PROCESS_TYPE_META[event.resource.processType].bgColor;
  const color = PROCESS_TYPE_META[event.resource.processType].color;
  const borderColor = PROCESS_TYPE_META[event.resource.processType].borderColor;

  return (
    <div
      className={`h-full font-semibold text-sm rounded ${bgColor} ${color} border ${borderColor}`}
    >
      <div>{event.title}</div>
    </div>
  );
}
