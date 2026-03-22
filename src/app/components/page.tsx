"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeCard } from "@/components/ui/code-card";
import { DiffLine } from "@/components/ui/diff-line";
import { ScoreRing } from "@/components/ui/score-ring";
import { TableRow } from "@/components/ui/table-row";
import { Toggle } from "@/components/ui/toggle";
import { CodeEditorDemo } from "./code-editor-demo";

export default function Home() {
  return (
    <main className="min-h-screen bg-page p-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-2">
          <h1 className="text-2xl font-mono font-medium">
            Components Showcase
          </h1>
          <p className="text-sm font-sans text-secondary">
            All UI components and their variants
          </p>
        </header>

        {/* Button */}
        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border pb-2">
            Button
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button>$ roast_my_code</Button>
            <Button variant="secondary">$ share_roast</Button>
            <Button variant="ghost">$ view_all &gt;&gt;</Button>
            <Button variant="destructive">$ delete</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Toggle */}
        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border pb-2">
            Toggle
          </h2>
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <Toggle defaultPressed />
              <span className="font-mono text-[12px] text-accent-green">
                roast mode
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Toggle />
              <span className="font-mono text-[12px] text-secondary">
                roast mode
              </span>
            </div>
          </div>
        </section>

        {/* Badge */}
        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border pb-2">
            Badge
          </h2>
          <div className="flex flex-wrap gap-4">
            <Badge dot dotColor="critical">
              critical
            </Badge>
            <Badge dot dotColor="warning">
              warning
            </Badge>
            <Badge dot dotColor="good">
              good
            </Badge>
            <Badge variant="verdict">needs_serious_help</Badge>
          </div>
        </section>

        {/* Card */}
        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border pb-2">
            Card
          </h2>
          <Card className="max-w-xl">
            <CardHeader>
              <Badge dot dotColor="critical">
                critical
              </Badge>
              <CardTitle>using var instead of const/let</CardTitle>
            </CardHeader>
            <CardDescription>
              The var keyword is function-scoped rather than block-scoped, which
              can lead to unexpected behavior and bugs. Modern JavaScript uses
              const for immutable bindings and let for mutable ones.
            </CardDescription>
          </Card>
        </section>

        {/* Score Ring */}
        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border pb-2">
            Score Ring
          </h2>
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <ScoreRing score={3.5} />
              <span className="font-mono text-[12px] text-secondary">
                score 3.5
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ScoreRing score={6.2} />
              <span className="font-mono text-[12px] text-secondary">
                score 6.2
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ScoreRing score={8.7} />
              <span className="font-mono text-[12px] text-secondary">
                score 8.7
              </span>
            </div>
          </div>
        </section>

        {/* Diff Line */}
        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border pb-2">
            Diff Line
          </h2>
          <div className="max-w-xl space-y-1">
            <DiffLine type="removed" code="var total = 0;" />
            <DiffLine type="added" code="const total = 0;" />
            <DiffLine
              type="context"
              code="for (let i = 0; i &lt; items.length; i++) {"
            />
          </div>
        </section>

        {/* Table Row */}
        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border pb-2">
            Table Row (Leaderboard)
          </h2>
          <div className="max-w-2xl">
            <TableRow
              rank={1}
              score={2.1}
              codePreview="function calculateTotal(items) { var total = 0; ..."
              language="javascript"
            />
            <TableRow
              rank={2}
              score={3.4}
              codePreview="if (user.loggedIn == true) { ..."
              language="python"
            />
            <TableRow
              rank={3}
              score={4.2}
              codePreview="SELECT * FROM users WHERE id = 1;"
              language="sql"
            />
          </div>
        </section>

        {/* CodeCard */}
        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border pb-2">
            CodeCard
          </h2>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-secondary">
                variant: &quot;editor&quot;
              </span>
              <CodeCard
                variant="editor"
                language="javascript"
                filename="app.js"
                lines={["function hello() {", "  console.log('Hello!');", "}"]}
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-secondary">
                variant: &quot;leaderboard&quot;
              </span>
              <CodeCard
                variant="leaderboard"
                rank={1}
                score={1.2}
                language="javascript"
                lines={[
                  'eval(prompt("enter code"))',
                  "document.write(response)",
                  "// trust the user lol",
                ]}
              />
            </div>
          </div>
        </section>

        {/* Code Editor */}
        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border pb-2">
            Code Editor
          </h2>
          <CodeEditorDemo />
        </section>
      </div>
    </main>
  );
}
