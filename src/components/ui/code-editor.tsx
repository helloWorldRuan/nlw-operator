"use client";

import { cpp } from "@codemirror/lang-cpp";
import { css } from "@codemirror/lang-css";
import { go } from "@codemirror/lang-go";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { php } from "@codemirror/lang-php";
import { python } from "@codemirror/lang-python";
import { rust } from "@codemirror/lang-rust";
import { sass } from "@codemirror/lang-sass";
import { sql } from "@codemirror/lang-sql";
import { xml } from "@codemirror/lang-xml";
import { yaml } from "@codemirror/lang-yaml";
import CodeMirror from "@uiw/react-codemirror";
import { Check, ChevronDown, Copy } from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  SUPPORTED_LANGUAGES,
  useLanguageDetection,
} from "@/hooks/use-language-detection";
import { cn } from "@/lib/cn";
import { createDevroastTheme, devroastTheme } from "@/lib/codemirror-theme";

const languageExtensions: Record<string, () => ReturnType<typeof javascript>> =
  {
    javascript: () => javascript({ jsx: true }),
    typescript: () => javascript({ typescript: true, jsx: true }),
    jsx: () => javascript({ jsx: true }),
    tsx: () => javascript({ typescript: true, jsx: true }),
    python: () => python(),
    java: () => java(),
    cpp: () => cpp(),
    rust: () => rust(),
    html: () => html(),
    css: () => css(),
    sql: () => sql(),
    json: () => json(),
    markdown: () => markdown(),
    xml: () => xml(),
    yaml: () => yaml(),
    php: () => php(),
    sass: () => sass(),
    go: () => go(),
  };

function getLanguageExtension(lang: string | null) {
  if (!lang) return [];
  const getExt = languageExtensions[lang.toLowerCase()];
  return getExt ? [getExt()] : [];
}

export interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  showLanguageSelector?: boolean;
  showCopyButton?: boolean;
  filename?: string;
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API failed
    }
  }, [code]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded transition-colors",
        "text-tertiary hover:text-primary",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-border",
      )}
      title="Copy code"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

function LanguageSelector({
  detectedLanguage,
  isLoading,
  onSelect,
}: {
  detectedLanguage: string | null;
  isLoading: boolean;
  onSelect: (lang: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const displayLabel = isLoading
    ? "Detecting..."
    : detectedLanguage
      ? detectedLanguage.toUpperCase()
      : "Select Language";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-6 items-center gap-1 rounded px-2 text-[11px] font-mono uppercase tracking-wide",
          "bg-surface text-tertiary transition-colors",
          "hover:bg-elevated hover:text-secondary",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-border",
        )}
      >
        <span>{displayLabel}</span>
        <ChevronDown
          size={12}
          className={cn("transition-transform", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
            aria-label="Close dropdown"
          />
          <div
            className={cn(
              "absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-border bg-surface shadow-xl",
              "max-h-64 overflow-y-auto",
              "[&::-webkit-scrollbar]:w-2",
              "[&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:bg-tertiary/40 [&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb:hover]:bg-tertiary/60",
            )}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                type="button"
                key={lang.value}
                onClick={() => {
                  onSelect(lang.value === "auto" ? "" : lang.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full px-3 py-1.5 text-left text-[12px] font-mono transition-colors",
                  "hover:bg-elevated",
                  detectedLanguage === lang.value && "text-accent-green",
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CodeEditorInner({
  value,
  onChange,
  placeholder,
  className,
  showLanguageSelector = true,
  showCopyButton = true,
  filename,
}: CodeEditorProps) {
  const [internalValue, setInternalValue] = useState(value || "");

  const { detectedLanguage, isLoading, setManualLanguage } =
    useLanguageDetection(value || internalValue);

  const handleChange = useCallback(
    (val: string) => {
      setInternalValue(val);
      onChange?.(val);
    },
    [onChange],
  );

  const extensions = useMemo(() => {
    const langExt = getLanguageExtension(detectedLanguage);
    return [createDevroastTheme(), ...langExt];
  }, [detectedLanguage]);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden border border-border bg-input",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-3 border-b border-border px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-accent-red" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent-green" />

        <div className="flex-1" />

        {filename && (
          <span className="font-mono text-[12px] text-tertiary">
            {filename}
          </span>
        )}

        {showLanguageSelector && (
          <LanguageSelector
            detectedLanguage={detectedLanguage}
            isLoading={isLoading}
            onSelect={setManualLanguage}
          />
        )}

        {showCopyButton && <CopyButton code={value || internalValue} />}
      </div>

      <div className="relative flex-1 overflow-auto">
        <CodeMirror
          value={value ?? internalValue}
          height="100%"
          theme={devroastTheme}
          extensions={extensions}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "h-full overflow-auto",
            "[&_.cm-editor]:h-full",
            "[&_.cm-scroller]:!font-mono",
            "[&_.cm-content]:!text-[13px]",
            "[&_.cm-line]:!leading-6",
          )}
        />
      </div>
    </div>
  );
}

export interface CodeEditorWrapperProps extends CodeEditorProps {
  loading?: boolean;
}

function CodeEditorSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden border border-border bg-input">
      <div className="flex h-10 items-center gap-3 border-b border-border px-4">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-tertiary/50" />
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-tertiary/50" />
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-tertiary/50" />
      </div>
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="h-4 w-24 animate-pulse rounded bg-surface" />
      </div>
    </div>
  );
}

export function CodeEditor(props: CodeEditorWrapperProps) {
  const { loading, ...rest } = props;

  if (loading) {
    return <CodeEditorSkeleton />;
  }

  return <CodeEditorInner {...rest} />;
}
