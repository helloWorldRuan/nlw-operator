import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const diffLineVariants = cva("flex w-full gap-2 font-mono text-[12px]", {
  variants: {
    type: {
      removed: "bg-[#3D1515]",
      added: "bg-[#153D20]",
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
  prefix: string;
  code: string;
}

function DiffLine({ className, type, prefix, code, ...props }: DiffLineProps) {
  const prefixColorClass =
    type === "removed"
      ? "text-accent-red"
      : type === "added"
        ? "text-accent-green"
        : "text-tertiary";

  const codeColorClass =
    type === "removed"
      ? "text-accent-red"
      : type === "added"
        ? "text-accent-green"
        : "text-secondary";

  return (
    <div className={cn(diffLineVariants({ type, className }))} {...props}>
      <span
        className={cn(
          "flex w-[20px] items-center justify-center font-bold",
          prefixColorClass,
        )}
      >
        {prefix}
      </span>
      <code className={cn("flex-1 overflow-x-auto", codeColorClass)}>
        {code}
      </code>
    </div>
  );
}

export interface DiffBlockProps {
  filename?: string;
  lines: DiffLineProps[];
  className?: string;
}

function DiffBlock({
  filename = "your_code.ts",
  lines,
  className,
}: DiffBlockProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded border border-border bg-input",
        className,
      )}
    >
      <div className="flex h-10 items-center border-b border-border px-4">
        <span className="font-mono text-[12px] font-medium text-secondary">
          {filename}
        </span>
      </div>
      <div className="flex flex-col gap-0 p-1">
        {lines.map((line, index) => (
          <DiffLine key={index} {...line} />
        ))}
      </div>
    </div>
  );
}

export { DiffBlock, DiffLine, diffLineVariants };
