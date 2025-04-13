"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SignupFormTwoProps {
  onBack: () => void;
}

export default function SignupFormTwo({ onBack }: SignupFormTwoProps) {
  return (
    <div className="mx-auto w-full max-w-[90%] bg-white p-4 sm:max-w-md sm:p-6">
      <h1 className="mb-4 text-center text-3xl font-bold text-[#d176b6] sm:mb-6 sm:text-4xl">
        Complete Signup
      </h1>

      <form className="space-y-4 sm:space-y-3">
        <div className="space-y-1 sm:space-y-1">
          <label
            htmlFor="text"
            className="block text-sm text-gray-600 sm:text-base"
          >
            Username
          </label>
          <Input
            id="text"
            type="text"
            className="h-10 w-full rounded-md border border-gray-200 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
          />
        </div>
        <div className="space-y-1 sm:space-y-1">
          <label
            htmlFor="text"
            className="block text-sm text-gray-600 sm:text-base"
          >
            Phone number
          </label>
          <Input
            id="phone_number"
            type="text"
            className="h-10 w-full rounded-md border border-gray-200 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
          />
        </div>
        <div className="space-y-1 sm:space-y-1">
          <label
            htmlFor="year"
            className="block text-sm text-gray-600 sm:text-base"
          >
            Birth Year
          </label>
          <Input
            id="year"
            type="text"
            className="h-10 w-full rounded-md border border-gray-200 focus:border-2 focus:border-[#d176b6] focus:ring-0 focus:outline-none sm:h-12"
          />
        </div>

        <Link
          to="/"
          className="mt-2 flex h-10 w-full items-center justify-center gap-1 rounded-md bg-[#d176b6] text-sm text-white hover:bg-[#c065a5] sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          Complete signup
          <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
        </Link>
        <Button
          onClick={onBack}
          className="mt-2 flex h-10 w-full items-center justify-center gap-1 rounded-md bg-[#7C8495] text-sm text-white hover:bg-[#464C55] sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          Back
          <ArrowLeft size={16} className="sm:h-[18px] sm:w-[18px]" />
        </Button>
      </form>

      <div className="mt-3 text-center sm:mt-4">
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
