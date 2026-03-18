import { cva, type VariantProps } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#22C55E] text-[#0A0A0A] hover:bg-[#16A34A] focus-visible:ring-[#22C55E]",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500",
        outline:
          "border border-[#2A2A2A] bg-transparent text-[#FAFAFA] hover:bg-[#1A1A1A] hover:text-[#FAFAFA] focus-visible:ring-[#2A2A2A]",
        secondary:
          "border border-[#2A2A2A] bg-transparent text-[#FAFAFA] hover:bg-[#1A1A1A] hover:text-[#FAFAFA] focus-visible:ring-[#2A2A2A]",
        ghost:
          "bg-transparent text-[#FAFAFA] hover:bg-[#1A1A1A] focus-visible:ring-[#2A2A2A]",
        link: "border border-[#2A2A2A] bg-transparent text-[#6B7280] hover:text-[#FAFAFA] hover:border-[#FAFAFA] focus-visible:ring-[#2A2A2A]",
      },
      size: {
        default: "px-6 py-[10px] text-[13px] font-medium",
        sm: "px-4 py-2 text-[12px] font-normal",
        lg: "px-8 py-[14px] text-[14px] font-medium",
        icon: "w-10 h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, cn };
