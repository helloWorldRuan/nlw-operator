import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const diffLineVariants = cva("flex w-full gap-2 font-mono text-[13px]", {
  variants: {
    type: {
      removed: "bg-[#1A0A0A]",
      added: "bg-[#0A1A0F]",
      context: "",
    },
  },
  defaultVariants: {
    type: "context",
  },
});

export interface DiffLineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof diffLineVariants> {
  code: string;
}

function DiffLine({ className, type, code, ...props }: DiffLineProps) {
  const prefix = type === "removed" ? "-" : type === "added" ? "+" : " ";

  const prefixColorClass =
    type === "removed"
      ? "text-accent-red"
      : type === "added"
        ? "text-accent-green"
        : "text-tertiary";

  const codeColorClass =
    type === "removed"
      ? "text-secondary"
      : type === "added"
        ? "text-primary"
        : "text-secondary";

  return (
    <div className={cn(diffLineVariants({ type, className }))} {...props}>
      <span className={cn("w-4 text-center font-bold", prefixColorClass)}>
        {prefix}
      </span>
      <code className={cn("flex-1 overflow-x-auto", codeColorClass)}>
        {code}
      </code>
    </div>
  );
}

export { DiffLine, diffLineVariants };
