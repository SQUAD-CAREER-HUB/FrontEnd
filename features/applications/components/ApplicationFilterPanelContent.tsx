'use client';

import { Label } from '@/shared/components/ui/label';
import { STAGE_TYPE_META, STAGE_TYPE_OPTIONS } from '../constants/stageType';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  SUBMISSION_STATUS_META,
  SUBMISSION_STATUS_OPTIONS,
} from '../constants/submissionStatus';
import {
  STAGE_RESULT_META,
  STAGE_RESULT_OPTIONS,
} from '../constants/stageResult';
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
import { useApplicationFilterValueStore } from '../stores/useApplicationFilterValueStore';
import { cn } from '@/shared/lib/utils';
import { useState } from 'react';

export default function ApplicationFilterPanelContent() {
  const {
    query,
    stageTypes,
    submissionStatus,
    stageResult,
    setQuery,
    toggleStageType,
    setSubmissionStatus,
    setStageResult,
  } = useApplicationFilterValueStore();

  const [searchInput, setSearchInput] = useState(query);

  const handleSearch = () => {
    setQuery(searchInput);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className='flex flex-col gap-6 bg-white'>
        {/* 검색 */}
        <div className='flex flex-col gap-2'>
          <Label className='text-base font-black text-slate-800'>
            <SearchIcon className='w-4 h-4 text-primary stroke-3' />
            기업/직무 검색
          </Label>
          <InputGroup>
            <InputGroupInput
              placeholder='기업명 또는 직무 검색'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <InputGroupAddon>
              <SearchIcon className='stroke-3' />
            </InputGroupAddon>
            <InputGroupAddon align='inline-end'>
              <InputGroupButton onClick={handleSearch}>검색</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* 지원 단계 필터 */}
        <div className='flex flex-col gap-2'>
          <div className='font-black text-slate-800 flex items-center gap-x-1'>
            <SlidersHorizontalIcon className='w-4 h-4 text-primary stroke-3' />
            지원 단계
          </div>

          {STAGE_TYPE_OPTIONS.map((option) => {
            const isChecked = stageTypes.includes(option.value);
            return (
              <Label
                htmlFor={`stage-${option.value}`}
                key={option.value}
                className={cn(
                  'flex justify-between font-bold items-center gap-2 text-sm p-2 rounded border cursor-pointer transition-all',
                  !isChecked && 'hover:bg-brand-50/30 hover:scale-[1.02]',
                  isChecked && STAGE_TYPE_META[option.value].styles
                )}
              >
                <Checkbox
                  id={`stage-${option.value}`}
                  checked={stageTypes.includes(option.value)}
                  onCheckedChange={() => toggleStageType(option.value)}
                  className='hidden'
                />
                {option.label}
                {isChecked && <CircleCheckBigIcon className='w-3 h-3' />}
              </Label>
            );
          })}
        </div>

        {/* 서류 상태 필터 - 서류전형이 선택되어 있거나 아무것도 선택하지 않았을 때만 표시 */}
        {(stageTypes.length === 0 || stageTypes.includes('DOCUMENT')) && (
          <div className='flex flex-col gap-2'>
            <div className='font-black text-slate-800 flex items-center gap-x-1'>
              <FileTextIcon className='w-4 h-4 text-primary stroke-3' />
              서류 상태
            </div>

            {SUBMISSION_STATUS_OPTIONS.map((option) => {
              const isChecked = submissionStatus === option.value;
              return (
                <Label
                  htmlFor={`submission-${option.value}`}
                  key={option.value}
                  className={cn(
                    'flex justify-between font-bold items-center gap-2 text-sm p-2 rounded border cursor-pointer transition-all',
                    !isChecked && 'hover:bg-brand-50/30 hover:scale-[1.02]',
                    isChecked && SUBMISSION_STATUS_META[option.value].styles
                  )}
                >
                  <Checkbox
                    id={`submission-${option.value}`}
                    className='hidden'
                    checked={isChecked}
                    onCheckedChange={() => setSubmissionStatus(option.value)}
                  />
                  {option.label}
                  {isChecked && <CircleCheckBigIcon className='w-3 h-3' />}
                </Label>
              );
            })}
          </div>
        )}

        {/* 결과 필터 */}
        <div className='flex flex-col gap-2'>
          <div className='font-black text-slate-800 flex items-center gap-x-1'>
            <FunnelIcon className='w-4 h-4 text-primary stroke-3' />
            결과 상태
          </div>

          {STAGE_RESULT_OPTIONS.map((option) => {
            const isChecked = stageResult === option.value;

            return (
              <Label
                htmlFor={`result-${option.value}`}
                key={option.value}
                className={cn(
                  'flex justify-between items-center gap-2 font-bold text-sm p-2 rounded border cursor-pointer transition-all',
                  !isChecked && 'hover:bg-brand-50/30 hover:scale-[1.02]',
                  isChecked && STAGE_RESULT_META[option.value].styles
                )}
              >
                <Checkbox
                  id={`result-${option.value}`}
                  checked={isChecked}
                  onCheckedChange={() => setStageResult(option.value)}
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
