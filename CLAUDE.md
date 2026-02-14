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
- `unit`: `test/{e2e,unit}/*.{test,spec}.ts` (node environment)
- `api`: `server/**/*.{test,spec}.ts` (nuxt environment)
- `nuxt`: `test/nuxt/*.{test,spec}.ts`, `app/components/**/*.{test,spec}.ts` (nuxt environment)

Coverage excludes: `nuxt.config.ts`, `app/components/ui/**`, `**/*.mjs`, `.nuxt/**`

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

### Build
```bash
pnpm run build         # Production build (via Turbo)
```

## Architecture

```
bookmark-share/
├── apps/web/                  # Nuxt 4 application
│   ├── app/
│   │   ├── assets/            # Static assets (CSS)
│   │   ├── components/        # Vue components
│   │   │   ├── ui/            # shadcn-vue components (prefix: Shad)
│   │   │   ├── app-sidebar/   # Main sidebar navigation
│   │   │   ├── bookmark-form/ # Bookmark creation/edit form
│   │   │   ├── bookmarks/     # Bookmarks listing
│   │   │   ├── login-form/    # Login form
│   │   │   └── ...            # avatar, page, tag, etc.
│   │   ├── composables/       # Vue composables
│   │   ├── layouts/           # Page layouts (default, guest)
│   │   ├── lib/               # Utility functions (utils.ts)
│   │   ├── pages/             # Route pages
│   │   ├── plugins/           # Nuxt plugins (e.g., ssr-width)
│   │   ├── schemas/forms/     # Zod + Vee-Validate form schemas
│   │   ├── types/             # App-level TypeScript types
│   │   └── utils/             # Utility helpers
│   ├── server/
│   │   ├── api/               # API routes (*.get.ts, *.post.ts)
│   │   ├── auth/              # Auth provider system
│   │   │   ├── core/factory.ts  # Provider factory (env-driven)
│   │   │   ├── providers/     # supabase.ts, mock.ts
│   │   │   └── helpers.ts     # getUser(), requireUser()
│   │   ├── repositories/      # Database access layer
│   │   ├── schemas/           # Server-side Zod schemas + transforms
│   │   ├── types/             # Server-level TypeScript types
│   │   └── usecases/          # Business logic services
│   ├── shared/                # Shared between client and server
│   │   ├── schemas/           # Zod validation schemas (mirrors API structure)
│   │   └── types/dto/         # Data Transfer Objects (API request/response types)
│   └── test/                  # E2E and Nuxt integration tests
└── packages/
    ├── supabase/              # Supabase config, migrations, generated types
    │   ├── src/types.gen.ts   # Auto-generated DB types
    │   └── supabase/          # Supabase CLI config (config.toml, migrations/)
    └── eslint-config/         # Shared ESLint config
```

## Routes

- `/` - Home page
- `/login` - Login page
- `/confirm` - Auth confirmation callback
- `/dashboard` - Dashboard
- `/bookmarks` - Bookmarks listing
- `/bookmarks/[bookmark_id]` - Single bookmark view
- `/spaces` - Spaces listing
- `/spaces/[space_id]` - Space detail
- `/spaces/[space_id]/setting` - Space settings
- `/profile` - User profiles listing
- `/profile/[user_id]` - User profile
- `/profile/me` - Current user profile

## Tech Stack

- **Frontend**: Nuxt 4, Vue 3, TypeScript
- **UI**: shadcn-vue (New York style, prefix `Shad`), TailwindCSS 4, Lucide icons, reka-ui
- **Tables**: @tanstack/vue-table
- **Forms**: Vee-Validate + Zod (`toTypedSchema` from `@vee-validate/zod`)
- **Utilities**: @vueuse/core, clsx, tailwind-merge, class-variance-authority
- **Backend**: Supabase (PostgreSQL 15 with RLS)
- **Build**: Turbo monorepo
- **Package Manager**: pnpm 10.x
- **Node**: >= 18

## Key Patterns

### UI Components
shadcn-vue components are in `apps/web/app/components/ui/` with the `Shad` prefix. Add new components via CLI:
```bash
npx shadcn-vue@latest add <component>
```

### API Routes
Server routes follow Nuxt conventions in `server/api/`. Tests are colocated (e.g., `index.get.ts` + `index.get.test.ts`).

API responses follow a consistent DTO pattern defined in `shared/types/dto/` (e.g., `bookmarks.dto.ts`, `spaces.dto.ts`). Pagination uses `getRange()` utility and returns `{ items, total, page, pageSize }` style responses.

### Server Architecture

**Repositories** (`server/repositories/`): Database access layer using dependency injection. Accept `ServerSupabaseClient` via constructor, interface-based design.

**Use Cases** (`server/usecases/`): Business logic services (e.g., `bookmarkService.ts`, `profileService.ts`).

**Schemas** (`server/schemas/`): Server-side Zod schemas with transform functions (e.g., `bookmarkRowTransformBookmark` converts DB rows to domain types).

### Shared Schemas and DTOs
`apps/web/shared/` contains validation schemas and DTOs shared between client and server:
- `shared/schemas/` - Zod schemas for API validation (mirrors `server/api/` structure)
- `shared/types/dto/` - TypeScript DTOs for API request/response types (bookmarks, spaces, profiles, tags)

### Database Types
Auto-generated types from Supabase schema are in `packages/supabase/src/types.gen.ts`. Regenerate with `pnpm run db:gen:local` after schema changes. Exports row/insert/update types for each table (e.g., `SpaceRow`, `SpaceInsert`, `SpaceUpdate`).

The `@bookmark-share/supabase/server-client` export provides `ServerSupabaseClient` type and getter function for server-side use.

### Authentication
Uses `@nuxtjs/supabase` module with a factory pattern for auth providers:
- Provider is selected via `AUTH_PROVIDER` env var (`'supabase'` or `'mock'`)
- Factory in `server/auth/core/factory.ts`
- Helpers: `getUser()` returns User or null, `requireUser()` throws 401 if unauthenticated
- Mock provider available for tests (`server/auth/providers/mock.ts`)
- Override in tests with `__setAuthProviderForTests()`

### Composables
All composables in `app/composables/` wrap API calls with `useFetch` and return readonly computed values with refresh methods:
- `useAuth` - Authentication state
- `useBookmark` / `useBookmarks` - Bookmark operations and listings
- `useSpace` / `useSpaces` - Space operations and listings
- `useTag` / `useTags` - Tag operations and listings
- `useProfile` - User profile
- `useBreadcrumb` - Breadcrumb navigation

### Environment Variables
Supabase env sample at `packages/supabase/supabase/.env.sample`. Key variables:
- `SUPABASE_URL` / `PUBLIC_SUPABASE_URL` - Supabase API URL
- `SUPABASE_ANON_KEY` / `PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server only)
- `AUTH_PROVIDER` - Auth provider selection (`'supabase'` or `'mock'`)
- `AUTH_GOOGLE_CLIENT_ID` / `AUTH_GOOGLE_CLIENT_SECRET` - Google OAuth (in Supabase env)

### Supabase Local Ports
- API: 54321
- PostgreSQL: 54322
