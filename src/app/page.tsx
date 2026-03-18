import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-12">
        <header className="space-y-2">
          <h1 className="text-2xl font-mono font-medium">
            Components Showcase
          </h1>
          <p className="text-sm text-text-secondary">
            All UI components and their variants
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border-primary pb-2">
            Button Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border-primary pb-2">
            Button Sizes
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Icon button" />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border-primary pb-2">
            Button States
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button>Enabled</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-mono font-medium border-b border-border-primary pb-2">
            Primary CTA (From Design)
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button>$ roast_my_code</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
