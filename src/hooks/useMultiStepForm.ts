import { useState } from "react";

export function useMultiStepForm(steps: number) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);

    const nextStep = () => {
        if (currentStepIndex < steps - 1) {
            setCurrentStepIndex((i) => i + 1);
        } else if (currentStepIndex === steps - 1) {
            setShowSuccessMsg(true);
        }
    };

    const previousStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((i) => i - 1);
        }
    };

    const goTo = (index: number) => {
        setCurrentStepIndex(index);
    };

    return {
        currentStepIndex,
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps - 1,
        showSuccessMsg,
        setShowSuccessMsg,
        goTo,
        nextStep,
        previousStep,
    };
}
