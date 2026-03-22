import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const issueCardVariants = cva(
  "flex flex-col gap-3 rounded border border-border p-5",
  {
    variants: {
      severity: {
        critical: "bg-transparent",
        warning: "bg-transparent",
        good: "bg-transparent",
      },
    },
  },
);

export interface IssueCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof issueCardVariants> {
  title: string;
  description: string;
}

function IssueCard({
  className,
  severity,
  title,
  description,
  ...props
}: IssueCardProps) {
  const dotColorClass =
    severity === "critical"
      ? "bg-accent-red"
      : severity === "warning"
        ? "bg-accent-amber"
        : "bg-accent-green";

  const labelColorClass =
    severity === "critical"
      ? "text-accent-red"
      : severity === "warning"
        ? "text-accent-amber"
        : "text-accent-green";

  return (
    <div className={cn(issueCardVariants({ severity, className }))} {...props}>
      <div className="flex items-center gap-2">
        <span
          className={cn("inline-block h-2 w-2 rounded-full", dotColorClass)}
        />
        <span
          className={cn("font-mono text-[12px] font-medium", labelColorClass)}
        >
          {severity}
        </span>
      </div>
      <span className="font-mono text-[13px] font-medium text-primary">
        {title}
      </span>
      <span className="font-mono text-[12px] leading-relaxed text-secondary">
        {description}
      </span>
    </div>
  );
}

export { IssueCard, issueCardVariants };
