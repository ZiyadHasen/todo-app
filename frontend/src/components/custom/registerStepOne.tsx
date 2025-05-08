"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
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

interface SignupFormOneProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  onNext: () => Promise<void>;
}

export default function SignupFormOne({
  register,
  errors,
  onNext,
}: SignupFormOneProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex h-[450px] w-[340px] flex-col justify-center rounded-md bg-white p-4 sm:h-[500px] sm:w-[400px] sm:p-6 lg:h-[600px] lg:w-[490px]">
      <h1 className="mb-6 text-center text-3xl font-bold text-[#d176b6] sm:mb-8 sm:text-4xl">
        Signup
      </h1>

      <form className="space-y-4 sm:space-y-6">
        {/* Email Field */}
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="email"
            className="block text-sm text-gray-600 sm:text-base"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="h-10 w-full rounded-md border border-gray-200 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="password"
            className="block text-sm text-gray-600 sm:text-base"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="h-10 w-full rounded-md border border-gray-200 pr-10 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff size={18} className="sm:h-5 sm:w-5" />
              ) : (
                <Eye size={18} className="sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-600 sm:text-base"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="h-10 w-full rounded-md border border-gray-200 pr-10 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              aria-label="Toggle confirm password visibility"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} className="sm:h-5 sm:w-5" />
              ) : (
                <Eye size={18} className="sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Next Button */}
        <Button
          type="button"
          onClick={onNext}
          className="mt-2 flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-md bg-[#d176b6] text-sm text-white hover:bg-[#c065a5] sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          Next <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
        </Button>
      </form>

      <div className="mt-4 text-center sm:mt-6">
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
