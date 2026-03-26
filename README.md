# devroast

<p align="center">
  <img src="https://img.shields.io/badge/status-toasting-brightness-green?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/avg%20score-4.2%2F10-red?style=for-the-badge" alt="Avg Score">
  <img src="https://img.shields.io/badge/codes%20roasted-2%2C847+-brightgreen?style=for-the-badge" alt="Roasted">
</p>

> **Your code walks into a bar. The bartender looks at it and says: "We don't serve code here."**
>
> *Welcome to devroast — where mediocre code meets its judgment.*

---

## What is this?

**devroast** is a brutally honest code analyzer that doesn't pull punches. Drop your code, get roasted. It's like code review from your most sarcastic colleague, minus the passive-aggressive Slack messages.

### Features

- **Paste & Roast** — Submit your code and receive an honest, unbiased assessment
- **Roast Mode** — Maximum sarcasm enabled. No feelings were hurt (probably)
- **Shame Leaderboard** — See the worst code on the internet, ranked by collective shame
- **Syntax Highlighting** — Beautiful code blocks so everyone can read your mistakes clearly

---

## Tech Stack

| Technology | Why |
|------------|-----|
| [Next.js 16](https://nextjs.org/) | App Router because we're not living in the past |
| [React 19](https://react.dev/) | The future is now |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first, because inline styles are a war crime |
| [Biome](https://biomejs.dev/) | Fast linter & formatter. We have standards. |
| [Shiki](https://shiki.style/) | The syntax highlighter that actually looks good |
| [Drizzle ORM](https://orm.drizzle.team/) | Type-safe database queries, zero regrets |
| [PostgreSQL 16](https://www.postgresql.org/) | The database that judges your data model |

---

## Database Setup

### Quick Start (recommended)

```bash
npm run db:start
```

This starts PostgreSQL, pushes the schema, and seeds sample data.

### Manual Setup

```bash
# Start PostgreSQL container
docker compose up -d

# Push schema to database
npm run db:push

# Seed sample data (optional)
npm run db:seed
```

### Database Scripts

| Command | Description |
|---------|-------------|
| `npm run db:start` | Start DB + push schema + seed (all in one) |
| `npm run db:generate` | Generate migrations from schema changes |
| `npm run db:migrate` | Apply pending migrations |
| `npm run db:push` | Push schema to database (dev) |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Drizzle Studio GUI |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/yourusername/devroast.git
cd devroast

# Install dependencies
npm install

# Fire it up
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and prepare for judgment.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                      # Main entry - paste your shame
│   ├── roast/[id]/page.tsx           # Roast results (dynamic)
│   ├── roast/[id]/share/page.tsx     # Share page for results
│   ├── roast/[id]/share/image.png.tsx # OG image generator
│   ├── leaderboard/page.tsx           # Hall of shame
│   └── components/page.tsx            # Component showcase
├── components/ui/                     # Reusable UI components
│   ├── score-ring.tsx               # Score visualization ring
│   ├── issue-card.tsx               # Analysis issue card
│   ├── diff-block.tsx               # Code diff display
│   └── ...
├── db/
│   ├── schema.ts                     # Database schema (tables, enums)
│   └── index.ts                      # Drizzle client
└── lib/
    ├── cn.ts                         # cn() utility (single source)
    └── score.ts                      # Score color utilities
drizzle/                              # Database migrations
```

---

## Code Quality

<p align="center">
  <img src="https://img.shields.io/badge/biome-clean-10B981?style=flat-square" alt="Biome">
  <img src="https://img.shields.io/badge/types-strict-3B82F6?style=flat-square" alt="TypeScript">
</p>

This project follows strict standards:

- **TypeScript strict mode** — Because `any` is not a personality trait
- **Biome linting** — Zero warnings, zero excuses
- **Tailwind tokens** — No arbitrary colors, no chaos

---

## Contributing

Found a way to make the roasts even meaner? PRs welcome.

1. Fork it
2. Create your feature branch (`git checkout -b feature/better-roasts`)
3. Commit your changes (`git commit -m 'Add even spicier roast messages'`)
4. Push to the branch (`git push origin feature/better-roasts`)
5. Open a Pull Request

---

## License

MIT — Because sharing is caring, even when it's code that shouldn't see daylight.

---

<p align="center">

**Remember: Every line of code you write is a permanent testament to your decisions. Choose wisely.**

</p>
