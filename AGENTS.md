# AGENTS.md - Project Standards & Patterns

## Overview

This document establishes standards, patterns, and conventions for the devroast project.

---

## Project Structure

```
src/app/
├── components/
│   └── ui/           # Reusable UI components
├── globals.css       # Global styles (Tailwind only)
├── layout.tsx       # Root layout
└── page.tsx         # Home page
```

---

## UI Components

### Location
All reusable UI components go in `src/app/components/ui/`.

### Component Pattern

Every UI component follows this pattern:

1. **Dependencies**: `class-variance-authority`, `clsx`, `tailwind-merge`
2. **Utility**: `cn()` helper for merging classes
3. **Variants**: Use CVA for variant management
4. **Props**: Extend native HTML props + variant props
5. **Ref**: Use `forwardRef` for ref forwarding
6. **Display Name**: Set for debugging

### Example - Button Component

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { type ClassValue, clsx } from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const buttonVariants = cva("base classes", {
  variants: {
    variant: { ... },
    size: { ... },
  },
  defaultVariants: { ... },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, cn };
```

### Required Exports

All UI components must export:
- Component as named export (`export { ComponentName }`)
- `cn` utility (`export { cn }`)
- Variants CVA if applicable (`export const componentVariants = cva(...)`)

---

## Typography

- **Font Family**: JetBrains Mono (`--font-jetbrains-mono`)
- **Loading**: Use `next/font/google` in `layout.tsx`
- **Tailwind**: Define font in `@theme` in `globals.css`

```css
@theme inline {
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;
}
```

---

## Styling Conventions

### Tailwind CSS v4
- Use `@import "tailwindcss"` and `@theme inline` for configuration
- Avoid arbitrary values when possible
- Use design tokens from theme

### Button Variants Reference

| Variant | Description |
|---------|-------------|
| `default` | Primary action (emerald-500 bg) |
| `destructive` | Danger actions (red-500 bg) |
| `outline` | Secondary actions (bordered) |
| `secondary` | Tertiary actions (neutral bg) |
| `ghost` | Subtle actions (no bg) |
| `link` | Text links |

### Button Sizes

| Size | Use Case |
|------|----------|
| `default` | Standard buttons |
| `sm` | Compact contexts |
| `lg` | Prominent actions |
| `icon` | Icon-only buttons |

---

## Code Style

- **Language**: TypeScript
- **Linting**: Biome
- **Formatting**: Biome
- **Framework**: Next.js 16 (App Router)
- **React**: 19

### Import Order

1. External libraries
2. Internal imports (components, hooks)
3. Relative imports (utils, types)

---

## File Naming

- Components: `kebab-case.tsx` (e.g., `button.tsx`)
- Utils: `kebab-case.ts` (e.g., `cn.ts`)
- Types: `types.ts` or inline

---

## Testing

When adding tests:
- Use Vitest or React Testing Library
- Place tests next to components (`button.test.tsx`)
- Follow naming: `*.test.tsx` or `*.spec.tsx`

---

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build production
npm run lint     # Run linter
npm run format   # Format code
```
