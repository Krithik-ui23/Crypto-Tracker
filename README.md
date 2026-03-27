<div align="center">

```
 ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ ██████╗ ████████╗██████╗  █████╗  ██████╗██╗  ██╗
██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔═══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝
██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ██║   ██║   ██║   ██████╔╝███████║██║     █████╔╝ 
██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ██║   ██║   ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ 
╚██████╗██║  ██║   ██║   ██║        ██║   ╚██████╔╝   ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝    ╚═════╝    ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
```

### 📈 *Track. Invest. Stay Ahead.* 📈

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![React Query](https://img.shields.io/badge/React_Query-5.0-orange?style=for-the-badge&logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![CoinGecko](https://img.shields.io/badge/CoinGecko-API-brightgreen?style=for-the-badge)](https://coingecko.com/)

<br>

> **CryptoTrack** is a full-stack cryptocurrency tracker built with Next.js 16, Supabase, and the CoinGecko API.  
> Track live prices, manage your portfolio, build a watchlist — all with real-time updates and a beautiful dark mode UI.

<br>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)

</div>

<br>

## 🌐 Live Features at a Glance

<div align="center">

| 📊 Live Markets | 🌙 Dark Mode | ⭐ Watchlist | 💼 Portfolio |
|:---:|:---:|:---:|:---:|
| Top 50 coins with sparklines, prices & % changes auto-refreshing every 30s | Manual dark/light toggle that persists across sessions via localStorage | Add coins to your watchlist with real-time sync across browser tabs | Track holdings, buy prices and total invested value |

| 🔍 Live Search | 📈 Price Charts | 🔐 Auth System | ⚡ Realtime Sync |
|:---:|:---:|:---:|:---:|
| Instant coin search with debounced API calls and dropdown results | Interactive area charts with 7D / 1M / 3M / 1Y range selectors | Full signup/login with Supabase Auth and protected routes | Supabase Realtime pushes watchlist changes instantly across tabs |

</div>

<br>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.master/assets/lines/colored.png)

<br>

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                       CRYPTOTRACK PLATFORM                          │
│                                                                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│   │    /     │  │/coin/[id]│  │/watchlist│  │  /portfolio      │  │
│   │          │  │          │  │          │  │  /dashboard      │  │
│   │ Markets  │  │  Detail  │  │Watchlist │  │  /login          │  │
│   │ Table    │  │  Page    │  │  Page    │  │                  │  │
│   │Sparklines│  │  Chart   │  │Realtime  │  │  Auth Pages      │  │
│   └────┬─────┘  └────┬─────┘  └────┬─────┘  └────────┬─────────┘  │
│        │              │              │                  │            │
│        └──────────────┴──────────────┴──────────────────┘           │
│                                │                                    │
│                   Next.js Server Components                         │
│                   + React Query Client Cache                        │
│                                │                                    │
│        ┌───────────────────────▼──────────────────────┐            │
│        │          NEXT.JS API ROUTE HANDLERS           │            │
│        │                                               │            │
│        │  /api/coins          → top 50 coins list      │            │
│        │  /api/coins/[id]     → single coin detail     │            │
│        │  /api/coins/[id]/chart → price history        │            │
│        │  /api/global         → market stats           │            │
│        │  /api/search         → coin search            │            │
│        │  /api/trending       → trending coins         │            │
│        │                                               │            │
│        └──────────┬────────────────────┬───────────────┘            │
│                   │                    │                             │
│          CoinGecko API v3         Supabase                          │
│          (live prices)            (auth + DB)                       │
│                   │                    │                             │
│        ┌──────────▼──────┐  ┌─────────▼──────────────┐            │
│        │  api.coingecko  │  │     supabase DB         │            │
│        │  .com/api/v3    │  │                         │            │
│        │                 │  │  watchlists table       │            │
│        │  /coins/markets │  │  portfolios table       │            │
│        │  /coins/{id}    │  │  auth.users             │            │
│        │  /global        │  │                         │            │
│        │  /search        │  │  Realtime enabled ✅    │            │
│        │  /trending      │  │                         │            │
│        └─────────────────┘  └─────────────────────────┘            │
└─────────────────────────────────────────────────────────────────────┘
```

<br>

## 🔄 Data Flow — Live Price Updates

```
  BROWSER (React Query)         NEXT.JS API ROUTE          COINGECKO API
  ─────────────────────         ─────────────────          ─────────────
         │                              │                        │
         │  Every 30 seconds:           │                        │
         │  GET /api/coins              │                        │
         │ ─────────────────────────────▶                        │
         │                              │  GET /coins/markets    │
         │                              │ ───────────────────────▶
         │                              │                        │
         │                              │  { prices, changes }   │
         │                              │ ◀───────────────────────
         │                              │                        │
         │                    Cache: revalidate 60s              │
         │  { coins[] }                 │                        │
         │ ◀─────────────────────────── │                        │
         │                              │                        │
    UI re-renders                  Route Handler             Live Data
    with new prices                (proxy layer)             ✅
