import { Navbar } from "@/components/layout/navbar";
import { createTRPCContext } from "@/trpc/init";
import { createCaller } from "@/trpc/server";
import { HomeClient } from "./_components/home-client";

export default async function Home() {
  const caller = createCaller(await createTRPCContext());
  const stats = await caller.getStats();

  return (
    <div className="flex min-h-screen flex-col bg-page">
      <Navbar />
      <HomeClient totalRoasts={stats.totalRoasts} avgScore={stats.avgScore} />
    </div>
  );
}
