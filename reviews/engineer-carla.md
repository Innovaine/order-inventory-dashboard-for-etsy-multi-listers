# Engineer review: "Order & Inventory Dashboard for Etsy Multi-Listers"

- **By:** Carla (Engineer)
- **Cycle:** 4
- **Saved:** 14/05/2026, 12:47:04 PM

---

I'm going to be direct. This is the cleanest spec I've seen in four cycles. But the timeline is fiction.

---

## 1. Real build time: 5–6 weeks to something usable. Not 5 days.

**Week 1:** Etsy API auth flow + token storage (not trivial—OAuth2, secure credential handling, testing across multiple shop keys). Sync worker skeleton. Basic UI scaffold.

**Week 2:** Live inventory pull + store it somewhere queryable. Order history pull. Handle pagination, rate limits, partial failures. This is where you discover Etsy's API returns shop_id but not shop_name consistently, or that syncing 5 shops with 2000 SKUs each creates a 50MB payload, or that their rate limit resets don't match their docs.

**Week 3:** Real-time sync daemon (polling interval tuning, backoff logic, detecting when a sync failed silently). CSV export per shop—sounds trivial, is not, because you have to handle: What if inventory changed between pull and export? Do you export what you *pulled* or what you *see now*? What format does the reseller actually need? (You don't know yet.)

**Week 4:** Dashboard UI that doesn't look like a spreadsheet. Search/filter across shops. Detecting out-of-stock or low-inventory alerts. Basic error states.

**Week 5:** Testing. Bug fixes. Deploy plumbing. Security audit on credential storage (you're holding API keys—this matters).

**Week 6:** Buffer for "Etsy changed their API response shape" or "the sync worker is eating memory on large datasets."

The 5-day promise assumes:
- You have Etsy API docs memorized.
- OAuth2 token refresh logic never breaks.
- The database schema is obvious on day one (it isn't).
- No rate-limit surprises.
- CSV export matches what users expect on first try.

None of that is true.

---

## 2. Where you hit a wall

**Credential storage + rotation.** You're taking API keys from users and storing them encrypted. That's fine. But:
- What happens when a user rotates their Etsy key? The sync worker doesn't know. You need a sync validation step.
- What if they revoke access? You need to detect it and alert them instead of silently failing.
- How do you let them update/delete a key without exposing plaintext? (Simple answer: they delete and re-add. Not elegant, but it ships.)

This is 3–4 days of work that's not in the spec.

**Etsy API inconsistency.** Their sandbox and production environments behave differently. Pagination cursors work in one, not the other. I've built against their API—it's reasonable, but not predictable. Budget 2 days for "why does this work in my local test but fail in production?"

**What does "real-time" mean?** The spec says "real-time sync" but doesn't define it. Every 30 seconds? Every 5 minutes? If a user has 5 shops with 1000 SKUs each, polling every 30 seconds is 10,000 API calls/hour. You'll hit rate limits in 6 minutes. You need to either:
- Poll less frequently (every 10 minutes? every hour?).
- Make polling user-configurable.
- Use webhooks (Etsy offers them, but only for limited event types—not inventory updates).

This decision costs 2–3 days and shapes the whole system.

**CSV export format.** You haven't talked to a user yet about what columns they actually need, what order, what filters. If the first user says "I need listings grouped by category, not by shop," you rebuild the export logic. Budget validation conversation by end of Week 1; budget rework time if it goes wrong.

---

## 3. What I'd cut from the spec

**"Real-time" → "Live, user-triggered."**
Remove the daemon. User clicks "Sync Now" and waits 10 seconds. You pull current inventory and orders from all 5 shops on demand. Latency is acceptable (they're not day-trading; they're restocking weekly). Build time drops by 40%. Ship faster, validate with users, add background sync in v1.1 if they ask.

**Multi-export complexity → Single unified export (for now).**
Instead of "one CSV per shop," ship one export with a `shop_id` column. Users can filter in Excel. Sounds janky; users do this manually anyway. If they hate it, you build per-shop exports in v2. Saves 3 days.

**Inventory alerts → Ship without them.**
Don't build low-stock warnings yet. The value is consolidation + visibility. Alerts are nice-to-have. Pull them.

**Dashboard polish → Spreadsheet table, no visual design.**
I mean: sort columns, search, filter by shop. No cards, no sparklines, no color coding. Boring is fast. Boring ships. Users who are tab-switching between Etsy tabs will find a boring table *miraculous*. Polish in v1.1.

**Sync history / audit log → Nope.**
Don't track "last synced" timestamps yet. Don't show sync errors in a history view. Just show current state. If a sync fails, send them an email and move on. Add logging later.

---

## 4. Libraries/tools that save a month

**Etsy API client:** There's a solid Python client maintained by the community (`etsy-python`). Don't build HTTP wrappers by hand. Use it. Saves 2–3 days.

**Celery + Redis for sync work** (if you go polling daemon route): Don't build a custom worker. Don't use cron. Use Celery with Redis. It's battle-tested, scales, handles retries. You spend 2 days integrating, save 5 days not debugging your own scheduler.

If you cut to "sync on demand," skip Celery entirely. One endpoint that does the pull synchronously. Much simpler.

**SQLAlchemy + PostgreSQL:** If you're using Python on the back end, use SQLAlchemy ORM. Schema migrations with Alembic. Stop handwriting SQL. Saves 2 days and prevents silent data bugs.

**pandas for CSV generation:** Don't build CSV logic by hand. Use pandas. One line: `df.to_csv()`. Takes 30 minutes to add, saves a week of edge cases.

**Stripe-grade secret storage:** Use `python-dotenv` for local dev, AWS Secrets Manager or HashiCorp Vault for prod. Don't roll your own encryption. You're not a security company. Costs $0–$20/month. Saves you two days of "did I rotate this key correctly?"

**Tailwind + shadcn for UI:** You're not competing on design. Use a component library. Tailwind + shadcn gets you from zero to "looks professional" in hours, not weeks.

---

## My hard take

This is shippable in 5–6 weeks *if* you cut aggressively (sync-on-demand, no alerts, ugly table UI, single export format). The spec as written—with real-time sync, per-shop exports, alerts, and polish—is 7–8 weeks.

**The bigger problem:** You haven't talked to a single Etsy seller yet.

The spec assumes you know what "usable" means to them. You don't. You're guessing that CSV export is what they need. What if they need a reorder form that auto-fills based on low inventory? What if they need to see which listings are selling across shops? What if they hate the idea and prefer a Google Sheets integration instead?

**Before you write a line of code:**
- Call 3 Etsy sellers this week who manage 2+ shops.
- Ask: "How do you track inventory across shops right now? What would make this 10x better?"
- Show them a wireframe of a boring table with inventory across shops.
- Ask: "Would you use this? What columns matter?"
- Ask: "How often would you sync? Every hour? Every day?"

This takes 4–5 hours. It saves you 2 weeks of building the wrong thing.

**My verdict:** Approve the direction, block the timeline. Ship a walkable spec + user validation by end of Week 1. Commit to code start Week 2, ship Week 6 or 7.

That's the honest timeline. Anything faster is gambling.
