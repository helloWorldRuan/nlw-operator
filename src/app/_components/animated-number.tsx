// @ts-nocheck
"use client";

import NumberFlow from "number-flow";

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const ref = (node: HTMLSpanElement | null) => {
    if (node && !node.dataset.initialized) {
      node.dataset.initialized = "true";
      new NumberFlow(node);
    }
  };

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
