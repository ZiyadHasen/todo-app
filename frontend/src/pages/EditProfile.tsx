"use client";

import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Move CustomInput outside to preserve component identity and prevent remounts
const CustomInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`w-full rounded-md border border-slate-200 px-3 py-2 text-slate-600 placeholder-slate-400 focus:ring-2 focus:ring-slate-300 focus:outline-none ${className}`}
    style={{ boxShadow: "none" }}
    {...props}
  />
));
CustomInput.displayName = "CustomInput";

export default function UserInfoForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "mohamed@gmail.com",
    password: "",
    username: "mohamed",
    phone: "01125252525",
    birthdayYear: "1990",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-4 rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold text-[#D375B9]">
          Modify User Information
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="font-medium text-slate-700">
              Email
            </Label>
            <CustomInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="font-medium text-slate-700">
              Password
            </Label>
            <div className="relative">
              <CustomInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-slate-400"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="font-medium text-slate-700">
              Username
            </Label>
            <CustomInput
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="font-medium text-slate-700">
              Phone
            </Label>
            <CustomInput
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Birth Year */}
          <div className="space-y-2">
            <Label
              htmlFor="birthdayYear"
              className="font-medium text-slate-700"
            >
              Birth Year
            </Label>
            <CustomInput
              id="birthdayYear"
              name="birthdayYear"
              type="text"
              value={formData.birthdayYear}
              onChange={handleChange}
              placeholder="Enter your birth year"
            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-[#D375B9] py-3 text-lg font-medium text-white"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
