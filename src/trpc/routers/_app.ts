import { baseProcedure, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  getStats: baseProcedure.query(async () => ({
    totalRoasts: 2847,
    avgScore: 4.2,
  })),
});

export type AppRouter = typeof appRouter;
