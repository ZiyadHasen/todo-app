import RegisterStepOne from "@/components/custom/registerStepOne";
import RegisterStepTwo from "@/components/custom/registerStepTwo";
import { useState } from "react";

export default function Register() {
  const [step, setStep] = useState(1);

  return (
    <div>
      {step === 1 ? (
        <RegisterStepOne onNext={() => setStep(2)} />
      ) : (
        <RegisterStepTwo onBack={() => setStep(1)} />
      )}
    </div>
  );
}
