"use client";

import { cn } from "@/lib/cn";

export interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function ScoreRing({
  score,
  maxScore = 10,
  size = 180,
  strokeWidth = 4,
  className,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (score / maxScore) * 100;
  const offset = circumference - (percentage / 100) * circumference;

  const scoreColorVar =
    score < 4
      ? "var(--color-accent-red)"
      : score < 7
        ? "var(--color-accent-amber)"
        : "var(--color-accent-green)";

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {/* Outer ring background */}
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
        />
      </svg>

      {/* Gradient arc */}
      <svg
        className="absolute inset-0"
        width={size}
        height={size}
        style={{ transform: "rotate(-90deg)" }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-accent-green)" />
            <stop offset="35%" stopColor="var(--color-accent-amber)" />
            <stop offset="36%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-mono text-[48px] font-bold leading-none text-primary"
          style={{ color: scoreColorVar }}
        >
          {score.toFixed(1)}
        </span>
        <span className="font-mono text-[16px] text-tertiary">/{maxScore}</span>
      </div>
    </div>
  );
}

export { ScoreRing };
