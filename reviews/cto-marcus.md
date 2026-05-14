# CTO review: "Order & Inventory Dashboard for Etsy Multi-Listers"

- **By:** Marcus (CTO)
- **Cycle:** 4
- **Saved:** 14/05/2026, 12:44:33 PM

---

# MARCUS'S TECHNICAL READ — MULTI-SHOP ETSY DASHBOARD

I'm going to be direct: this idea has real velocity. You're describing a **data aggregation + UI play**, not a marketplace, not compliance logic, not guessing at customer need. The shape is tight.

But I need to cut scope until it hurts, because "real-time sync" and "CSV export" are where this idea dies on day 5.

---

## 1. BUILD COMPLEXITY — WEEKS TO UGLY WORKING MVP

**5 days. Not 7. Five.**

Here's the path:

**Day 1–2: Auth + Etsy API plumbing**
- Hardcode ONE shop's API key in `.env` initially
- Build the Etsy OAuth flow (we're not hardcoding user creds, but we're not building a full credential storage system either—single sign-in, one user per deployment for week 1)
- Test against real Etsy sandbox (they have one, use it)
- **Ugly decision:** No credential encryption until we have paying users. Plain text in Postgres is fine for v1. Upgrade to encrypted secrets after first revenue.

**Day 2–3: Single sync job + UI skeleton**
- Build ONE sync function that hits Etsy's inventory + orders endpoints
- Store raw JSON in a simple schema (shop_id, sync_timestamp, raw_data blob)
- No data normalization. No transformation pipeline. Grab what Etsy gives us.
- **Ugly decision:** Cron job fires every 30 minutes via a simple scheduler (node-cron or APScheduler). Not background workers, not queues, not event sourcing. One table, one job.
- UI: Two tables. Left = inventory (sku, quantity, price from last sync). Right = recent orders (order ID, total, date).
- **Ugly decision:** No real-time subscription. Page refresh shows latest data. Users accept the 30-min sync lag.

**Day 3–4: Multi-shop selection + CSV export**
- Add a shop selector dropdown (stores list of shops once entered, no persistent multi-account auth yet—hardcode for validation)
- Build CSV export: dump the current shop's inventory table to CSV, one click
- **Ugly decision:** CSV is static snapshot, not streaming. File downloads to user's machine immediately. No email, no S3, no async generation.

**Day 4–5: Validation loop + launch**
- Deploy to a simple host (Railway, Heroku, Render—whatever we're using)
- Send the URL to 3–5 Etsy sellers (find them this week: Facebook Etsy groups, Reddit r/FeltCraft, Etsy forums)
- Measure: Do they use it? Do they ask for multi-shop auth? Does sync lag break the workflow?
- **Ship it.** Iterate based on what they say.

---

## 2. TEAM/SKILLS NEEDED

**You need exactly two people, and I mean two.**

- **1 mid-level full-stack engineer** (2–4 years): Builds the Etsy API integration, sync job, DB schema, CSV export. Owns the backend entirely. Can write clean Node/Python but doesn't need to be a systems designer.
- **1 junior/mid UI engineer** (1–3 years): Builds the React/Vue component (two tables, one dropdown, one button). Can follow a design system (use shadcn or Tailwind pre-built stuff—do NOT design a custom component library). Takes a Figma frame and ships it.

**You do NOT need:**
- A DevOps engineer (we're using managed platforms)
- A QA person (the two engineers test themselves, and customers will tell us what's broken)
- A product designer (steal Etsy's UI language, make it boring, move on)

**Total capacity this week:** ~80 engineer-hours if both are unblocked. You have it.

---

## 3. BIGGEST TECHNICAL RISK THAT WOULD ACTUALLY KILL US IN PRODUCTION

**Etsy API rate limits and sync storms.**

Here's the failure mode:

- Etsy's API has strict rate limits (typically 5,000 requests per 24 hours for app-tier keys, varies by endpoint)
- If we sync naively every 30 minutes and each sync makes 5+ API calls per shop, one user with 5 shops hits 150 calls per day
- Add 3 users, we're at 450. Add 10 users, we're hitting the limit and getting 429s
- If we don't handle 429s gracefully, the sync job fails silently, customer sees stale data, assumes the product is broken, churns

**How we kill this risk in 7 days:**

1. **Day 2:** Before we even build the sync, reverse-engineer Etsy's API rate limit headers. Test in sandbox.
2. **Day 3:** Implement exponential backoff + retry queue (not a full job queue—just a simple `try/retry` loop with jitter)
3. **Day 3:** Log every API call and response code to stderr. No fancy monitoring. Just grep the logs.
4. **Before launch:** Do a load test ourselves: simulate 10 shops syncing simultaneously. If we hit rate limit, add a manual backoff delay between shops. Ship with it.

**The ugly truth:** If we hit limits before launch, we pivot to "users manually trigger sync" (one button click = full sync). Not elegant. Exactly what we'll do.

---

## 4. THREE FEATURES WE CUT FROM THIS SCOPE

### ❌ FEATURE 1: Multi-account OAuth authentication
**What it is:** "Users can add multiple Etsy shops via secure OAuth flow, all stored and synced automatically."

**Why it's cut:** OAuth adds 2 days. We need to:
- Build OAuth callback handler
- Store refresh tokens securely
- Handle token expiration
- Test with real Etsy OAuth sandbox

**What we do instead:** Hardcode. One shop. Users give us their API key (we tell them it's temporary, v1 only). Store it in `.env` for validation week. Once we have paying users and can justify SOC2, we build OAuth. This is the deal.

### ❌ FEATURE 2: Real-time sync with WebSocket subscriptions
**What it is:** "Inventory changes appear instantly without page refresh."

**Why it's cut:** WebSocket + Etsy polling = complexity. Etsy doesn't have webhooks for inventory changes (they do for orders, but not inventory). We'd need to maintain a WebSocket connection AND poll Etsy, handling disconnects and race conditions.

**What we do instead:** 30-minute cron sync. Page refresh. Done. If customers hate the lag, they'll tell us, and we'll add a manual "Sync Now" button in 30 minutes. Ship now, iterate later.

### ❌ FEATURE 3: Advanced inventory analytics and forecasting
**What it is:** "Charts showing sell-through rate, restock recommendations, seasonal trends."

**Why it's cut:** Not in the pitch anyway, but I'm preempting the ask: analytics = data engineering work. We're not doing this in week 1. 

**What we do instead:** Raw inventory table. That's it. If a user wants to analyze, they export CSV and use Google Sheets. We're not their analytics vendor yet.

---

## BIGGEST EXECUTION RISK (NOT TECHNICAL)

You won't find 5 Etsy sellers to validate with by end of week.

**How we derisk:** Start finding them TODAY, not Friday. Post in Etsy seller Facebook groups, DM people listing bulk resold items, offer $50 Etsy credit in exchange for 20 minutes of feedback. We need at least 3 test users by Day 1 of build.

---

## MY CALL

This ships. **Approve it.**

Five days, two engineers, one simple integration, one ugly UI, no compliance risk, real customer signal by end of week.

It's not sexy. It's not event sourcing. But it unblocks the team and produces something a customer can use. That's the mission.

---

**One condition:** Once we ship, I need the team to commit to NOT redesigning the architecture based on internal feedback. No rewrites, no "now that we understand it better" refactors. We're riding this thing for at least 2 weeks with paying users or credible validation before we touch the foundation. Agreed?
