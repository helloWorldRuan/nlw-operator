import { CodeBlock } from "@/components/ui/code-block";

export async function CodeBlockDemo() {
  return (
    <div className="max-w-2xl">
      <CodeBlock
        code={`function calculateTotal(items) {
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}`}
        language="javascript"
        filename="calculate.js"
      />
    </div>
  );
}