```

<br>

## 🔄 Realtime Watchlist Flow

```
  TAB 1 (Add coin)         SUPABASE REALTIME             TAB 2 (Watching)
  ────────────────         ─────────────────             ────────────────
        │                         │                             │
        │  INSERT watchlists      │                             │
        │ ────────────────────────▶                             │
        │                         │  postgres_changes event     │
        │                         │ ────────────────────────────▶
        │                         │                             │
        │                         │                    setState → re-render
        │                         │                             │
   "Watching" ✅            DB updated ✅              Coin appears ⚡
   (optimistic UI)                                    (no refresh needed)
```

<br>

## 📁 Project Structure

```
crypto-tracker/
│
├── 📁 src/
│   ├── 📁 app/                        # Next.js App Router pages
│   │   ├── 📄 page.tsx                # Homepage — markets table
│   │   ├── 📄 layout.tsx              # Root layout with providers
│   │   ├── 📄 globals.css             # Global styles + CSS variables
│   │   ├── 📁 coin/[id]/
│   │   │   └── 📄 page.tsx            # Coin detail page
│   │   ├── 📁 dashboard/
│   │   │   └── 📄 page.tsx            # User dashboard (protected)
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx            # Login / signup page
│   │   ├── 📁 watchlist/
│   │   │   └── 📄 page.tsx            # Watchlist page (protected)
│   │   ├── 📁 portfolio/
│   │   │   └── 📄 page.tsx            # Portfolio page (protected)
│   │   └── 📁 api/                    # Route handlers (CoinGecko proxy)
│   │       ├── 📁 coins/
│   │       │   ├── 📄 route.ts        # GET /api/coins
│   │       │   └── 📁 [id]/
│   │       │       ├── 📄 route.ts    # GET /api/coins/[id]
│   │       │       └── 📁 chart/
│   │       │           └── 📄 route.ts # GET /api/coins/[id]/chart
│   │       ├── 📁 global/
│   │       │   └── 📄 route.ts        # GET /api/global
│   │       ├── 📁 search/
│   │       │   └── 📄 route.ts        # GET /api/search
│   │       └── 📁 trending/
│   │           └── 📄 route.ts        # GET /api/trending
│   │
│   ├── 📁 components/
│   │   ├── 📁 layout/
│   │   │   ├── 📄 Navbar.tsx          # Top navigation bar
│   │   │   ├── 📄 StatsBar.tsx        # Global market stats strip
│   │   │   ├── 📄 CoinRow.tsx         # Single coin table row
│   │   │   └── 📄 CoinTableClient.tsx # Full coin table with React Query
│   │   ├── 📁 charts/
│   │   │   └── 📄 PriceChart.tsx      # Recharts area chart
│   │   ├── 📄 SearchBar.tsx           # Live search with dropdown
│   │   ├── 📄 ThemeToggle.tsx         # Dark / light mode button
│   │   ├── 📄 WatchlistButton.tsx     # Add/remove watchlist button
│   │   ├── 📄 WatchlistClient.tsx     # Watchlist page client component
│   │   ├── 📄 PortfolioClient.tsx     # Portfolio CRUD client component
│   │   ├── 📄 RealtimeDashboard.tsx   # Dashboard with live watchlist
│   │   ├── 📄 LivePriceTicker.tsx     # Live price ticker strip
│   │   ├── 📄 SkeletonRow.tsx         # Loading skeleton animation
│   │   ├── 📄 LogoutButton.tsx        # Sign out button
│   │   └── 📄 Providers.tsx           # React Query provider wrapper
│   │
│   ├── 📁 hooks/
│   │   ├── 📄 useLiveCoins.ts         # React Query — coin list
│   │   ├── 📄 useCoinDetail.ts        # React Query — single coin
│   │   └── 📄 useRealtimeWatchlist.ts # Supabase Realtime hook
│   │
│   └── 📁 lib/
│       ├── 📄 api.ts                  # CoinGecko fetch functions + types
│       └── 📁 supabase/
│           ├── 📄 client.ts           # Supabase browser client
│           └── 📄 server.ts           # Supabase server client
│
├── 📄 .env.local                      # Environment variables (not in git)
├── 📄 .gitignore
├── 📄 next.config.ts
├── 📄 package.json
└── 📄 tsconfig.json
```

<br>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)

<br>

## ⚙️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:---:|:---:|:---:|
| **Framework** | Next.js 16 (App Router) | Server components, routing, API handlers |
| **Language** | TypeScript 5 | Type-safe development throughout |
| **Styling** | CSS Variables + Tailwind | Theming, dark mode, responsive layout |
| **Database** | Supabase (PostgreSQL) | Watchlists, portfolios, user data |
| **Auth** | Supabase Auth | Email/password signup, protected routes |
| **Realtime** | Supabase Realtime | Live watchlist sync across tabs |
| **Data Fetching** | TanStack React Query v5 | Client-side caching, auto-refresh |
| **Charts** | Recharts | Interactive area price charts |
| **API** | CoinGecko API v3 | Live crypto prices and market data |
| **Deployment** | Vercel | Production hosting with edge network |
| **Icons** | Lucide React | Clean SVG icon library |

</div>

<br>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)

<br>

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Supabase account (free tier works)
- CoinGecko API (free, no key required for public endpoints)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/crypto-tracker.git
cd crypto-tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env.local file with the following:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# 4. Set up Supabase tables
# Run the SQL below in your Supabase SQL Editor

# 5. Start the development server
npm run dev
```

