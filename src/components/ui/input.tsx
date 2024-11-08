import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-2 h-9 w-full rounded-md border focus-within:border-input bg-transparent px-4 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-within:focus-visible:outline-none focus-within:focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 focus-within:border-amber-700",
          className
        )}
      >
        {icon && icon}
        <input className="flex-1 focus:outline-none focus:border-none" type={type} ref={ref} {...props} />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
