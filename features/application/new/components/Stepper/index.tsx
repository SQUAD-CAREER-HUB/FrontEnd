'use client'
import { useState } from "react";
import { StepIndicator } from "./StepIndicator";
import { steps } from "../../contants";

export default function Stepper() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  return (
    <div className="mb-12 relative">
      <StepIndicator steps = {steps} currentStep={currentStep}/>
    </div>
  )
}