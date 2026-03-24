"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/ui/code-editor";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/cn";

const MAX_CODE_LENGTH = 2000;

export function HomeEditor() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [roastMode, setRoastMode] = useState(true);

  const charCount = code.length;
  const isOverLimit = charCount > MAX_CODE_LENGTH;
  const canSubmit = code.trim().length > 0 && !isOverLimit;

  const handleSubmit = () => {
    if (!canSubmit) return;
    const id = crypto.randomUUID();
    router.push(`/roast/${id}`);
  };

  return (
    <>
      <CodeEditor
        value={code}
        onChange={setCode}
        placeholder="// paste your code here"
        className="h-[400px]"
      />

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
    </>
  );
}
