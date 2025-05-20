import { Loader2 } from "lucide-react";

export const Spinner = () => (
  <div className="flex items-center justify-center py-3">
    <Loader2 className="text-accent h-6 w-6 animate-spin" />
  </div>
);
