import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-2 font-mono text-[12px] font-normal",
  {
    variants: {
      variant: {
        critical: "text-accent-red",
        warning: "text-accent-amber",
        good: "text-accent-green",
        verdict: "text-accent-red",
        default: "text-primary",
        secondary: "text-secondary",
        outline: "text-primary border border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  dotColor?: "critical" | "warning" | "good";
}

function Badge({
  className,
  variant,
  dot,
  dotColor = "good",
  ...props
}: BadgeProps) {
  const dotColorClass =
    dotColor === "critical"
      ? "bg-accent-red"
      : dotColor === "warning"
        ? "bg-accent-amber"
        : "bg-accent-green";

  return (
    <div className={cn(badgeVariants({ variant, className }))} {...props}>
      {dot && (
        <span
          className={cn("inline-block h-2 w-2 rounded-full", dotColorClass)}
        />
      )}
      {props.children}
    </div>
  );
}

export { Badge, badgeVariants, cn };