### Access the app
```
http://localhost:3000          → Markets page
http://localhost:3000/login    → Login / Signup
http://localhost:3000/dashboard → User dashboard (requires login)
http://localhost:3000/watchlist → Watchlist (requires login)
http://localhost:3000/portfolio → Portfolio (requires login)
```

<br>

## 🗄️ Supabase Setup

Run this SQL in your Supabase **SQL Editor**:

```sql
-- Watchlists table
create table watchlists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  coin_id text not null,
  coin_name text not null,
  coin_symbol text not null,
  coin_image text,
  added_at timestamp with time zone default now()
);

-- Portfolios table
create table portfolios (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  coin_id text not null,
  coin_name text not null,
  coin_symbol text not null,
  coin_image text,
  quantity numeric not null,
  buy_price numeric not null,
  bought_at timestamp with time zone default now()
);

-- Row Level Security
alter table watchlists enable row level security;
alter table portfolios enable row level security;

create policy "Users can manage their own watchlist"
  on watchlists for all using (auth.uid() = user_id);

create policy "Users can manage their own portfolio"
  on portfolios for all using (auth.uid() = user_id);

-- Enable Realtime for watchlists
alter publication supabase_realtime add table watchlists;
```

<br>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)

<br>

## 📡 API Reference

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/coins` | Top 50 coins by market cap with sparklines |
| `GET` | `/api/coins/[id]` | Full detail for a single coin |
| `GET` | `/api/coins/[id]/chart` | Price history (7D / 30D / 90D / 365D) |
| `GET` | `/api/global` | Global market stats (total cap, volume, dominance) |
| `GET` | `/api/search?query=` | Search coins by name or symbol |
| `GET` | `/api/trending` | Currently trending coins |

> All routes are server-side proxy handlers — the CoinGecko API is never called directly from the browser.

<br>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)

<br>

## ✨ Key Highlights

```
🟠  Server-side rendering with Next.js App Router
    ↳ Pages load with data already fetched — no layout shift
    ↳ Server components call CoinGecko directly, no extra HTTP hop
    ↳ Route handlers act as a proxy, hiding API calls from the client

🟠  React Query auto-refresh every 30 seconds
    ↳ Coin prices update silently in the background
    ↳ staleTime prevents unnecessary refetches
    ↳ Loading skeletons shown only on first load

🟠  Supabase Realtime watchlist sync
    ↳ postgres_changes subscription on the watchlists table
    ↳ Add a coin in Tab 1 — it appears in Tab 2 instantly
    ↳ No polling, no page refresh — pure WebSocket push

🟠  Dark mode with localStorage persistence
    ↳ data-theme attribute on <html> controls CSS variables
    ↳ Respects OS preference by default via prefers-color-scheme
    ↳ Manual toggle overrides and remembers user preference

🟠  Type-safe throughout with TypeScript
    ↳ Full interfaces for CoinMarket, CoinDetail, ChartData, etc.
    ↳ Typed API responses from CoinGecko
    ↳ Typed Supabase queries with proper error handling

🟠  Production deployment on Vercel
    ↳ Edge network for fast global response times
    ↳ Environment variables managed securely via Vercel dashboard
    ↳ Automatic deployments on every git push
```

<br>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)

<br>

## 🗺️ Development Roadmap

| Phase | Feature | Status |
|:---:|:---|:---:|
| Phase 1 | Project setup — Next.js, TypeScript, Tailwind | ✅ Done |
| Phase 2 | Supabase — DB tables, RLS policies, auth | ✅ Done |
| Phase 3 | CoinGecko API — route handler proxies | ✅ Done |
| Phase 4 | Core UI — markets table, coin detail, chart | ✅ Done |
| Phase 5 | User features — login, watchlist, dashboard | ✅ Done |
| Phase 6 | Realtime — React Query, Supabase Realtime | ✅ Done |
| Phase 7 | Polish — dark mode, search, skeletons | ✅ Done |
| Phase 8 | Deployment — Vercel production | ✅ Done |

<br>

![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)

<br>

<div align="center">

### Built with  using Next.js, Supabase & CoinGecko

*A full-stack crypto tracker demonstrating App Router architecture, real-time data,*  
*Supabase Auth + Realtime, React Query caching, and production deployment on Vercel.*

<br>

[![GitHub](https://img.shields.io/badge/GitHub-your--username-orange?style=for-the-badge&logo=github)](https://github.com/your-username)

<br>

*⭐ Star this repo if you found it useful!*

</div>
