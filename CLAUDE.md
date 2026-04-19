# ContentHub — Content Management Dashboard

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v3 + CSS custom properties |
| Component library | shadcn/ui pattern (Radix UI primitives + CVA) |
| Charts | Recharts |
| Icons | Lucide React |
| Font | Inter (Google Fonts via `next/font`) |

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout — wraps all pages with Sidebar
│   ├── globals.css         # Global styles, dark-theme CSS variables
│   ├── page.tsx            # Overview / dashboard landing page
│   ├── instagram/
│   │   └── page.tsx        # Instagram Manager (full CRUD, kanban tabs)
│   ├── analytics/
│   │   └── page.tsx        # Analytics dashboard (Recharts, date picker)
│   ├── calendar/
│   │   └── page.tsx        # Monthly content calendar with platform chips
│   ├── competitors/
│   │   └── page.tsx        # Competitor Tracker cards
│   └── news/
│       └── page.tsx        # News Consolidator list
│
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx     # Shared sidebar navigation (client component)
│   └── ui/                 # shadcn/ui-style primitive components
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── textarea.tsx
│       └── tooltip.tsx
│
├── lib/
│   ├── utils.ts            # cn() helper (clsx + tailwind-merge)
│   └── instagram-data.ts   # Seed data for Instagram posts
│
└── types/
    └── instagram.ts        # PostStatus, PostType, InstagramPost types
```

## Theme & Design Decisions

### Dark Theme
- **All colour values are CSS custom properties** defined in `globals.css` under `:root`.
- The `html` element has `class="dark"` set statically in `layout.tsx` — the app is dark-only.
- CSS variables follow shadcn/ui naming conventions (`--background`, `--foreground`, `--card`, `--primary`, etc.) so all Tailwind colour utilities (`bg-background`, `text-foreground`) resolve correctly.
- Sidebar uses its own colour token group: `--sidebar`, `--sidebar-border`, `--sidebar-accent`.

### Component Conventions
- UI primitives live in `src/components/ui/` and follow the shadcn/ui copy-paste pattern.
- Each primitive uses `React.forwardRef`, `cn()` for class merging, and `cva` for variant props where applicable.
- All interactive Radix UI primitives require `"use client"` at the top.
- Page-level components (`app/**/page.tsx`) that use `useState`/`useMemo` are also client components.
- Server components are the default; only add `"use client"` when browser APIs or hooks are needed.

### Routing
- All sections use Next.js App Router file-system routing.
- The sidebar uses `usePathname()` for active-link detection — it is a client component.
- Active state: exact match for `/`, prefix match (`pathname.startsWith(href)`) for all other routes.

## Section Overview

| Route | Feature |
|-------|---------|
| `/` | Overview cards linking to all sections |
| `/instagram` | Post management: Scheduled / Drafts / Published / Backlog tabs, Add Post dialog with caption, type, status, scheduled date, hashtags, notes |
| `/analytics` | Metrics (impressions, engagement, followers), bar/line charts via Recharts, date range selector, top posts table. Data placeholder — wire to Metricool API |
| `/calendar` | Monthly calendar with coloured platform chips per day, platform filter pills, prev/next month navigation |
| `/competitors` | Competitor cards showing follower count, engagement rate, post frequency, recent content, trend badge |
| `/news` | News feed cards with category badge, source, summary, tags. Designed for RSS feed integration |

## External Integrations (Planned)

- **Metricool** — Analytics and competitor data. Replace mock data in `analytics/page.tsx` and `competitors/page.tsx` with Metricool API calls. Add API key to `.env.local` as `METRICOOL_API_KEY`.
- **RSS Feeds** — News Consolidator (`news/page.tsx`) is designed to consume parsed RSS. Add a server-side data fetching layer using `next/fetch` or a library like `rss-parser`.

## Development

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```
