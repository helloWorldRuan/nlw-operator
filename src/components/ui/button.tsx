import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-accent-green text-page hover:bg-[#16A34A] focus-visible:ring-accent-green",
        destructive:
          "bg-accent-red text-white hover:bg-red-600 focus-visible:ring-accent-red",
        secondary:
          "border border-border bg-transparent text-primary hover:bg-elevated focus-visible:ring-border",
        ghost:
          "border border-border bg-transparent text-secondary hover:text-primary hover:border-primary focus-visible:ring-border",
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
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
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

export { Button, buttonVariants };
