# Day 1 — Requirements: Order & Inventory Dashboard for Etsy Multi-Listers

## Goal today
Ship a single-shop Etsy dashboard that loads a seller's live inventory and recent orders via API key, displays them in a table, and exports inventory as CSV—deployable by day 3 so we can validate with 2–3 real Etsy sellers by end of week.

## Features in scope
- **F1: Etsy API key input & authentication** — User pastes their Etsy API key once; system validates it and persists it for the session
- **F2: Inventory display** — Real-time pull of current inventory (SKU, title, quantity, price) from the connected Etsy shop, sorted by stock level
- **F3: Recent orders display** — Pull last 20–30 orders placed on the shop; display key fields (order ID, item, quantity, status, date)
- **F4: CSV export** — One-click download of current inventory snapshot as CSV (SKU, title, quantity, price)
- **F5: Sync status & error handling** — Visual indicator showing when data was last synced, whether API key is valid, and human-readable errors if sync fails
- **F6: Mobile-responsive layout** — Dashboard is usable on phone (card-based or collapsed-column layout) and desktop (full tables)

## Functional requirements

| ID    | Feature | Description | Acceptance criteria |
|-------|---------|-------------|---------------------|
| FR-1  | F1 | User lands on homepage and sees "Connect your Etsy shop" prompt. Clicks button, enters API key in a form field, submits. System calls Etsy API to validate the key (fetch basic shop info as proof of valid auth). | GET request to Etsy API with the provided key returns 200; user sees dashboard load with shop name displayed. Invalid key shows error message "API key invalid or expired" within 2 seconds. |
| FR-1b | F1 | API key is stored in secure environment variable or encrypted secret (not plain text in frontend code). On page reload, dashboard reconnects using the stored key without requiring re-entry. | User can close and reopen the dashboard in the same browser session; inventory and orders are still visible. |
| FR-2  | F2 | After auth succeeds, system calls Etsy's inventory endpoint and retrieves current listing data (SKU, title, quantity on hand, price). UI renders a sortable table sorted by quantity ascending (lowest stock first). Table shows at least SKU, Title, Qty, Price. Columns are readable on desktop (6 cols max). | Table appears within 1 second of auth success; at least 10 inventory items are displayed; any item with qty < 5 is visually highlighted (yellow/red background). |
| FR-2b | F2 | If Etsy API rate limit is hit during inventory fetch, error message displays: "Inventory data is temporarily unavailable. Last synced: [timestamp]. Please try again in 5 minutes." User is not locked out of dashboard. | Error message appears; any previously cached inventory is still visible with staleness indicator (e.g., "⚠️ Data from 30 min ago"). |
| FR-3  | F3 | After auth succeeds, system calls Etsy's orders endpoint and retrieves last 30 orders (or as many as API returns in one call). UI renders a table with columns: Order ID, Item Title, Quantity, Order Status, Order Date. Sorted by date descending (newest first). | Table appears within 1 second of auth; at least 5 orders are displayed; all visible orders have the 4 required columns populated. |
| FR-3b | F3 | If no orders exist for the shop, table shows "No orders found" placeholder message instead of empty table. | Placeholder message renders correctly; user does not see a broken empty state. |
| FR-4  | F4 | User clicks "Export CSV" button. System generates a CSV file with columns: SKU, Title, Quantity, Price (one row per inventory item, current data from most recent sync). Browser triggers a file download named `inventory-[SHOPNAME]-[DATE].csv`. | File downloads within 2 seconds; CSV is valid (comma-separated, quoted strings with embedded commas escaped, proper line endings). Sample file has at least 5 rows of data. |
| FR-5  | F5 | Dashboard footer or header displays sync metadata: "Last synced: 2 minutes ago" and a status dot (green = synced, yellow = stale >10 min, red = failed). Clicking "Sync now" button manually triggers a fresh fetch from Etsy API. | Status indicator updates correctly after successful sync. Manual sync button completes within 2 seconds (or shows "Syncing..." spinner if longer). If sync fails, error message replaces status indicator. |
| FR-5b | F5 | If API key becomes invalid (revoked, expired), next sync attempt fails with visible error: "API key no longer valid. Please re-enter your key." Dashboard does not crash; user can paste a new key and reconnect. | Error clears when user enters a valid key; dashboard reconnects without page reload. |
| FR-6  | F6 | On mobile (viewport width < 768px), tables collapse to a card layout: each order/inventory item is one card showing the most critical fields (title, qty, status/price). Shop selector and CSV export remain accessible. Page is readable without horizontal scrolling. | Tested on phone (iPhone 12 or similar), all text is readable, buttons are tap-sized (min 44px), no horizontal scroll. Dashboard renders correctly in Chrome and Safari on mobile. |

