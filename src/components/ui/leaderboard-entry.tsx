import { cn } from "@/lib/cn";
import { useMemo } from "react";

export interface LeaderboardEntryProps {
  rank: number;
  score: number;
  language: string;
  lines: string[];
  className?: string;
}

function LeaderboardEntry({
  rank,
  score,
  language,
  lines,
  className,
}: LeaderboardEntryProps) {
  const scoreColor = useMemo(() => {
    if (score >= 8) return "text-accent-green";
    if (score >= 5) return "text-accent-amber";
    return "text-accent-red";
  }, [score]);

  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded border border-border bg-input",
        className,
      )}
    >
      {/* Meta Row - 48px height */}
      <div className="flex h-[48px] items-center justify-between px-5">
        <div className="flex items-center gap-4">
          {/* Rank */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[12px] text-tertiary">#</span>
            <span className="font-mono text-[14px] font-bold text-accent-amber">
              {rank}
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[12px] text-tertiary">score</span>
            <span className={cn("font-mono text-[14px] font-bold", scoreColor)}>
              {score.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language */}
          <span className="font-mono text-[12px] text-secondary">
            {language}
          </span>
          {/* Lines */}
          <span className="font-mono text-[12px] text-tertiary">
            {lines.length} lines
          </span>
        </div>
      </div>

      {/* Code Block - 120px height */}
      <div className="flex h-[120px] overflow-hidden">
        {/* Line Numbers */}
        <div className="flex w-10 flex-col gap-1.5 border-r border-border bg-surface px-[10px] py-3.5">
          {lines.map((_, index) => (
            <span
              key={index}
              className="font-mono text-[12px] text-right text-tertiary"
            >
              {index + 1}
            </span>
          ))}
        </div>

        {/* Code Content */}
        <pre className="flex-1 overflow-hidden px-4 py-3.5">
          <code className="font-mono text-[12px]">
            {lines.map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export { LeaderboardEntry };
