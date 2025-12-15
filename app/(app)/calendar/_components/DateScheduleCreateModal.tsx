'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDateScheduleCreateStore } from '../_stores/useDateScheduleCreateStore';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { ScheduleTypeSelect } from './ScheduleTypeSelect';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { DateTimePicker } from '@/components/ui/date-time-picker';

export default function DateScheduleCreateModal() {
  const { isOpen, close, selectedDate } = useDateScheduleCreateStore();

  const companies = [
    '버킷플레이스 (오늘의집)',
    '카카오',
    '네이버',
    '쿠팡',
    '라인플러스',
  ];

  const interviewTypes = ['기술 면접', '임원 면접', '인사 면접', '기타'];

  const [scheduleType, setScheduleType] = useState<'INTERVIEW' | 'ETC'>(
    'INTERVIEW'
  );
  const [company, setCompany] = useState(companies[0]);
  const [interviewType, setInterviewType] = useState(interviewTypes[0]);
  const [customInterviewType, setCustomInterviewType] = useState('');
  const [date, setDate] = useState<Date | undefined>(selectedDate || undefined);
  const [location, setLocation] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='sm:max-w-[480px]'>
        <DialogHeader>
          <DialogTitle>일정 추가</DialogTitle>
          {selectedDate ? (
            <DialogDescription>
              {selectedDate
                ? format(selectedDate, 'yyyy년 MM월 dd일', { locale: ko })
                : ''}{' '}
              에 새로운 일정을 추가합니다.
            </DialogDescription>
          ) : null}
        </DialogHeader>

        {/* 폼 영역 */}
        <div className='space-y-4'>
          <ScheduleTypeSelect value={scheduleType} onChange={setScheduleType} />

          {/* 대상 기업 */}
          <div className='grid gap-1'>
            <Label>대상 기업</Label>
            <Select value={company} onValueChange={setCompany}>
              <SelectTrigger>
                <SelectValue placeholder='기업 선택' />
              </SelectTrigger>
              <SelectContent>
                {companies.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 면접 종류 */}
          <div className='grid gap-1'>
            <Label>면접 종류</Label>
            <Select value={interviewType} onValueChange={setInterviewType}>
              <SelectTrigger>
                <SelectValue placeholder='면접 종류 선택' />
              </SelectTrigger>
              <SelectContent>
                {interviewTypes.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {interviewType === '기타' && (
              <Input
                placeholder='면접 종류를 입력하세요'
                value={customInterviewType}
                onChange={(e) => setCustomInterviewType(e.target.value)}
              />
            )}
          </div>

          {/* 일시 */}
          <div className='grid gap-1'>
            <DateTimePicker />
          </div>

          {/* 장소 / 링크 */}
          <div className='grid gap-1'>
            <Label>장소 / 링크</Label>
            <Input
              placeholder='예: Google Meet, 본사 10층'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className='flex justify-end gap-2 pt-4'>
          <Button variant='outline' onClick={close}>
            취소
          </Button>
          <Button>일정 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