## Non-functional requirements

| ID     | Category | Requirement |
|--------|----------|-------------|
| NFR-1  | Performance | Inventory and orders endpoints complete within 2 seconds after auth. CSV export completes within 3 seconds. Page renders dashboard view within 500ms of receiving API responses. |
| NFR-2  | Security | API key is never logged to console, never sent in plain text over HTTP (only HTTPS), never stored in browser localStorage unencrypted. Sensitive logs (API calls, key validation) are stripped before any external monitoring. Pre-revenue: keys stored in app's secure env var or encrypted DB column; full auth rotation happens post-revenue. |
| NFR-3  | Reliability | If Etsy API is unreachable, error message displays within 1 second (do not hang). If sync job crashes, error is logged and user is notified; dashboard does not go blank. |
| NFR-4  | Browser support | Chrome and Safari, latest 2 versions. Must not require polyfills for ES2020 features. |
| NFR-5  | Accessibility | Form labels have `<label for=...>` associations. Error messages have `role="alert"`. Color is not the only indicator of status (use text + icon for sync status). |
| NFR-6  | Observability | Every Etsy API call is logged with timestamp, endpoint, response code, and latency. Logs are queryable by API key (hashed for privacy). Sync errors are tagged and can be filtered by error type (rate limit, invalid key, network timeout). Pre-revenue: stderr/stdout logging to a file; post-revenue, route to a real APM. |

## Stack chosen (lock in day 1)

- **Backend:** Node.js + Express/Fastify in TypeScript — shares types with Next.js frontend, reduces context-switching, Etsy SDK available in npm ecosystem
- **Web frontend:** Next.js (App Router, TypeScript, Tailwind) — required per company standard; provides both API routes and React components in one codebase
- **Database:** PostgreSQL (containerized via docker-compose with named volume) — relational schema for users/shops/syncs; data persists across restarts
- **Background job / sync:** node-cron for 30-minute polling cycle (simple, no external dependencies, sufficient for <5 users in week 1)
- **API client:** Etsy Open API SDK (npm package @etsyapi/etsy-api or equivalent) — vetted, reduces auth/retry bugs
- **ORM/query builder:** Prisma — scaffolds schema quickly, generates migrations, type-safe queries
- **Client data fetching:** TanStack Query (React Query) — handles stale-while-revalidate, cache invalidation on manual sync
- **UI component library:** shadcn/ui (Tailwind-based, no custom component overhead)

**Why this stack:** Node+Express+Next.js means the frontend engineer and backend engineer work in the same language (TypeScript), reducing integration bugs and speeding up API contract changes. Etsy SDK is mature and in npm. Postgres is rock-solid for small-scale relational data (users, shops, inventory snapshots). node-cron is overkill-resistant—it's simple enough that we can debug it in a day if it breaks, but robust enough to handle the 5-day validation window. Prisma + TanStack Query reduce boilerplate so we ship features, not scaffolding.

## Out of scope (do NOT build today)

