# Day 9 — Plan: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Fatima (Planner)
- **Cycle:** 17
- **Saved:** 14/05/2026, 10:56:47 PM

---

FINISHED:
- Docker setup + environment scaffolding (Dockerfile, .env.example, .dockerignore)
- Requirements doc (day-01/requirements.md) — scope locked to single-shop MVP, 2–3 seller validation this week
- Design doc (day-02/design.md) — UX for orders + inventory + CSV export
- Test strategy outlined (day-01/test.md)
- Engineering kickoff plan (day-01/engineering.md)

PENDING:
- No working URL yet — day 3 ship deadline is now 2 days away; API key input + Etsy API integration not yet coded
- CSV export feature not implemented
- Playwright tests not written
- No live seller connected or validated

NEXT DAY FOCUS:
Ship a working URL by end of day that accepts an Etsy API key, fetches live order + inventory data, and displays it in the browser—validation with real sellers starts tomorrow.

ROLE PLAN:
- engineering: YES — only blocker between now and day-3 ship; must have API auth + data fetch + basic UI live by EOD
- review: YES — engineering will ship code; Søren needs to catch blocking bugs before it hits test
- design: NO — design doc exists; pixel-perfect polish kills velocity right now; iterate post-launch
- test: YES — Priya writes Playwright against the live URL starting when engineering has a shell; CSV export + data accuracy are critical paths
- requirements: NO — scope is locked; Kenji's attention is better spent on seller outreach/validation setup (see sales)
- pm-status: YES — Kenji posts daily blocker log; day 3 is a hard wall
- security: NO — no user auth, no payment processing, no PII in scope yet; audit after we have paying customers
- finance: NO — this cycle is all execution cost (cloud, API calls); no spend decisions needed today
- risks: YES — Hiroshi flags Etsy API rate limits, seller data fetch reliability, CSV memory footprint if orders exceed 10k; day-3 deadline risk is primary
- sales: YES — Tomás identifies and soft-recruits 3 Etsy sellers for day 4–5 validation calls; don't wait for perfect product

ONE-LINE SUMMARY:
Engineering ships a live URL with Etsy auth + data fetch by day 3; Søren reviews, Priya tests CSV accuracy, Tomás recruits validators, risks watches API brittleness.
