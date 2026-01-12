'use client';

import { Label } from '@/shared/components/ui/label';
import {
  PROCESS_TYPE_META,
  PROCESS_TYPE_OPTIONS,
} from '../constants/processType';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  DOCUMENT_STATUS_META,
  DOCUMENT_STATUS_OPTIONS,
} from '../constants/documentStatus';
import {
  RESULT_STATUS_META,
  RESULT_STATUS_OPTIONS,
} from '../constants/resultStatus';
import {
  CircleCheckBigIcon,
  FileTextIcon,
  FunnelIcon,
  SearchIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/shared/components/ui/input-group';
import { useFilterValueStore } from '../stores/useFilterValueStore';
import { cn } from '@/shared/lib/utils';

export default function FilterPanelContent() {
  const {
    processTypes,
    documentStatuses,
    resultStatuses,
    toggleProcessType,
    toggleDocumentStatus,
    toggleResultStatus,
  } = useFilterValueStore();

  return (
    <>
      <div className='p-4 flex flex-col gap-6'>
        <div className='flex flex-col gap-2'>
          <Label className='text-base font-black text-slate-800'>
            <SearchIcon className='w-4 h-4 text-primary stroke-3' />
            기업 검색
          </Label>
          <InputGroup>
            <InputGroupInput placeholder='기업명 검색' />
            <InputGroupAddon>
              <SearchIcon className='stroke-3' />
            </InputGroupAddon>
            <InputGroupAddon align='inline-end'>
              <InputGroupButton>검색</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* 전형 필터 */}
        <div className='flex flex-col gap-2'>
          <div className='font-black text-slate-800 flex items-center gap-x-1'>
            <SlidersHorizontalIcon className='w-4 h-4 text-primary stroke-3' />
            지원 관리 단계
          </div>

          {PROCESS_TYPE_OPTIONS.map((option) => {
            const isChecked = processTypes.includes(option.value);
            return (
              <Label
                htmlFor={option.value}
                key={option.value}
                className={cn(
                  'flex justify-between font-bold items-center gap-2 text-sm p-2 rounded border cursor-pointer transition-all',
                  !isChecked && 'hover:bg-brand-50/30 hover:scale-[1.02]',
                  isChecked &&
                    option.value === 'DOCUMENT' &&
                    PROCESS_TYPE_META.DOCUMENT.styles,
                  isChecked &&
                    option.value === 'ETC' &&
                    PROCESS_TYPE_META.ETC.styles,
                  isChecked &&
                    option.value === 'INTERVIEW' &&
                    PROCESS_TYPE_META.INTERVIEW.styles,
                  isChecked &&
                    option.value === 'APPLICATION_CLOSE' &&
                    PROCESS_TYPE_META.APPLICATION_CLOSE.styles
                )}
              >
                <Checkbox
                  id={option.value}
                  checked={processTypes.includes(option.value)}
                  onCheckedChange={() => toggleProcessType(option.value)}
                  className='hidden'
                />
                {option.label}
                {isChecked && <CircleCheckBigIcon className='w-3 h-3' />}
              </Label>
            );
          })}
        </div>

        {/* 서류 상태 필터 */}
        <div className='flex flex-col gap-2'>
          <div className='font-black text-slate-800 flex items-center gap-x-1'>
            <FileTextIcon className='w-4 h-4 text-primary stroke-3' />
            서류 상태
          </div>

          {DOCUMENT_STATUS_OPTIONS.map((option) => {
            const isChecked = documentStatuses.includes(option.value);
            return (
              <Label
                htmlFor={option.value}
                key={option.value}
                className={cn(
                  'flex justify-between font-bold items-center gap-2 text-sm p-2 rounded border cursor-pointer transition-all',
                  !isChecked && 'hover:bg-brand-50/30 hover:scale-[1.02]',
                  isChecked &&
                    option.value === 'SUBMITTED' &&
                    DOCUMENT_STATUS_META.SUBMITTED.styles,
                  isChecked &&
                    option.value === 'NOT_SUBMITTED' &&
                    DOCUMENT_STATUS_META.NOT_SUBMITTED.styles
                )}
              >
                <Checkbox
                  id={option.value}
                  className='hidden'
                  checked={documentStatuses.includes(option.value)}
                  onCheckedChange={() => toggleDocumentStatus(option.value)}
                />
                {option.label}
                {isChecked && <CircleCheckBigIcon className='w-3 h-3' />}
              </Label>
            );
          })}
        </div>

        {/* 결과 필터*/}
        <div className='flex flex-col gap-2'>
          <div className='font-black text-slate-800 flex items-center gap-x-1'>
            <FunnelIcon className='w-4 h-4 text-primary stroke-3' />
            결과 상태
          </div>

          {RESULT_STATUS_OPTIONS.map((option) => {
            const isChecked = resultStatuses.includes(option.value);

            return (
              <Label
                htmlFor={option.value}
                key={option.value}
                className={cn(
                  'flex justify-between items-center gap-2 font-bold text-sm p-2 rounded border cursor-pointer transition-all',
                  !isChecked && 'hover:bg-brand-50/30 hover:scale-[1.02]',
                  isChecked &&
                    option.value === 'PROCESS_PASS' &&
                    RESULT_STATUS_META.PROCESS_PASS.styles,
                  isChecked &&
                    option.value === 'FINAL_PASS' &&
                    RESULT_STATUS_META.FINAL_PASS.styles,
                  isChecked &&
                    option.value === 'FINAL_FAIL' &&
                    RESULT_STATUS_META.FINAL_FAIL.styles
                )}
              >
                <Checkbox
                  id={option.value}
                  checked={resultStatuses.includes(option.value)}
                  onCheckedChange={() => toggleResultStatus(option.value)}
                  className='hidden'
                />
                {option.label}
                {isChecked && <CircleCheckBigIcon className='w-3 h-3' />}
              </Label>
            );
          })}
        </div>
      </div>
    </>
  );
}
