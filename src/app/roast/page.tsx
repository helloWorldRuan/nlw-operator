import { Navbar } from "@/components/layout/navbar";

export default function RoastPage() {
  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Navbar />
      <main className="flex flex-1 items-center justify-center">
        <p className="font-mono text-secondary">
          Roast results page — coming soon
        </p>
      </main>
    </div>
  );
}
