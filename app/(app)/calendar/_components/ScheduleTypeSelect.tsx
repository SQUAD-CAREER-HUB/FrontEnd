import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function ScheduleTypeSelect({
  value,
  onChange,
}: {
  value: 'INTERVIEW' | 'ETC';
  onChange: (value: 'INTERVIEW' | 'ETC') => void;
}) {
  return (
    <RadioGroup value={value} onValueChange={onChange}>
      <div>전형 종류</div>

      <div className='grid grid-cols-2 gap-3'>
        <Label
          htmlFor='interview'
          className='flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-muted'
        >
          <RadioGroupItem value='INTERVIEW' id='interview' />
          <div>
            <p className='font-medium'>면접 전형</p>
            <p className='text-sm text-muted-foreground'>기술·인성·임원 면접</p>
          </div>
        </Label>

        <Label
          htmlFor='etc'
          className='flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-muted'
        >
          <RadioGroupItem value='ETC' id='etc' />
          <div>
            <p className='font-medium'>기타 전형</p>
            <p className='text-sm text-muted-foreground'>
              코딩 테스트, 과제, AI 검사
            </p>
          </div>
        </Label>
      </div>
    </RadioGroup>
  );
}
