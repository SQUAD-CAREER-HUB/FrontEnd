'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PROCESS_TYPE_OPTIONS } from '../_constants/processType';
import { Checkbox } from '@/components/ui/checkbox';
import { DOCUMENT_STATUS_OPTIONS } from '../_constants/documentStatus';
import { RESULT_STATUS_OPTIONS } from '../_constants/resultStatus';
import { useState } from 'react';

export default function FilterPanelContent() {
  const companies = [
    '버킷플레이스 (오늘의집)',
    '카카오',
    '네이버',
    '쿠팡',
    '라인플러스',
  ];

  const [company, setCompany] = useState(companies[0]);

  return (
    <>
      <div className='p-4 flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Label className='text-base font-semibold text-slate-800'>
            기업 선택
          </Label>
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

        {/* 전형 필터 */}
        <div className='flex flex-col gap-2'>
          <p className='font-semibold text-slate-800'>전형 종류</p>
          {PROCESS_TYPE_OPTIONS.map((option) => (
            <Label htmlFor={option.value} key={option.value}>
              <Checkbox id={option.value} />
              {option.label}
            </Label>
          ))}
        </div>

        {/* 서류 상태 필터 */}
        <div className='flex flex-col gap-2'>
          <p className='font-semibold text-slate-800'>서류 상태</p>
          {DOCUMENT_STATUS_OPTIONS.map((option) => (
            <Label
              htmlFor={option.value}
              key={option.value}
              className='flex items-center gap-2 text-sm'
            >
              <Checkbox id={option.value} />
              {option.label}
            </Label>
          ))}
        </div>

        {/* 결과 필터*/}
        <div className='flex flex-col gap-2'>
          <p className='font-semibold text-slate-800'>결과 상태</p>
          {RESULT_STATUS_OPTIONS.map((option) => (
            <Label
              htmlFor={option.value}
              key={option.value}
              className='flex items-center gap-2 text-sm'
            >
              <Checkbox id={option.value} />
              {option.label}
            </Label>
          ))}
        </div>
      </div>
    </>
  );
}
