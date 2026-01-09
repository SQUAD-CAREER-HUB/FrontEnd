'use client'

import { useState } from "react";
import Header from "@/features/application/new/components/Header";
import Stepper from "@/features/application/new/components/Stepper";
import URLForm from "@/features/application/new/components/URLForm";
import BasicInfoForm from "@/features/application/new/components/BasicInfoForm";
import StageStatusForm from "@/features/application/new/components/StageStatusForm";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(3);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto p-4">
      <Header />
      <Stepper currentStep={currentStep} />

      {currentStep === 1 && <URLForm onSkip={handleNext} />}
      {currentStep === 2 && <BasicInfoForm onNext={handleNext} onPrev={handlePrev} />}
      {currentStep === 3 && <StageStatusForm onNext={handleNext} onPrev={handlePrev} />}
    </div>
  );
}