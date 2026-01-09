'use client'

import { StepItem } from "./StepItem";

interface Step {
  step: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-between relative">
      {steps.map((item) => (
        <StepItem
          key={item.step}
          step={item.step}
          label={item.label}
          active={item.step === currentStep}
        />
      ))}
    </div>
  );
}