- **Multi-shop OAuth authentication** — v1 uses hardcoded single shop or simple key-paste per shop. OAuth flow (token rotation, refresh token storage) ships in cycle 5 once we have paying customers and can justify crypto/secrets infrastructure.
- **Real-time inventory sync with WebSocket** — Etsy does not push inventory updates. We poll every 30 minutes via cron. Page refresh shows latest data. A manual "Sync now" button is available for users who need fresh data immediately.
- **Inventory editing & sync back to Etsy** — Dashboard is read-only. Users edit inventory directly in Etsy; our dashboard is a *visibility* tool, not a source of truth for writes. Prevents conflict handling and sync reconciliation complexity.
- **Advanced filtering, search, or analytics** — v1 shows all inventory sorted by qty, all recent orders sorted by date. No search, no per-shop filtering (single shop in v1), no charts. Filtering ships in cycle 5 if validation demands it.
- **Restocking alerts or notifications** — No email, no SMS, no in-app alerts when inventory drops below a threshold. Users can visually scan the inventory table and export CSV if they want to process it elsewhere.
- **Bulk actions (archive listings, close/reactivate items, change prices)** — Out of scope. Read-only dashboard in v1.
- **Integration with other platforms (Shopify, eBay, Amazon)** — Single Etsy shop only. Multi-channel sync is post-revenue scope creep.
- **Custom branding, white-label, or SAML** — Not pre-revenue. Ship boring, standard UI.

## Open questions (owner: Kenji, please answer before end of day)

1. **Etsy API authentication method:** We assume the Etsy Open API allows app-tier API keys (long-lived credentials). Confirm with Etsy support or docs that we can use this for v1 instead of full OAuth. If OAuth is required, we pivot to: users upload a CSV export from Etsy (manual sync route) instead of API key auth. **Decision needed by EOD today** so engineer doesn't start building the wrong auth flow.

2. **Sync frequency trade-off:** We're proposing 30-minute polls. If 5 test users each have 1 shop, that's 10 API calls per hour. Etsy's rate limit is typically 5,000 calls per 24 hours for app-tier keys. We have room. But: should we start at 15 minutes or 60 minutes? **Recommendation: start at 30 min, manual "Sync Now" button for immediate refresh.** Confirm this meets seller expectations (they're not expecting live-tick updates like a stock exchange).

3. **CSV schema for export:** Should we include additional columns beyond SKU, Title, Qty, Price? (e.g., Listing ID, URL, last edited date, shipping cost). **Recommendation: keep it minimal for v1 (SKU, Title, Qty, Price only).** Sellers can do custom Excel work if they need more. Confirm with Chiara if this matches the designer's intent.

4. **Data retention policy:** How long do we keep synced inventory/order history? (e.g., keep last 30 days of snapshots, or just current state + last 7 days). **Recommendation: store current state only; keep last sync timestamp for SLA.** No historical trend analysis in v1. Confirm storage feasibility with Anil.

5. **Seller discovery & validation timing:** Outreach team (Tom) is responsible for finding 2–3 test sellers by Wednesday. Once URL is live Friday, can we have 2–3 "hot leads" ready to test immediately? **This is not a blocker for engineering, but it's critical for Friday validation.** Fatima/Tom, confirm your outreach schedule.

## Definition of done for day 1

- [ ] requirements.md complete and reviewed by engineer + designer
- [ ] Etsy API auth method confirmed (no blockers on auth approach)
- [ ] All 6 features have task cards assigned to engineering
- [ ] Designer has sketched a wireframe/Figma of the dashboard (desktop + mobile)
- [ ] Engineer has set up repo with Next.js + Prisma + Tailwind boilerplate
- [ ] PostgreSQL docker-compose file is created with named volume
- [ ] At least one Etsy sandbox API key is obtained and tested for connectivity

**Definition of done for day 3 (launch target):**

- [ ] FR-1 verified: API key input accepts valid key, shows error on invalid key
- [ ] FR-2 verified: Inventory table displays ≥10 items, sorted by qty ascending, <5 items highlighted
- [ ] FR-3 verified: Orders table displays ≥5 recent orders with correct columns
- [ ] FR-4 verified: CSV export downloads with correct schema, file is valid CSV
- [ ] FR-5 verified: Sync status indicator displays correctly, "Sync now" button works
- [ ] FR-6 verified: Dashboard is responsive on iPhone 12 (mobile view) and desktop; no horizontal scroll
- [ ] All 6 FRs have passing tests (Playwright or curl for API; screenshot comparison for mobile layout)
- [ ] App deployed to staging URL (Vercel, Railway, or similar) and is publicly accessible
- [ ] 2–3 Etsy sellers have been contacted and confirmed for Friday validation
