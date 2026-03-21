# Drizzle ORM Implementation Spec

## 1. Overview

**Objective**: Implement Drizzle ORM with PostgreSQL for persistent storage of code roasts and leaderboard data.

**Stack**:
- Drizzle ORM (`drizzle-orm`)
- PostgreSQL (via Docker Compose)
- Next.js 16 (App Router)

---

## 2. Database Schema

### Tables

#### `roasts`
Stores code submissions and their roast results.

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` | Primary key |
| `code` | `text` | Submitted code content |
| `language` | `varchar(50)` | Detected language |
| `score` | `decimal(3,1)` | Roast score (1.0 - 10.0) |
| `roast_message` | `text` | Generated roast text |
| `is_roast_mode` | `boolean` | Full roast vs honest mode |
| `created_at` | `timestamp` | Submission timestamp |
| `ip_hash` | `varchar(64)` | Anonymized IP for grouping |

#### `leaderboard`
Cached leaderboard entries (updated periodically).

| Column | Type | Description |
|--------|------|-------------|
| `id` | `uuid` | Primary key |
| `rank` | `integer` | Position on leaderboard |
| `score` | `decimal(3,1)` | Roast score |
| `language` | `varchar(50)` | Programming language |
| `code_preview` | `text` | First 3 lines of code |
| `roast_id` | `uuid` | FK to roasts table |
| `updated_at` | `timestamp` | Last ranking update |

---

## 3. Enums

```sql
CREATE TYPE roast_mode AS ENUM ('honest', 'roast');
```

```typescript
// TypeScript enum
export enum RoastMode {
  Honest = 'honest',
  Roast = 'roast',
}
```

---

## 4. Interfaces / Types

```typescript
// From DB
interface Roast {
  id: string;
  code: string;
  language: string;
  score: number;
  roastMessage: string;
  isRoastMode: boolean;
  createdAt: Date;
  ipHash: string;
}

interface LeaderboardEntry {
  id: string;
  rank: number;
  score: number;
  language: string;
  codePreview: string;
  roastId: string;
  updatedAt: Date;
}

// Input types
interface CreateRoastInput {
  code: string;
  language: string;
  score: number;
  roastMessage: string;
  isRoastMode: boolean;
  ipHash: string;
}
```

---

## 5. Drizzle Models

```typescript
// src/db/schema.ts
import { pgTable, uuid, text, varchar, decimal, boolean, timestamp } from 'drizzle-orm/pg-core';
import { roastMode } from './enums';

export const roasts = pgTable('roasts', {
  id: uuid('id').defaultRandom().primaryKey(),
  code: text('code').notNull(),
  language: varchar('language', 50).notNull(),
  score: decimal('score', { precision: 3, scale: 1 }).notNull(),
  roastMessage: text('roast_message').notNull(),
  isRoastMode: boolean('is_roast_mode').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  ipHash: varchar('ip_hash', 64).notNull(),
});

export const leaderboard = pgTable('leaderboard', {
  id: uuid('id').defaultRandom().primaryKey(),
  rank: integer('rank').notNull(),
  score: decimal('score', { precision: 3, scale: 1 }).notNull(),
  language: varchar('language', 50).notNull(),
  codePreview: text('code_preview').notNull(),
  roastId: uuid('roast_id').references(() => roasts.id),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
```

---

## 6. Docker Compose

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    container_name: devroast-db
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://devroast:devroast@postgres:5432/devroast
    depends_on:
      - postgres
    command: sh -c "npx drizzle-kit push && npm run dev"

volumes:
  postgres_data:
```

---

## 7. Environment Variables

```env
# .env.local
DATABASE_URL=postgresql://devroast:devroast@localhost:5432/devroast
```

---

## 8. Action Plan

### Phase 1: Setup
- [ ] Install Drizzle dependencies
- [ ] Create docker-compose.yml
- [ ] Configure PostgreSQL connection

### Phase 2: Schema
- [ ] Create `src/db/schema.ts`
- [ ] Create `src/db/enums.ts`
- [ ] Create `src/db/index.ts` (connection)
- [ ] Run `drizzle-kit push` to create tables

### Phase 3: Operations
- [ ] Create `src/db/queries/roasts.ts` (CRUD)
- [ ] Create `src/db/queries/leaderboard.ts`
- [ ] Implement IP hashing utility

### Phase 4: Integration
- [ ] Update `/` page to fetch/store roasts
- [ ] Update `/leaderboard` to use DB
- [ ] Implement leaderboard ranking logic

---

## 9. Install Commands

```bash
# Drizzle core
npm install drizzle-orm
npm install -D drizzle-kit

# PostgreSQL driver
npm install pg

# Utilities
npm install uuid
npm install -D @types/uuid
```

---

## 10. File Structure

```
src/
├── db/
│   ├── index.ts          # DB connection
│   ├── schema.ts        # Table definitions
│   ├── enums.ts         # Enums
│   └── queries/
│       ├── roasts.ts    # Roast operations
│       └── leaderboard.ts
├── lib/
│   └── ip-hash.ts       # IP anonymization
└── app/
    ├── page.tsx          # Update to use DB
    └── leaderboard/page.tsx
```

---

## 11. TODO List

1. Install Drizzle and PostgreSQL dependencies
2. Create Docker Compose for PostgreSQL
3. Define schema (roasts, leaderboard tables)
4. Create DB connection helper
5. Implement CRUD for roasts
6. Implement leaderboard queries
7. Add IP hashing for anonymous users
8. Integrate with existing pages
9. Test Docker setup
10. Add seed script for mock data