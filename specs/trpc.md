# tRPC — Specification

> Spec de implementacao da camada de API para o DevRoast usando tRPC + TanStack React Query + Next.js App Router.

## Contexto

O DevRoast precisa de uma camada de API para:
- Criar novas submissoes de codigo (`mutation`)
- Buscar roasts por ID (`query`)
- Listar leaderboard (`query`)
- Buscar stats globais (`query`)

A integracao deve seguir o Next.js App Router com React Server Components (RSC), permitindo:
- Prefetch de dados no servidor
- Hydratacao no cliente
- Cache com TanStack Query

---

## Stack da API

| Camada | Tecnologia |
|--------|------------|
| API Framework | tRPC v11 |
| Client Cache | TanStack React Query v5 |
| Validator | Zod |
| HTTP Adapter | Fetch (Next.js API Routes) |
| Framework | Next.js 16 App Router |

---

## Dependencias

```bash
npm install @trpc/server @trpc/client @trpc/tanstack-react-query @tanstack/react-query zod server-only
```

---

## Estrutura de arquivos

```
src/
├── trpc/
│   ├── init.ts              # initTRPC, context, router helpers
│   ├── query-client.ts      # QueryClient factory
│   ├── client.tsx           # Client-side tRPC provider
│   ├── server.tsx           # Server-side tRPC proxy + caller
│   └── routers/
│       └── _app.ts          # Main router (roasts, leaderboard, stats)
├── app/
│   ├── api/trpc/[trpc]/
│   │   └── route.ts         # Fetch handler (GET + POST)
│   └── layout.tsx           # Wrapped with TRPCProvider
├── db/
│   ├── index.ts             # Drizzle client (ja existente)
│   └── schema.ts            # Schema do banco (ja existente)
```

---

## Implementacao

### 1. Setup tRPC (`trpc/init.ts`)

```typescript
import { initTRPC } from '@trpc/server'
import { cache } from 'react'
import { db } from '@/db'

export const createTRPCContext = cache(async () => {
  return {
    db,
  }
})

const t = initTRPC.create()

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
```

### 2. Query Client Factory (`trpc/query-client.ts`)

```typescript
import { QueryClient } from '@tanstack/react-query'

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
    },
  })
}
```

### 3. Router (`trpc/routers/_app.ts`)

```typescript
import { z } from 'zod'
import { baseProcedure, createTRPCRouter } from '../init'
import { asc, count, avg } from 'drizzle-orm'
import { roasts, analysisItems } from '@/db/schema'

export const appRouter = createTRPCRouter({
  // Buscar roast por ID
  getRoast: baseProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const [roast] = await ctx.db
        .select()
        .from(roasts)
        .where(eq(roasts.id, input.id))

      if (!roast) throw new Error('Roast not found')

      const items = await ctx.db
        .select()
        .from(analysisItems)
        .where(eq(analysisItems.roastId, input.id))
        .orderBy(asc(analysisItems.order))

      return { ...roast, items }
    }),

  // Leaderboard (top 20)
  getLeaderboard: baseProcedure
    .input(z.object({ limit: z.number().min(1).max(100).default(20) }))
    .query(async ({ input, ctx }) => {
      return ctx.db
        .select()
        .from(roasts)
        .orderBy(asc(roasts.score))
        .limit(input.limit)
    }),

  // Stats globais
  getStats: baseProcedure.query(async ({ ctx }) => {
    const [stats] = await ctx.db
      .select({
        totalRoasts: count(),
        avgScore: avg(roasts.score),
      })
      .from(roasts)

    return {
      totalRoasts: stats?.totalRoasts ?? 0,
      avgScore: stats?.avgScore ?? 0,
    }
  }),

  // Criar roast (mutation)
  createRoast: baseProcedure
    .input(z.object({
      code: z.string().min(1).max(10000),
      language: z.string().min(1).max(50),
      lineCount: z.number().int().positive(),
      roastMode: z.boolean().default(false),
      score: z.number().min(0).max(10),
      verdict: z.enum(['needs_serious_help', 'rough_around_edges', 'decent_code', 'solid_work', 'exceptional']),
      roastQuote: z.string().optional(),
      suggestedFix: z.string().optional(),
      items: z.array(z.object({
        severity: z.enum(['critical', 'warning', 'good']),
        title: z.string().max(200),
        description: z.string(),
      })),
    }))
    .mutation(async ({ input, ctx }) => {
      const [roast] = await ctx.db
        .insert(roasts)
        .values({
          code: input.code,
          language: input.language,
          lineCount: input.lineCount,
          roastMode: input.roastMode,
          score: input.score,
          verdict: input.verdict,
          roastQuote: input.roastQuote,
          suggestedFix: input.suggestedFix,
        })
        .returning()

      await ctx.db.insert(analysisItems).values(
        input.items.map((item, index) => ({
          roastId: roast.id,
          severity: item.severity,
          title: item.title,
          description: item.description,
          order: index,
        })),
      )

      return roast
    }),
})

export type AppRouter = typeof appRouter
```

