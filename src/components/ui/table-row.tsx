import { cn } from "@/lib/cn";

export interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  rank: number;
  score: number;
  codePreview: string;
  language: string;
}

function TableRow({
  rank,
  score,
  codePreview,
  language,
  className,
  ...props
}: TableRowProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-6 border-b border-border py-4 pe-5 ps-5",
        "transition-colors hover:bg-surface",
        className,
      )}
      {...props}
    >
      {/* Rank */}
      <span className="w-10 text-center font-mono text-[13px] text-tertiary">
        #{rank}
      </span>

      {/* Score */}
      <span className="w-14 font-mono text-[13px] font-bold text-accent-red">
        {score.toFixed(1)}
      </span>

      {/* Code Preview */}
      <code className="flex-1 truncate font-mono text-[12px] text-secondary">
        {codePreview}
      </code>

      {/* Language */}
      <span className="w-24 text-right font-mono text-[12px] text-tertiary">
        {language}
      </span>
    </div>
  );
}

export { TableRow };
