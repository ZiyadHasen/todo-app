"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
interface SignupFormTwoProps {
  onNext: () => void;
}

export default function SignupFormOne({ onNext }: SignupFormTwoProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[90%] bg-white p-4 sm:max-w-md sm:p-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-[#d176b6] sm:mb-8 sm:text-4xl">
        Signup
      </h1>

      <form className="space-y-4 sm:space-y-6">
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
            className="h-10 w-full rounded-md border border-gray-200 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
          />
        </div>

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
              className="h-10 w-full rounded-md border border-gray-200 pr-10 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="sm:h-5 sm:w-5" />
              ) : (
                <Eye size={18} className="sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm text-gray-600 sm:text-base"
          >
            Confirm password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="h-10 w-full rounded-md border border-gray-200 pr-10 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={18} className="sm:h-5 sm:w-5" />
              ) : (
                <Eye size={18} className="sm:h-5 sm:w-5" />
              )}
            </button>
          </div>
        </div>

        <Button
          onClick={onNext}
          className="mt-2 flex h-10 w-full items-center justify-center gap-1 rounded-md bg-[#d176b6] text-sm text-white hover:bg-[#c065a5] sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          Complete signup{" "}
          <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
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
