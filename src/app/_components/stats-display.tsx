"use client";

import NumberFlow from "@number-flow/react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export function StatsDisplay() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.getStats.queryOptions());

  return (
    <p className="text-center font-sans text-xs text-tertiary">
      <NumberFlow
        value={data?.totalRoasts ?? 0}
        format={{ useGrouping: true }}
        className="tabular-nums"
      />{" "}
      codes roasted · avg score:{" "}
      <NumberFlow
        value={data?.avgScore ?? 0}
        format={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
        className="tabular-nums"
      />
      /10
    </p>
  );
}
