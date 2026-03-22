import { Navbar } from "@/components/layout/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeCard } from "@/components/ui/code-card";
import { DiffBlock } from "@/components/ui/diff-block";
import { IssueCard } from "@/components/ui/issue-card";
import { ScoreRing } from "@/components/ui/score-ring";
import Link from "next/link";
import { use } from "react";

const MOCK_DATA = {
  score: 9.5,
  verdict: "needs_serious_help",
  roastMessage:
    '"this code looks like it was written during a power outage... in 2005."',
  language: "javascript",
  lines: 16,
  code: `function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  if (total > 100) {
    console.log("discount applied");
    total = total * 0.9;
  }
  // TODO: handle tax calculation
  // TODO: handle currency conversion
  return total;
}`,
  issues: [
    {
      severity: "critical" as const,
      title: "using var instead of const/let",
      description:
        "var is function-scoped and leads to hoisting bugs. use const by default, let when reassignment is needed.",
    },
    {
      severity: "warning" as const,
      title: "imperative loop pattern",
      description:
        "for loops are verbose and error-prone. use .reduce() or .map() for cleaner, functional transformations.",
    },
    {
      severity: "good" as const,
      title: "clear naming conventions",
      description:
        "calculateTotal and items are descriptive, self-documenting names that communicate intent without comments.",
    },
    {
      severity: "good" as const,
      title: "single responsibility",
      description:
        "the function does one thing well — calculates a total. no side effects, no mixed concerns, no hidden complexity.",
    },
  ],
  diffLines: [
    {
      type: "context" as const,
      prefix: " ",
      code: "function calculateTotal(items) {",
    },
    { type: "removed" as const, prefix: "-", code: "  var total = 0;" },
    {
      type: "removed" as const,
      prefix: "-",
      code: "  for (var i = 0; i < items.length; i++) {",
    },
    {
      type: "removed" as const,
      prefix: "-",
      code: "    total = total + items[i].price;",
    },
    { type: "removed" as const, prefix: "-", code: "  }" },
    { type: "removed" as const, prefix: "-", code: "  return total;" },
    {
      type: "added" as const,
      prefix: "+",
      code: "  return items.reduce((sum, item) => sum + item.price, 0);",
    },
    { type: "context" as const, prefix: " ", code: "}" },
  ],
};

interface RoastPageProps {
  params: Promise<{ id: string }>;
}

export default function RoastPage({ params }: RoastPageProps) {
  const { id } = use(params);
  const codeLines = MOCK_DATA.code.split("\n");

  const getVerdictBadgeColor = (verdict: string) => {
    if (
      verdict.includes("critical") ||
      verdict.includes("needs") ||
      verdict.includes("terrible")
    ) {
      return "critical";
    }
    if (verdict.includes("warning") || verdict.includes("could")) {
      return "warning";
    }
    return "good";
  };

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Navbar />

      <main className="flex flex-1 flex-col items-center px-[80px] py-10">
        <div className="flex w-full max-w-[1280px] flex-col gap-10">
          {/* Hero Section - Score and Summary */}
          <div className="flex items-center gap-12">
            <ScoreRing score={MOCK_DATA.score} size={180} strokeWidth={4} />

            <div className="flex flex-1 flex-col gap-4">
              <Badge
                dot
                dotColor={getVerdictBadgeColor(MOCK_DATA.verdict)}
                variant="verdict"
              >
                verdict: {MOCK_DATA.verdict}
              </Badge>

              <p className="font-mono text-[20px] leading-relaxed text-primary italic">
                {MOCK_DATA.roastMessage}
              </p>

              <div className="flex items-center gap-4 font-mono text-[12px] text-tertiary">
                <span>lang: {MOCK_DATA.language}</span>
                <span>·</span>
                <span>{MOCK_DATA.lines} lines</span>
              </div>

              <div className="pt-2">
                <Link href={`/roast/${id}/share`}>
                  <Button variant="ghost" size="sm">
                    $ share_roast
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-border" />

          {/* Submitted Code Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[14px] font-bold text-accent-green">
                {"//"}
              </span>
              <span className="font-mono text-[14px] font-bold text-primary">
                your_submission
              </span>
            </div>

            <CodeCard
              variant="editor"
              language={MOCK_DATA.language}
              lines={codeLines}
              className="min-h-[200px]"
            />
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-border" />

          {/* Detailed Analysis Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[14px] font-bold text-accent-green">
                {"//"}
              </span>
              <span className="font-mono text-[14px] font-bold text-primary">
                detailed_analysis
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {MOCK_DATA.issues.map((issue, index) => (
                <IssueCard
                  key={index}
                  severity={issue.severity}
                  title={issue.title}
                  description={issue.description}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-border" />

          {/* Suggested Fix Section */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[14px] font-bold text-accent-green">
                {"//"}
              </span>
              <span className="font-mono text-[14px] font-bold text-primary">
                suggested_fix
              </span>
            </div>

            <DiffBlock
              filename="your_code.ts → improved_code.ts"
              lines={MOCK_DATA.diffLines}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
