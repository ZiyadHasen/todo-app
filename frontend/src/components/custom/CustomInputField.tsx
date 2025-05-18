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
    <Label htmlFor={id} className="text-text-gray font-medium">
      {label}
    </Label>
    <input
      id={id}
      ref={ref}
      className={`border-border-default focus:border-focus-outline text-text-gray placeholder-text-muted w-full rounded-md border px-3 py-2 focus:border-2 focus:ring-2 focus:outline-none ${className}`}
      style={{ boxShadow: "none" }}
      {...props}
    />
  </div>
));
CustomInputField.displayName = "CustomInputField";
