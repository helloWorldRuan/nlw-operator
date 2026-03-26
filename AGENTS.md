# devroast - Project Standards

## Quick Commands
```bash
npm run dev       # Start dev server
npm run build     # Build production
npm run lint      # Run linter
npm run format    # Format code
npm run db:start  # Start DB + push schema + seed
```

## Rules
1. **Use Tailwind tokens** - `bg-page`, `text-primary`, `border-border`
2. **Use `cn()`** from `@/lib/cn` - never duplicate
3. **Update showcase** - Add new components to `/src/app/components/page.tsx`

## Structure
```
src/
├── app/           # Pages: page.tsx, components/, leaderboard/, roast/[id]/
├── components/ui/ # Reusable components
└── lib/
    ├── cn.ts      # cn() utility (single source)
    └── score.ts   # Score color utilities (getScoreColor, getScoreColorHex, getVerdictBadgeColor)
```

## Design Tokens (from .pen)
```css
--color-page: #0C0C0C
--color-surface: #171717
--color-input: #111111
--color-elevated: #1A1A1A
--color-primary: #E5E5E5
--color-secondary: #A3A3A3
--color-tertiary: #737373
--color-border: #2E2E2E
--color-accent-green: #10B981
--color-accent-red: #EF4444
--color-accent-amber: #F59E0B
```

## Component Pattern
```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const variants = cva("base classes", {
  variants: { variant: { default: "", secondary: "" } },
  defaultVariants: { variant: "default" },
});

export interface Props extends VariantProps<typeof variants> {}

const Component = ({ className, variant }) => (
  <div className={cn(variants({ variant, className }))} />
);
Component.displayName = "Component";

export { Component, variants };
```

## VS Code Settings (.vscode/settings.json)
```json
{
  "editor.codeActionsOnSave": {
    "source.organizeImports.biome": "explicit"
  },
  "editor.defaultFormatter": "biomejs.biome"
}
```

## Tech Stack
- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Biome (lint + format)
- TypeScript