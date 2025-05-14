import React, { forwardRef } from "react";

export const CustomInput = forwardRef<
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
