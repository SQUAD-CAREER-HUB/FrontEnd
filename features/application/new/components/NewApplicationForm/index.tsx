'use client'

import { useShallow } from 'zustand/shallow'
import Stepper from '../Stepper'
import URLForm from '../URLForm'
import BasicInfoForm from '../BasicInfoForm'
import StageStatusForm from '../StageStatusForm'
import ConfirmForm from '../ConfirmForm'
import { useNewApplicationStore } from '../../stores/useNewApplicationStore'

export default function NewApplicationForm() {
  const { currentStep, nextStep, prevStep, reset } = useNewApplicationStore(
    useShallow((state) => ({
      currentStep: state.currentStep,
      nextStep: state.nextStep,
      prevStep: state.prevStep,
      reset: state.reset,
    }))
  );

  const handleSubmit = () => {
    // TODO: API 호출
    console.log('submit');
    reset();
  };

  return (
    <>
      <Stepper currentStep={currentStep} />

      {currentStep === 1 && <URLForm onSkip={nextStep} />}
      {currentStep === 2 && <BasicInfoForm onNext={nextStep} onPrev={prevStep} />}
      {currentStep === 3 && <StageStatusForm onNext={nextStep} onPrev={prevStep} />}
      {currentStep === 4 && <ConfirmForm onPrev={prevStep} onSubmit={handleSubmit} />}
    </>
  );
}
