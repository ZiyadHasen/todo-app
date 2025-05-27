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
    <div className="bg-background-default flex flex-col justify-center rounded-b-md p-4 sm:h-[580px] sm:w-[400px] sm:rounded-md sm:p-6 lg:h-[600px] lg:w-[490px]">
      <h1 className="text-text-accent my-4 text-center text-2xl font-bold sm:mb-8 sm:text-4xl">
        Signup
      </h1>

      <form className="space-y-4 sm:space-y-6">
        {/* Email Field */}
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="email"
            className="text-text-main block text-sm sm:text-base"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="h-10 w-full rounded-md border border-[#e3e4f1] px-3 py-2 text-[#494c6b] focus:border-[#d375b9] focus:ring-1 focus:ring-[#d375b9] focus:outline-none sm:h-12"
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="password"
            className="text-text-main block text-sm sm:text-base"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="h-10 w-full rounded-md border border-[#e3e4f1] px-3 py-2 text-[#494c6b] focus:border-[#d375b9] focus:ring-1 focus:ring-[#d375b9] focus:outline-none sm:h-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-text-main absolute top-1/2 right-3 -translate-y-1/2"
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
            className="text-text-main block text-sm sm:text-base"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="h-10 w-full rounded-md border border-[#e3e4f1] px-3 py-2 text-[#494c6b] focus:border-[#d375b9] focus:ring-1 focus:ring-[#d375b9] focus:outline-none sm:h-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="text-text-main absolute top-1/2 right-3 -translate-y-1/2"
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
          className="bg-bg-accent hover:bg-accent/90 mt-2 flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-md text-sm text-white sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          Complete signup{" "}
          <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
        </Button>
      </form>

      <div className="mt-4 text-center sm:mt-6">
        <p className="text-text-main text-sm sm:text-base">
          Already have an account!{" "}
          <Link to="/" className="text-text-accent hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
