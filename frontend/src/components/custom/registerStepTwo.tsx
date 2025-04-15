"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
  birthYear: number;
}

interface SignupFormTwoProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

export default function SignupFormTwo({
  register,
  errors,
  onSubmit,
  onBack,
}: SignupFormTwoProps) {
  return (
    <div className="flex h-[450px] w-[340px] flex-col justify-center rounded-md bg-white p-4 sm:h-[500px] sm:w-[400px] sm:p-6 lg:h-[600px] lg:w-[490px]">
      <h1 className="mb-4 text-center text-3xl font-bold text-[#d176b6] sm:mb-6 sm:text-4xl">
        Complete Signup
      </h1>

      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-3">
        {/* Username Field */}
        <div className="space-y-1">
          <label
            htmlFor="username"
            className="block text-sm text-gray-600 sm:text-base"
          >
            Username
          </label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            className="h-10 w-full rounded-md border border-gray-200 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-1">
          <label
            htmlFor="phone"
            className="block text-sm text-gray-600 sm:text-base"
          >
            Phone number
          </label>
          <Input
            id="phone"
            type="text"
            {...register("phone")}
            className="h-10 w-full rounded-md border border-gray-200 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
          />
          {errors.phone && (
            <span className="text-sm text-red-500">{errors.phone.message}</span>
          )}
        </div>

        {/* Birth Year Field */}
        <div className="space-y-1">
          <label
            htmlFor="birthYear"
            className="block text-sm text-gray-600 sm:text-base"
          >
            Birth Year
          </label>
          <Input
            {...register("birthYear", { valueAsNumber: true })}
            type="number"
            className="h-10 w-full rounded-md border border-gray-200 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
          />
          {errors.birthYear && (
            <span className="text-sm text-red-500">
              {errors.birthYear.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="mt-2 flex h-10 w-full items-center justify-center gap-1 rounded-md bg-[#d176b6] text-sm text-white hover:bg-[#c065a5] sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          Complete signup{" "}
          <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
        </Button>

        {/* Back Button */}
        <Button
          type="button"
          onClick={onBack}
          className="mt-2 flex h-10 w-full items-center justify-center gap-1 rounded-md bg-[#7C8495] text-sm text-white hover:bg-[#464C55] sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          <ArrowLeft size={16} className="sm:h-[18px] sm:w-[18px]" /> Back
        </Button>
      </form>

      <div className="mt-3 text-center">
        <p className="text-sm text-gray-600 sm:text-base">
          Already have an account!{" "}
          <Link to="/" className="text-[#d176b6] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
