"use client";

import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { CodeCard } from "@/components/ui/code-card";
import { CodeEditor } from "@/components/ui/code-editor";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/cn";

const MOCK_LEADERBOARD_TOP3 = [
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
    score: 6.8,
    language: "typescript",
    lines: [
      "if (x == true) { return true; }",
      "else if (x == false) { return false; }",
      "else { return !false; }",
    ],
  },
  {
    rank: 3,
    score: 2.1,
    language: "sql",
    lines: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
  },
];

const MAX_CODE_LENGTH = 2000;

export default function Home() {
  const [code, setCode] = useState("");
  const [roastMode, setRoastMode] = useState(true);

  const charCount = code.length;
  const isOverLimit = charCount > MAX_CODE_LENGTH;
  const canSubmit = code.trim().length > 0 && !isOverLimit;

  const handleSubmit = () => {
    if (!canSubmit) return;
    console.log("Submitting code:", code, "Roast mode:", roastMode);
  };

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Navbar />

      <main className="flex flex-1 flex-col items-center px-10 pt-20">
        <div className="flex w-full max-w-[780px] flex-col gap-12">
          {/* Hero Title - Centered */}
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="flex items-center gap-3 font-mono text-[36px] font-bold text-primary">
              <span className="text-accent-green">$</span>
              <span>paste your code. get roasted.</span>
            </h1>
            <p className="font-sans text-sm text-secondary">
              {`// drop your code below and we'll rate it — brutally honest or full roast mode`}
            </p>
          </div>

          {/* Code Editor */}
          <CodeEditor
            value={code}
            onChange={setCode}
            placeholder="// paste your code here"
            className="h-[400px]"
          />

          {/* Char Counter */}
          <div className="-mt-4 flex justify-end">
            <span
              className={cn(
                "font-mono text-[12px]",
                isOverLimit ? "text-accent-red" : "text-tertiary",
              )}
            >
              {charCount}/{MAX_CODE_LENGTH}
            </span>
          </div>

          {/* Actions Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Toggle pressed={roastMode} onPressedChange={setRoastMode} />
              <span className="font-mono text-[13px] text-accent-green">
                roast mode
              </span>
              <span className="font-sans text-xs text-tertiary">
                {"// maximum sarcasm enabled"}
              </span>
            </div>

            <Button onClick={handleSubmit} disabled={!canSubmit}>
              $ roast_my_code
            </Button>
          </div>

          {/* Footer Stats */}
          <p className="text-center font-sans text-xs text-tertiary">
            2,847 codes roasted · avg score: 4.2/10
          </p>
        </div>

        {/* Spacer */}
        <div className="h-[60px]" />

        {/* Leaderboard Preview */}
        <div className="flex w-full max-w-[960px] flex-col gap-6">
          {/* Title Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold text-accent-green">
                {"//"}
              </span>
              <h2 className="font-mono text-lg font-bold text-primary">
                shame_leaderboard
              </h2>
            </div>
            <Link
              href="/leaderboard"
              className="border border-border bg-transparent px-4 py-2 font-mono text-[12px] text-secondary hover:border-primary hover:text-primary transition-colors"
            >
              $ view_all &gt;&gt;
            </Link>
          </div>

          {/* Subtitle */}
          <p className="font-sans text-[13px] text-tertiary">
            {"// the worst code on the internet, ranked by shame"}
          </p>

          {/* Leaderboard Entries - Top 3 */}
          <div className="flex flex-col gap-5">
            {MOCK_LEADERBOARD_TOP3.map((entry) => (
              <CodeCard
                key={entry.rank}
                variant="leaderboard"
                rank={entry.rank}
                score={entry.score}
                language={entry.language}
                lines={entry.lines}
              />
            ))}
          </div>

          {/* Fade Hint */}
          <p className="py-4 text-center font-sans text-xs text-tertiary">
            showing top 3 of 2,847 ·{" "}
            <Link
              href="/leaderboard"
              className="text-secondary hover:text-primary transition-colors"
            >
              view full leaderboard &gt;&gt;
            </Link>
          </p>
        </div>

        {/* Bottom Padding */}
        <div className="h-[60px]" />
      </main>
    </div>
  );
}
