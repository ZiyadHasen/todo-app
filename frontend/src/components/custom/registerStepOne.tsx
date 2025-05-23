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
      <h1 className="text-accent my-4 text-center text-2xl font-bold sm:mb-8 sm:text-4xl">
        Signup
      </h1>

      <form className="space-y-4 sm:space-y-6">
        {/* Email Field */}
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="email"
            className="text-text-gray block text-sm sm:text-base"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="border-border-default focus:border-focus-outline h-10 w-full rounded-md border focus:border-2 focus:ring-0 focus:outline-none sm:h-12"
          />
          {errors.email && (
            <span className="text-error text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="password"
            className="text-text-gray block text-sm sm:text-base"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="border-border-default focus:border-focus-outline h-10 w-full rounded-md border pr-10 focus:border-2 focus:ring-0 focus:outline-none sm:h-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-text-gray absolute top-1/2 right-3 -translate-y-1/2"
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
            <span className="text-error text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-text-gray block text-sm sm:text-base"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="border-border-default focus:border-focus-outline h-10 w-full rounded-md border pr-10 focus:border-2 focus:ring-0 focus:outline-none sm:h-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="text-text-gray absolute top-1/2 right-3 -translate-y-1/2"
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
            <span className="text-error text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={onNext}
          className="bg-accent text-text-inverted hover:bg-accent/90 mt-2 flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-md text-sm sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          Complete signup{" "}
          <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
        </button>
      </form>

      <div className="mt-4 text-center sm:mt-6">
        <p className="text-text-gray text-sm sm:text-base">
          Already have an account!{" "}
          <Link to="/" className="text-text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
