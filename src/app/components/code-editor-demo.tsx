"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/ui/code-editor";

const JAVASCRIPT_SAMPLE = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(result); // 89`;

const PYTHON_SAMPLE = `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

numbers = [3, 6, 8, 10, 1, 2, 1]
print(quicksort(numbers))`;

export function CodeEditorDemo() {
  const [code, setCode] = useState(JAVASCRIPT_SAMPLE);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h3 className="text-lg font-mono font-medium">JavaScript</h3>
        <CodeEditor
          value={JAVASCRIPT_SAMPLE}
          filename="fibonacci.js"
          className="min-h-[300px]"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-mono font-medium">Python</h3>
        <CodeEditor
          value={PYTHON_SAMPLE}
          filename="quicksort.py"
          className="min-h-[300px]"
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-mono font-medium">Interactive Editor</h3>
        <p className="text-sm text-secondary">
          Digite seu código abaixo. A linguagem será detectada automaticamente.
        </p>
        <CodeEditor
          value={code}
          onChange={setCode}
          placeholder="// Digite ou cole seu código aqui..."
          className="min-h-[300px]"
          showCopyButton
          showLanguageSelector
        />
        <p className="text-xs text-tertiary">
          Código atual: {code.length} caracteres
        </p>
      </div>
    </div>
  );
}
