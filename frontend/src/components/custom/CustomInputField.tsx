import React, { forwardRef } from "react";
import { Label } from "@/components/ui/label";

// Hybrid CustomInputField component
type CustomInputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
};

export const CustomInputField = forwardRef<
  HTMLInputElement,
  CustomInputFieldProps
>(({ id, label, className = "", ...props }, ref) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="font-medium text-slate-700">
        {label}
      </Label>
      <input
        id={id}
        ref={ref}
        className={`w-full rounded-md border border-slate-200 px-3 py-2 text-slate-600 placeholder-slate-400 focus:ring-2 focus:ring-slate-300 focus:outline-none ${className}`}
        style={{ boxShadow: "none" }}
        {...props}
      />
    </div>
  );
});
