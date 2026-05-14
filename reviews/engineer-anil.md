# Engineer review: "Order & Inventory Dashboard for Etsy Multi-Listers"

- **By:** Anil (Engineer)
- **Cycle:** 4
- **Saved:** 14/05/2026, 12:46:12 PM

---

I'm going to be direct because this matters and I have to write the code.

**1. How long the first usable version really takes**

Week 1–2: Auth flow (Etsy API key input, token exchange, secure storage), one shop's inventory pull, one shop's recent orders, basic table UI. You're live with *something* loadable by end of day 5. Call it usable by day 7.

Week 3: Multi-shop sync (just add the loop—pull from 2, 3, 5 shops in sequence). CSV export per shop. Real-time button (no actual polling yet). Week 3 end: defensible.

Week 4: This is where it gets honest. You need:
- Actual polling (background job that doesn't crash when you have 50 shops pulling every 5 minutes)
- Conflict handling (user edits inventory locally, Etsy updates server-side, what wins?)
- Latency (Etsy API has rate limits; pulling 5 shops fresh takes 15–30 seconds)
- Error state UX (API key expires, rate limit hit, shop deleted, what does the user see?)

You don't hit a *wall* at week 4 the way tax/expense ideas do. You hit a *ceiling*. The feature works. But it's slow, brittle, and you'll spend weeks 5–8 patching edge cases instead of shipping defensible revenue logic.

**Honest timeline for a paying customer:**
- Day 7: usable (3–4 sellers can test)
- Day 14: defensible (polling works, no crashes in light load)
- Day 28+: revenue-ready (handles 100+ shops, rate limiting, conflict resolution, auth rotation)

**2. Where you'd hit a wall**

Three places:

**A. Etsy API rate limits.** Etsy throttles aggressively. Pulling fresh data from 10 shops hits rate limits fast. You can't refresh every 5 minutes for more than ~3 users. By week 4, you need:
- Smart polling (pull inventory more often, orders less often)
- Caching strategy (cache for 30 min, show staleness indicator)
- Queue system (background job that doesn't block the UI)

That's a week of work. Not a wall. But it's work.

**B. Inventory conflict resolution.** Here's the scenario: User sees 5 units in our dashboard. They sell 2 directly on Etsy. We haven't synced in 30 minutes. They create a shipment in our dashboard for 5. Now they're oversold. What do we do?

You can ignore this for v1 (show: "last synced 30 min ago, may be stale"). But the moment you claim "real-time," you're liable for bad data. That's a liability wall, not a build wall—but it matters.

**C. Etsy API auth rotation.** Etsy tokens expire. Handling rotation without losing user data is straightforward, but the error states are messy. User comes back Tuesday, half their shops are disconnected, they see an error they don't understand. Week 5 work.

**None of these are showstoppers.** But they're not "cut this feature" walls either. They're "spend more time than you think" walls.

**3. What I'd cut from the spec**

Cut:
- **Restocking notifications.** ("Alert me when inventory drops below X.") That's a database schema + email infra + tuning. Week 5 scope creep. Drop it.
- **Manual inventory edit + sync back to Etsy.** (Let users edit in our dashboard, push to Etsy.) You don't need it. Users can edit in Etsy directly; our dashboard is read-only visibility. Saves a week of auth complexity and conflict handling.
- **Historical reports / trends.** ("Show me which shop's inventory moved fastest.") No. Ship the current state first.
- **Bulk actions across shops.** ("Archive all listings with zero inventory.") No. One shop at a time.

What you keep:
- Auth (non-negotiable)
- Multi-shop pull (core)
- Real-time refresh button (not polling, just a "sync now" button)
- CSV export per shop (one line of code)
- Error states (auth fail, rate limit, bad key)

**4. Which existing tools/libraries save a month**

I need to be honest: this idea is good *because* Etsy's infrastructure already exists. You're not building a marketplace. You're building a dashboard around their API. That's rare and valuable.

**Libraries that ship you fast:**

- **Etsy Open API SDK (JavaScript/Node).** They publish it. Use it. Don't write your own API client. Saves 3–4 days of auth debugging.
- **Bull or node-cron for polling.** Don't roll your own job queue. Bull (Redis-backed) is industry standard. One weekend to integrate. Saves 5 days of "why is my polling breaking when the server restarts?"
- **Prisma or Drizzle for schema.** You need: users, shops (with API keys), inventory snapshots, order snapshots. Prisma scaffolds this in a day. Saves 3 days of schema design.
- **TanStack Query (React Query) for client-side caching.** Etsy data is read-mostly. Query handles stale-while-revalidate automatically. Saves 2 days of "why is my UI showing old data?"
- **Vercel/Railway for deploy.** You need background jobs running. Vercel + cron is simplest. Saves 1 day of infrastructure setup.

**What I'd buy vs. build:**
- Auth (use NextAuth or Clerk with custom Etsy provider). Don't roll your own.
- Secrets storage (use your platform's built-in—Vercel has it, Railway has it). Don't store API keys in the database unencrypted.

**Stack I'd use:**
- Next.js (API routes + frontend in one)
- Prisma
- Bull for background jobs (Redis backend)
- Etsy SDK
- TanStack Query
- Vercel or Railway

Deploy day 1. Add second shop on day 3. Add polling on day 5.

---

**Real talk on the broader picture:**

You've flagged this as "avoids liability and validation walls." That's true—and it matters. Tax ideas hit regulatory walls (you need a CPA). Marketplace ideas hit payment walls (you need a payment processor). This avoids both.

But I'm concerned about one thing: **Etsy could break this in a week.** They could change their API, tighten rate limits, or deprecate endpoints. You're building on someone else's platform, which is fast but fragile. By day 21, you'll know if this is real or not. If three Etsy sellers say "yes, I'd pay $10/month for this," ship it. If they say "meh, it's nice but I don't need it," kill it. Don't spend week 5 polishing.

**I'd ship it.** It's week 1–2 defensible, week 3 usable with paying customers if the demand is there. And we need the win.

But I'm not going to pretend the rate-limit problem or the conflict-resolution problem don't exist. They do. You patch them week 4 if you have a customer. If you don't, you don't.

What's the validation plan? Who are the 3–5 sellers you're calling this week?
