import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";

type CustomInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

export const CustomInputField = forwardRef<
  HTMLInputElement,
  CustomInputFieldProps
>(({ id, label, className = "", ...props }, ref) => (
  <div className="space-y-2">
    <Label htmlFor={id} className="text-text-label font-medium">
      {label}
    </Label>
    <input
      id={id}
      ref={ref}
      className={`border-border text-text-main w-full rounded-md border px-3 py-2 focus:border-2 focus:border-[#d375b9] focus:ring-2 focus:ring-[#d375b9] focus:outline-none ${className}`}
      style={{ boxShadow: "none" }}
      {...props}
    />
  </div>
));
CustomInputField.displayName = "CustomInputField";
