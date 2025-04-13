import SignupFormOne from "@/components/custom/registerStepOne";
import SignupFormTwo from "@/components/custom/registerStepTwo";
import { useState } from "react";

export default function Register() {
  const [step, setStep] = useState(1);

  return (
    <div>
      {step === 1 ? (
        <SignupFormOne onNext={() => setStep(2)} />
      ) : (
        <SignupFormTwo onBack={() => setStep(1)} />
      )}
    </div>
  );
}
