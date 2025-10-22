# Agent Guide - DORA Diagnostic

## Commands
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Dev**: `npm run dev` (⚠️ DO NOT RUN in Claude Code - blocking command)
- **No tests configured** - This is a diagnostic web app without test suite

## Tech Stack
Next.js 16 + React 19 + TypeScript + Tailwind CSS 4

## Code Style
- **Imports**: Use `@/*` path aliases for all src imports
- **Components**: Function components with TypeScript interfaces for props
- **Naming**: PascalCase for components/interfaces, camelCase for functions/variables
- **Types**: Explicit TypeScript types, no `any`, strict mode enabled
- **Error handling**: User-facing alerts for validation, console errors for dev
- **Formatting**: 2-space indent, semicolons, single quotes in JSX attributes
- **State**: useState hooks, client components marked with `'use client'`
- **Styling**: Tailwind utility classes, inline styles only for dynamic colors
- **No comments** unless critical business logic requires explanation

## Architecture
- `/src/app`: Next.js App Router pages
- `/src/components`: Reusable React components
- `/src/data`: Static data (clusters, questions)
- `/src/lib`: Business logic utilities
- Component props use explicit interfaces, exported separately
