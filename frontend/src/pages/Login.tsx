import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "@/hooks/useAuth"; // Import context-driven auth

type FormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onFormSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      //!save one day of debugging reading this
      // The issue was your login request used fetch without credentials: 'include',
      // so the token cookie was never sent to the backend on
      // subsequent requests. Postman worked because it always sends cookies once they're set.
      // Your frontend didn't.
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Now that the cookie is set, refresh user in context
      await refreshUser();

      toast.success("Login successful!"); // Show success toast
      navigate("/app"); // Redirect to app with user in context
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        // console.error("login failed:", error);
        toast.error(`Login failed, check your email and password`);
      } else {
        // console.error("login failed:", error);
        toast.error("Login failed");
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const onDemoLogin = async () => {
    setDemoLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;

      const response = await fetch(`${API_URL}/api/v1/auth/demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      // Now that the cookie is set, refresh user in context
      await refreshUser();

      toast.success("Demo login successful! Welcome to the demo."); // Show success toast
      navigate("/app"); // Redirect to app with user in context
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Demo login failed: ${error.message}`);
      } else {
        toast.error("Demo login failed");
      }
      throw error;
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center rounded-t-none rounded-b-md p-4 sm:h-[580px] sm:w-[400px] sm:rounded-md sm:p-6 md:rounded-md lg:h-[600px] lg:w-[490px]">
      <h1 className="text-text-accent mb-6 text-center text-3xl font-bold sm:mb-8 sm:text-4xl">
        Login
      </h1>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="space-y-4 sm:space-y-6"
      >
        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="email"
            className="block text-sm text-[#494c6b] sm:text-base"
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

        <div className="space-y-1 sm:space-y-2">
          <label
            htmlFor="password"
            className="block text-sm text-[#494c6b] sm:text-base"
          >
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="h-10 w-full rounded-md border border-[#e3e4f1] px-3 py-2 text-[#494c6b] focus:border-[#d375b9] focus:ring-1 focus:ring-[#d375b9] focus:outline-none sm:h-12"
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

        <Button
          type="submit"
          disabled={loading}
          className="bg-bg-accent hover:bg-accent/90 mt-2 flex h-10 w-full cursor-pointer items-center justify-center gap-1 rounded-md text-sm text-white sm:mt-4 sm:h-12 sm:gap-2 sm:text-xl"
        >
          {loading ? (
            "Logging in..."
          ) : (
            <>
              Login <ArrowRight size={16} className="sm:h-[18px] sm:w-[18px]" />
            </>
          )}
        </Button>
      </form>

      {/* Demo Login Button */}
      <div className="mt-4 sm:mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#e3e4f1]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-[#494c6b]">Or</span>
          </div>
        </div>
        
        <Button
          type="button"
          onClick={onDemoLogin}
          disabled={demoLoading}
          variant="outline"
          className="mt-4 flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-[#d375b9] bg-white text-[#d375b9] hover:bg-[#d375b9] hover:text-white sm:mt-6 sm:h-12 sm:gap-3 sm:text-lg"
        >
          {demoLoading ? (
            "Loading demo..."
          ) : (
            <>
              <Play size={16} className="sm:h-[18px] sm:w-[18px]" />
              Continue as Demo
            </>
          )}
        </Button>
      </div>

      <div className="mt-4 text-center sm:mt-6">
        <p className="font-josefin text-sm text-[#494c6b] sm:text-base">
          Don't have an account?{" "}
          <Link to="/register" className="text-text-accent hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
