import { useMemo } from "react";
import { cn } from "@/lib/cn";

export type CodeCardVariant = "editor" | "leaderboard";

export interface CodeCardProps {
  variant: CodeCardVariant;
  code?: string;
  lines?: string[];
  language?: string;
  filename?: string;
  rank?: number;
  score?: number;
  className?: string;
}

function getScoreColor(score: number) {
  if (score >= 8) return "text-accent-green";
  if (score >= 5) return "text-accent-amber";
  return "text-accent-red";
}

export function CodeCard({
  variant,
  code,
  lines,
  language,
  filename,
  rank,
  score,
  className,
}: CodeCardProps) {
  const scoreColor = useMemo(() => {
    if (score === undefined) return "";
    return getScoreColor(score);
  }, [score]);

  const displayLines = useMemo(() => {
    if (lines) return lines;
    if (code) return code.split("\n");
    return [];
  }, [code, lines]);

  return (
    <div
      className={cn(
        "flex w-full flex-col overflow-hidden rounded border border-border bg-input",
        className,
      )}
    >
      {/* Header */}
      <div className="flex h-10 shrink-0 items-center justify-between border-b border-border px-4">
        {variant === "editor" ? (
          <>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-accent-red" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />
            </div>
            <div className="flex flex-1 items-center justify-end gap-3">
              {filename && (
                <span className="font-mono text-[12px] text-tertiary">
                  {filename}
                </span>
              )}
              {language && (
                <span className="font-mono text-[12px] text-secondary">
                  {language.toUpperCase()}
                </span>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4">
              {rank !== undefined && (
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[12px] text-tertiary">#</span>
                  <span className="font-mono text-[14px] font-bold text-accent-amber">
                    {rank}
                  </span>
                </div>
              )}
              {score !== undefined && (
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[12px] text-tertiary">
                    score
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[14px] font-bold",
                      scoreColor,
                    )}
                  >
                    {score.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {language && (
                <span className="font-mono text-[12px] text-secondary">
                  {language}
                </span>
              )}
              <span className="font-mono text-[12px] text-tertiary">
                {displayLines.length} lines
              </span>
            </div>
          </>
        )}
      </div>

      {/* Code Block */}
      <div className="flex flex-1 overflow-hidden">
        {/* Line Numbers */}
        <div className="flex w-12 shrink-0 flex-col gap-2 border-r border-border bg-surface px-3 py-4">
          {displayLines.map((_, index) => (
            <span
              key={index}
              className="font-mono text-[12px] text-right leading-[1.5] text-tertiary"
            >
              {index + 1}
            </span>
          ))}
        </div>

        {/* Code Content */}
        <pre className="flex-1 overflow-auto px-4 py-4">
          <code className="font-mono text-[12px] leading-[1.5]">
            {displayLines.map((line, index) => (
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
