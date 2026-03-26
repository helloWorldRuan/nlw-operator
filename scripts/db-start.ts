#!/usr/bin/env tsx

import { execSync } from "child_process";
import { setTimeout } from "timers/promises";

async function waitForDb(maxRetries = 30): Promise<boolean> {
  console.log("  Waiting for database...");
  for (let i = 1; i <= maxRetries; i++) {
    try {
      execSync(
        'docker compose exec -T postgres psql -U devroast -d devroast -c "SELECT 1" -t',
        { stdio: "ignore" }
      );
      console.log("  Database ready!");
      return true;
    } catch {
      process.stdout.write(".");
      await setTimeout(1000);
    }
  }
  console.error("\n  Database failed to start");
  return false;
}

async function main() {
  console.log("\n🚀 Starting DevRoast Database\n");

  console.log("1. Starting Docker container...");
  execSync("docker compose up -d", { stdio: "inherit" });

  console.log("\n2. Waiting for database to be ready...");
  const ready = await waitForDb();
  if (!ready) process.exit(1);

  console.log("\n3. Pushing schema to database...");
  execSync("npm run db:push", { stdio: "inherit" });

  console.log("\n4. Seeding database with sample data...");
  execSync("npm run db:seed", { stdio: "inherit" });

  console.log("\n✅ Database setup complete!\n");
  console.log("Run 'npm run dev' to start the application.\n");
}

main();
