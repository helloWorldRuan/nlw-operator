import { codeToHtml } from "shiki";
import { cn } from "@/lib/cn";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

async function CodeBlock({
  code,
  language = "javascript",
  filename,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: "vesper",
  });

  const lines = code.split("\n");
  const lineCount = lines.length;

  return (
    <div
      className={cn("overflow-hidden border border-border bg-input", className)}
    >
      {/* Header */}
      <div className="flex h-10 items-center gap-3 border-b border-border px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-red" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />
        <span className="flex-1" />
        {filename && (
          <span className="font-mono text-[12px] text-tertiary">
            {filename}
          </span>
        )}
      </div>

      {/* Code Content */}
      <div className="flex">
        {showLineNumbers && (
          <div
            className={cn(
              "flex flex-col gap-1.5 border-r border-border",
              "bg-surface py-3 pe-3 ps-3",
              "font-mono text-[13px] leading-[1.5]",
              "text-tertiary",
            )}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <span key={`line-${i}`}>{i + 1}</span>
            ))}
          </div>
        )}
        <div
          className="shiki vesper flex-1 overflow-x-auto p-3"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export { CodeBlock };
