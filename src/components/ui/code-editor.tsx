import { cn } from "@/lib/cn";

export interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

function CodeEditor({
  value = "",
  onChange,
  placeholder = "// paste your code here...",
  className,
}: CodeEditorProps) {
  const lines = value ? value.split("\n") : [""];
  const lineCount = Math.max(lines.length, 1);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden border border-border bg-input",
        className,
      )}
    >
      {/* Window Header */}
      <div className="flex h-10 items-center gap-3 border-b border-border px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-red" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />
      </div>

      {/* Code Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Line Numbers */}
        <div
          className={cn(
            "flex flex-col border-r border-border bg-surface py-3 pe-3 ps-3",
            "font-mono text-[13px] leading-6 text-tertiary",
          )}
        >
          {Array.from({ length: lineCount }, (_, i) => (
            <span key={i} className="text-right">
              {i + 1}
            </span>
          ))}
        </div>

        {/* Code Input */}
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex-1 resize-none bg-transparent p-4 font-mono text-[13px] leading-6",
            "text-primary placeholder:text-tertiary",
            "focus:outline-none",
          )}
          spellCheck={false}
        />
      </div>
    </div>
  );
}

export { CodeEditor };
