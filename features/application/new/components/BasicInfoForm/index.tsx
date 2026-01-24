'use client'

import { useState } from 'react'
import { useShallow } from 'zustand/shallow'
import CardWrapper from '../common/CardWrapper'
import FormField from '../common/FormField'
import StepNavigation from '../common/StepNavigation'
import StepHeader from '../common/StepHeader'
import FormContainer from '../common/FormContainer'
import FileUploadField from '../common/FileUploadField'
import { useNewApplicationStore } from '../../stores/useNewApplicationStore'
import { validateBasicInfo } from '../../schemas/basicInfo'

interface BasicInfoFormProps {
  onNext?: () => void
  onPrev?: () => void
}

export default function BasicInfoForm({ onNext, onPrev }: BasicInfoFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    company,
    position,
    deadline,
    jobLocation,
    setCompany,
    setPosition,
    setDeadline,
    setJobLocation,
    setFiles,
  } = useNewApplicationStore(useShallow((state) => ({
    company: state.company,
    position: state.position,
    deadline: state.deadline,
    jobLocation: state.jobLocation,
    setCompany: state.setCompany,
    setPosition: state.setPosition,
    setDeadline: state.setDeadline,
    setJobLocation: state.setJobLocation,
    setFiles: state.setFiles,
  })));

  const handleNext = () => {
    const result = validateBasicInfo({
      company,
      position,
      deadline,
      jobLocation,
    });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onNext?.();
  };

  return (
    <CardWrapper>
      <div className="max-w-lg mx-auto space-y-8 py-4">
        <StepHeader
          title="기본 정보 확인"
          description="모든 필수 정보를 입력해주세요."
        />

        <FormContainer>
          <FormField
            label="회사명"
            required
            placeholder="예: Toss"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            error={errors.company}
          />

          <FormField
            label="직무"
            required
            placeholder="예: Product Designer"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            error={errors.position}
          />

          <FormField
            label="마감 일시"
            required
            type="datetime-local"
            placeholder="연도-월-일 --:--"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            error={errors.deadline}
          />

          <FormField
            label="근무지 (선택)"
            placeholder="예: 판교 테크원타워"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
          />

          <FileUploadField onFilesChange={setFiles} />
        </FormContainer>

        <StepNavigation onPrev={onPrev} onNext={handleNext} />
      </div>
    </CardWrapper>
  )
}
