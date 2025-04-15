import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validationSchema";
import SignupFormOne from "@/components/custom/registerStepOne";
import SignupFormTwo from "@/components/custom/registerStepTwo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  birthYear: number;
};

export default function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
  });

  // Handle form submission
  const onFormSubmit = async (data: FormData) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            birthYear: Number(data.birthYear),
            confirmPassword: undefined, // Remove if backend doesn't need it
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Registration successful:", result);
      navigate("/"); // Redirect to home
      return result;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  // Validate Step 1 fields before proceeding to Step 2
  const handleNext = async () => {
    const isStepOneValid = await trigger([
      "email",
      "password",
      "confirmPassword",
    ]);
    if (isStepOneValid) {
      setStep(2);
    }
  };

  // Wrap handleSubmit to check for Step 1 errors and navigate back
  const handleFormSubmit = handleSubmit(onFormSubmit, () => {
    // If there are errors in Step 1 fields, go back to Step 1
    if (errors.email || errors.password || errors.confirmPassword) {
      setStep(1);
    }
  });

  return (
    <div>
      {step === 1 ? (
        <SignupFormOne
          register={register}
          errors={errors}
          onNext={handleNext}
        />
      ) : (
        <SignupFormTwo
          register={register}
          errors={errors}
          onBack={() => setStep(1)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}
