"use client";

import type { Extension } from "@codemirror/state";
import flourite from "flourite";
import { useCallback, useEffect, useRef, useState } from "react";

type LanguageLoader = () => Promise<{ default: Extension }>;

const flouriteToCodeMirror: Record<string, LanguageLoader> = {
  javascript: () =>
    import("@codemirror/lang-javascript").then((m) => ({
      default: m.javascript(),
    })),
  typescript: () =>
    import("@codemirror/lang-javascript").then((m) => ({
      default: m.javascript({ typescript: true }),
    })),
  jsx: () =>
    import("@codemirror/lang-javascript").then((m) => ({
      default: m.javascript({ jsx: true }),
    })),
  tsx: () =>
    import("@codemirror/lang-javascript").then((m) => ({
      default: m.javascript({ jsx: true, typescript: true }),
    })),
  python: () =>
    import("@codemirror/lang-python").then((m) => ({ default: m.python() })),
  java: () =>
    import("@codemirror/lang-java").then((m) => ({ default: m.java() })),
  cpp: () => import("@codemirror/lang-cpp").then((m) => ({ default: m.cpp() })),
  rust: () =>
    import("@codemirror/lang-rust").then((m) => ({ default: m.rust() })),
  html: () =>
    import("@codemirror/lang-html").then((m) => ({ default: m.html() })),
  css: () => import("@codemirror/lang-css").then((m) => ({ default: m.css() })),
  sql: () => import("@codemirror/lang-sql").then((m) => ({ default: m.sql() })),
  json: () =>
    import("@codemirror/lang-json").then((m) => ({ default: m.json() })),
  markdown: () =>
    import("@codemirror/lang-markdown").then((m) => ({
      default: m.markdown(),
    })),
  xml: () => import("@codemirror/lang-xml").then((m) => ({ default: m.xml() })),
  yaml: () =>
    import("@codemirror/lang-yaml").then((m) => ({ default: m.yaml() })),
  php: () => import("@codemirror/lang-php").then((m) => ({ default: m.php() })),
  sass: () =>
    import("@codemirror/lang-sass").then((m) => ({ default: m.sass() })),
  go: () => import("@codemirror/lang-go").then((m) => ({ default: m.go() })),
};

const flouriteToShiki: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  jsx: "javascript",
  tsx: "typescript",
  python: "python",
  java: "java",
  cpp: "cpp",
  rust: "rust",
  html: "html",
  css: "css",
  sql: "sql",
  json: "json",
  markdown: "markdown",
  xml: "xml",
  yaml: "yaml",
  php: "php",
  sass: "scss",
  go: "go",
};

export interface UseLanguageDetectionOptions {
  debounceMs?: number;
  minLength?: number;
  forceLanguage?: string | null;
}

export interface UseLanguageDetectionResult {
  detectedLanguage: string | null;
  shikiLanguage: string;
  languageExtension: Extension | null;
  isLoading: boolean;
  setManualLanguage: (lang: string) => void;
  resetToAuto: () => void;
}

function normalizeLanguage(lang: string): string {
  return lang.toLowerCase().trim();
}

function getCodeMirrorExtension(lang: string): LanguageLoader | null {
  const normalized = normalizeLanguage(lang);
  return flouriteToCodeMirror[normalized] || null;
}

function getShikiLanguage(lang: string | null): string {
  if (!lang) return "text";
  const normalized = normalizeLanguage(lang);
  return flouriteToShiki[normalized] || normalized;
}

export function useLanguageDetection(
  code: string,
  options: UseLanguageDetectionOptions = {},
): UseLanguageDetectionResult {
  const { debounceMs = 300, minLength = 10, forceLanguage = null } = options;

  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [manualLanguage, setManualLanguage] = useState<string | null>(null);
  const [languageExtension, setLanguageExtension] = useState<Extension | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadLanguageExtension = useCallback(async (lang: string) => {
    const extensionGetter = getCodeMirrorExtension(lang);
    if (extensionGetter) {
      const { default: ext } = await extensionGetter();
      setLanguageExtension(ext);
    } else {
      setLanguageExtension(null);
    }
  }, []);

  const detectLanguage = useCallback(
    async (codeToAnalyze: string) => {
      if (codeToAnalyze.length < minLength) {
        setDetectedLanguage(null);
        setLanguageExtension(null);
        return;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      timeoutRef.current = setTimeout(async () => {
        setIsLoading(true);

        try {
          const result = flourite(codeToAnalyze, { heuristic: true });
          const normalizedLang = normalizeLanguage(result.language);

          setDetectedLanguage(normalizedLang);

          if (!abortControllerRef.current?.signal.aborted) {
            await loadLanguageExtension(normalizedLang);
          }
        } catch {
          setLanguageExtension(null);
        } finally {
          if (!abortControllerRef.current?.signal.aborted) {
            setIsLoading(false);
          }
        }
      }, debounceMs);
    },
    [debounceMs, minLength, loadLanguageExtension],
  );

  useEffect(() => {
    if (forceLanguage) {
      setManualLanguage(forceLanguage);
      loadLanguageExtension(forceLanguage);
      return;
    }

    if (!manualLanguage) {
      detectLanguage(code);
    }
  }, [
    code,
    manualLanguage,
    detectLanguage,
    forceLanguage,
    loadLanguageExtension,
  ]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSetManualLanguage = useCallback(
    async (lang: string) => {
      setManualLanguage(lang);
      await loadLanguageExtension(lang);
    },
    [loadLanguageExtension],
  );

  const handleResetToAuto = useCallback(() => {
    setManualLanguage(null);
    detectLanguage(code);
  }, [code, detectLanguage]);

  const activeLanguage = manualLanguage || detectedLanguage;

  return {
    detectedLanguage: activeLanguage,
    shikiLanguage: getShikiLanguage(activeLanguage),
    languageExtension,
    isLoading,
    setManualLanguage: handleSetManualLanguage,
    resetToAuto: handleResetToAuto,
  };
}

export const SUPPORTED_LANGUAGES = [
  { value: "auto", label: "Auto Detect" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "rust", label: "Rust" },
  { value: "go", label: "Go" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
  { value: "json", label: "JSON" },
  { value: "markdown", label: "Markdown" },
  { value: "xml", label: "XML" },
  { value: "yaml", label: "YAML" },
  { value: "php", label: "PHP" },
  { value: "sass", label: "Sass/SCSS" },
] as const;