### 4. API Route Handler (`app/api/trpc/[trpc]/route.ts`)

```typescript
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { createTRPCContext } from '@/trpc/init'
import { appRouter } from '@/trpc/routers/_app'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  })

export { handler as GET, handler as POST }
```

### 5. Client Provider (`trpc/client.tsx`)

```typescript
'use client'

import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import { useState } from 'react'
import { makeQueryClient } from './query-client'
import type { AppRouter } from './routers/_app'

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

function getUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [httpBatchLink({ url: `${getUrl()}/api/trpc` })],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
```

### 6. Server Proxy (`trpc/server.tsx`)

```typescript
import 'server-only'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { createCallerFactory } from '@trpc/server'
import { cache } from 'react'
import { createTRPCContext } from './init'
import { makeQueryClient } from './query-client'
import { appRouter } from './routers/_app'

export const getQueryClient = cache(makeQueryClient)

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
})

export const createCaller = createCallerFactory(appRouter)
```

### 7. Layout Provider (`app/layout.tsx`)

```typescript
import { TRPCReactProvider } from '@/trpc/client'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  )
}
```

---

## Uso

### Server Component (Prefetch)

```typescript
// app/roast/[id]/page.tsx
import { getQueryClient, trpc } from '@/trpc/server'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function RoastPage({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(
    trpc.getRoast.queryOptions({ id: params.id })
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RoastContent />
    </HydrationBoundary>
  )
}
```

### Client Component

```typescript
// app/_components/roast-content.tsx
'use client'

import { useQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'

export function RoastContent() {
  const trpc = useTRPC()
  const { data, isLoading } = useQuery(trpc.getRoast.queryOptions({ id: '...' }))

  if (isLoading) return <div>Loading...</div>
  return <div>{data?.roastQuote}</div>
}
```

### Mutation

```typescript
'use client'

import { useMutation } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'

export function RoastForm() {
  const trpc = useTRPC()
  const createRoast = useMutation(trpc.createRoast.mutationOptions())

  const handleSubmit = async (data: RoastInput) => {
    const result = await createRoast.mutateAsync(data)
    router.push(`/roast/${result.id}`)
  }

  return <form onSubmit={handleSubmit}>...</form>
}
```

---

## Procedimentos da API

| Procedure | Type | Input | Output |
|-----------|------|-------|--------|
| `getRoast` | query | `{ id: uuid }` | Roast + analysisItems |
| `getLeaderboard` | query | `{ limit?: number }` | Roast[] |
| `getStats` | query | - | `{ totalRoasts, avgScore }` |
| `createRoast` | mutation | RoastInput | Roast |

---

## To-do de implementacao

- [ ] Instalar dependencias (`@trpc/server`, `@trpc/client`, `@trpc/tanstack-react-query`, `@tanstack/react-query`, `zod`, `server-only`)
- [ ] Criar `trpc/init.ts` com initTRPC e context
- [ ] Criar `trpc/query-client.ts` com QueryClient factory
- [ ] Criar `trpc/routers/_app.ts` com todos os procedures
- [ ] Criar `app/api/trpc/[trpc]/route.ts` com fetch handler
- [ ] Criar `trpc/client.tsx` com TRPCProvider
- [ ] Criar `trpc/server.tsx` com server proxy
- [ ] Atualizar `app/layout.tsx` para usar TRPCProvider
- [ ] Atualizar paginas para usar tRPC (home, roast/[id], leaderboard)
- [ ] Remover mock data das paginas
