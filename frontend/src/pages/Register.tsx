import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/validationSchema";
import SignupFormOne from "@/components/custom/registerStepOne";
import SignupFormTwo from "@/components/custom/registerStepTwo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const { confirmPassword, ...apiData } = data;

      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...apiData,
          birthYear: Number(data.birthYear),
        }),
      });

      const result = await response.json();
      console.log("Registration successful:", result);

      if (!response.ok) {
        // use the server’s message if you have one
        return toast.error(
          response.status === 409
            ? result.error || "Email already registered."
            : result.error || "Registration failed.",
        );
      }
      toast.success("Signup successful. Please log in.");
      navigate("/");

      return result;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
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
          loading={loading}
        />
      )}
    </div>
  );
}
