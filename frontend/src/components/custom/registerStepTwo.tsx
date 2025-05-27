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
  loading: boolean;
}

export default function SignupFormTwo({
  register,
  errors,
  onSubmit,
  onBack,
  loading,
}: SignupFormTwoProps) {
  return (
    <div className="bg-background-default flex flex-col justify-center rounded-b-md p-4 sm:h-[580px] sm:w-[400px] sm:rounded-md sm:p-6 lg:h-[600px] lg:w-[490px]">
      <h1 className="text-text-accent my-4 text-center text-2xl font-bold sm:mb-8 sm:text-4xl">
        Complete Signup
      </h1>

      <form onSubmit={onSubmit} className="space-y-4 sm:space-y-3">
        {/* Username Field */}
        <div className="space-y-1">
          <label
            htmlFor="username"
            className="text-text-main block text-sm sm:text-base"
          >
            Username
          </label>
          <Input
            id="name"
            type="text"
            {...register("name")}
            className="h-10 w-full rounded-md border border-[#e3e4f1] px-3 py-2 text-[#494c6b] focus:border-[#d375b9] focus:ring-1 focus:ring-[#d375b9] focus:outline-none sm:h-12"
          />
          {errors.name && (
            <span className="text-sm text-red-500">{errors.name.message}</span>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-1">
          <label
            htmlFor="phone"
            className="text-text-main block text-sm sm:text-base"
          >
            Phone number
          </label>
          <Input
            id="phone"
            type="text"
            {...register("phone")}
            className="h-10 w-full rounded-md border border-[#e3e4f1] px-3 py-2 text-[#494c6b] focus:border-[#d375b9] focus:ring-1 focus:ring-[#d375b9] focus:outline-none sm:h-12"
          />
          {errors.phone && (
            <span className="text-sm text-red-500">{errors.phone.message}</span>
          )}
        </div>

        {/* Birth Year Field */}
        <div className="space-y-1">
          <label
            htmlFor="birthYear"
            className="text-text-main block text-sm sm:text-base"
          >
            Birth Year
          </label>
          <Input
            {...register("birthYear", { valueAsNumber: true })}
            type="number"
            className="h-10 w-full rounded-md border border-[#e3e4f1] px-3 py-2 text-[#494c6b] focus:border-[#d375b9] focus:ring-1 focus:ring-[#d375b9] focus:outline-none sm:h-12"
          />
          {errors.birthYear && (
            <span className="text-sm text-red-500">
              {errors.birthYear.message}
            </span>
          )}
        </div>

        {/* Submit Button */}

        {/* Back Button */}

        <Button
          type="submit"
          disabled={loading}
          className="bg-bg-accent hover:bg-accent/90 mt-2 flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-md text-sm text-white sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          {loading ? (
            "Signing up..."
          ) : (
            <>
              Complete Signup{" "}
              <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
            </>
          )}
        </Button>

        <Button
          type="button"
          onClick={onBack}
          className="bg-bg-secondary hover:bg-btn-secondary/90 mt-2 flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-md text-sm text-white sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          <ArrowLeft size={16} className="sm:h-[18px] sm:w-[18px]" /> Back
        </Button>
      </form>

      <div className="mt-3 text-center">
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
