'use client'

import { StepIndicator } from "./StepIndicator";
import { steps } from "../../contants";

interface StepperProps {
  currentStep: number;
}

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="mb-12 relative">
      <StepIndicator steps={steps} currentStep={currentStep} />
    </div>
  );
}