"use client";

import { Navbar } from "@/components/layout/navbar";
import { LeaderboardEntry } from "@/components/ui/leaderboard-entry";
import { useMemo } from "react";

const MOCK_LEADERBOARD = [
  {
    rank: 1,
    score: 1.2,
    language: "javascript",
    lines: [
      'eval(prompt("enter code"))',
      "document.write(response)",
      "// trust the user lol",
    ],
  },
  {
    rank: 2,
    score: 1.8,
    language: "typescript",
    lines: [
      "if (x == true) { return true; }",
      "else if (x == false) { return false; }",
      "else { return !false; }",
    ],
  },
  {
    rank: 3,
    score: 8.1,
    language: "sql",
    lines: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
  },
  {
    rank: 4,
    score: 2.3,
    language: "java",
    lines: ["catch (e) {", "  // ignore", "}"],
  },
  {
    rank: 5,
    score: 2.5,
    language: "javascript",
    lines: [
      "const sleep = (ms) =>",
      "  new Date(Date.now() + ms)",
      "  while(new Date() < end) {}",
    ],
  },
];

export default function LeaderboardPage() {
  const avgScore = useMemo(() => {
    if (MOCK_LEADERBOARD.length === 0) return 0;

    const total = MOCK_LEADERBOARD.reduce((sum, entry) => sum + entry.score, 0);
    return total / MOCK_LEADERBOARD.length;
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Navbar />

      <main className="flex flex-1 flex-col px-[80px] pt-10">
        <div className="flex w-full flex-col gap-12">
          {/* Hero Section */}
          <div className="flex flex-col gap-4">
            <h1 className="flex items-center gap-3 font-mono text-[28px] font-bold text-primary">
              <span className="text-accent-green">{">"}</span>
              <span>shame_leaderboard</span>
            </h1>
            <p className="font-mono text-[14px] text-secondary">
              {"// the most roasted code on the internet"}
            </p>
            <div className="flex items-center gap-2 font-mono text-[12px] text-tertiary">
              <span>2,847 submissions</span>
              <span>·</span>
              <span>avg score: {avgScore.toFixed(1)}/10</span>
            </div>
          </div>

          {/* Leaderboard Entries */}
          <div className="flex w-full flex-col gap-5">
            {MOCK_LEADERBOARD.map((entry) => (
              <LeaderboardEntry
                key={entry.rank}
                rank={entry.rank}
                score={entry.score}
                language={entry.language}
                lines={entry.lines}
              />
            ))}
          </div>
        </div>

        {/* Bottom Padding */}
        <div className="h-[60px]" />
      </main>
    </div>
  );
}
