# Athena Interior

**Making interior design accessible** — browse pre-made plans for furniture arrangements, room decor, and full floor designs.

---

## Architecture Overview

### Stack

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | **Next.js 15** (App Router) | SSR + static generation for SEO; React ecosystem; Vercel-native |
| Language | **TypeScript** | Type safety across full stack |
| Database | **PostgreSQL** | Relational model suits design plans + filters; battle-tested |
| ORM | **Prisma** | Type-safe queries, easy migrations, great DX |
| Styling | Inline CSS (MVP) → CSS Modules / Tailwind later | Fastest to ship; no build config needed |
| Hosting | **Vercel** (frontend) + managed Postgres (Supabase / Railway) | Zero-config deploys, generous free tier |
| CI/CD | **GitHub Actions** | Type check, lint, and build on every PR |

### Data Model

- **DesignPlan** — core entity; has category, style, budget, room size, images
- **FurnitureItem** — items within a plan (affiliate links later)
- **Tag** — many-to-many with plans for flexible filtering

### Directory Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout + nav
│   ├── page.tsx           # Home / landing page
│   ├── globals.css        # Design tokens + resets
│   ├── catalog/
│   │   ├── page.tsx       # Browsable plan grid (server component)
│   │   └── [slug]/
│   │       └── page.tsx   # Plan detail page
│   └── api/
│       └── plans/
│           └── route.ts   # REST API: GET /api/plans
├── lib/
│   └── db.ts              # Prisma singleton
└── types/
    └── index.ts           # Shared types
prisma/
├── schema.prisma          # DB schema
└── seed.ts                # Sample data
```

---

## Local Dev Setup

### Prerequisites

- Node.js 20+
- PostgreSQL 14+ running locally (or use Docker)

### Steps

```bash
# 1. Clone and install
git clone <repo-url>
cd athena-interior
npm install

# 2. Configure environment
cp .env.example .env
# Edit DATABASE_URL to point to your local Postgres

# 3. Push schema and seed sample data
npm run db:push
npm run db:seed

# 4. Start dev server
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

### Useful Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript type check |
| `npm run lint` | ESLint |
| `npm run db:generate` | Regenerate Prisma client |
| `npm run db:push` | Sync schema to DB (no migration file) |
| `npm run db:migrate` | Create and apply a migration |
| `npm run db:seed` | Seed sample plans |

---

## Key Pages

| Route | Description |
|---|---|
| `/` | Landing page |
| `/catalog` | Browsable grid of all published plans |
| `/catalog/[slug]` | Plan detail — description, images, budget, tags |
| `/api/plans` | JSON API for plans (supports `category`, `style`, `featured`, `q`, `page`, `limit`) |

---

## Roadmap

- [ ] Image upload + storage (S3 / Cloudflare R2)
- [ ] Advanced filters sidebar (budget range, room size)
- [ ] User accounts + saved plans
- [ ] Custom plan builder
- [ ] Furniture affiliate links / shopping list export
- [ ] Full floor plan viewer (SVG / canvas)
