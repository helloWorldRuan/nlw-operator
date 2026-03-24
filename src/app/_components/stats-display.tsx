"use client";

import { AnimatedNumber } from "./animated-number";

interface StatsDisplayProps {
  totalRoasts: number;
  avgScore: number;
}

export function StatsDisplay({ totalRoasts, avgScore }: StatsDisplayProps) {
  return (
    <p className="text-center font-sans text-xs text-tertiary">
      <AnimatedNumber value={totalRoasts} /> codes roasted · avg score:{" "}
      <AnimatedNumber value={avgScore} />
      /10
    </p>
  );
}
