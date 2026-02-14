# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Bookmark-share is a web application for saving and sharing bookmarks with users in a space. Built with Nuxt 4 + Supabase in a Turbo monorepo.

## Commands

### Development
```bash
# Start Supabase (required before running the app)
pnpm run supabase:start

# Start dev server
pnpm run dev

# Stop Supabase
pnpm run supabase:stop
```

### Testing
```bash
# Run all tests
pnpm run test

# Run tests in apps/web
cd apps/web
pnpm test              # Run once
pnpm test:watch        # Watch mode
pnpm test:ui           # With UI
```

Test projects are configured in `apps/web/vitest.config.ts`:
- `unit`: `test/{e2e,unit}/*.{test,spec}.ts`
- `api`: `server/**/*.{test,spec}.ts` (Nuxt environment)
- `nuxt`: `test/nuxt/*.{test,spec}.ts`, `app/components/**/*.{test,spec}.ts`

### Database
```bash
# Generate TypeScript types from local DB
pnpm run db:gen:local

# Database commands (run from packages/supabase)
cd packages/supabase
pnpm run db:mig:new:local <name>     # Create migration
pnpm run db:mig:up:local             # Apply migrations
pnpm run db:diff:local <name>        # Generate migration diff
pnpm run db:reset                    # Reset database
pnpm run db:studio                   # Open Supabase Studio
```

### Linting & Formatting
```bash
pnpm run lint          # ESLint
pnpm run format        # Prettier
pnpm run check-types   # TypeScript check
```

## Architecture

```
bookmark-share/
├── apps/web/              # Nuxt 4 application
│   ├── app/
│   │   ├── components/    # Vue components (ui/ contains shadcn-vue)
│   │   ├── pages/         # Route pages
│   │   ├── layouts/       # Page layouts
│   │   ├── composables/   # Vue composables
│   │   └── schemas/       # Zod validation schemas (forms/)
│   ├── server/
│   │   ├── api/           # API routes (*.get.ts, *.post.ts)
│   │   ├── repositories/  # Database access layer
│   │   ├── usecases/      # Business logic services
│   │   └── auth/          # Auth providers (Supabase, mock for tests)
│   └── shared/            # Shared schemas/types
└── packages/
    ├── supabase/          # Supabase config, migrations, generated types
    └── eslint-config/     # Shared ESLint config
```

## Tech Stack

- **Frontend**: Nuxt 4, Vue 3, TypeScript
- **UI**: shadcn-vue (New York style), TailwindCSS 4, Lucide icons
- **Forms**: Vee-Validate + Zod
- **Backend**: Supabase (PostgreSQL with RLS)
- **Package Manager**: pnpm 10.x
- **Node**: >= 18

## Key Patterns

### UI Components
shadcn-vue components are in `apps/web/app/components/ui/`. Add new components via CLI:
```bash
npx shadcn-vue@latest add <component>
```

### API Routes
Server routes follow Nuxt conventions in `server/api/`. Tests are colocated (e.g., `index.get.ts` + `index.get.test.ts`).

### Database Types
Auto-generated types from Supabase schema are in `packages/supabase/src/types.gen.ts`. Regenerate with `pnpm run db:gen:local` after schema changes.

### Authentication
Uses `@nuxtjs/supabase` module. Mock auth provider available for tests (`server/auth/providers/mock.ts`).
