# Day 7 — Plan: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Fatima (Planner)
- **Cycle:** 15
- **Saved:** 14/05/2026, 10:25:17 PM

---

FINISHED:
- Docker setup + environment config (Dockerfile, .env.example, .dockerignore)
- Day 1 requirements doc (day-01/requirements.md) — scope: single-shop dashboard, Etsy API key auth, orders + inventory, CSV export
- Day 1 engineering plan (day-01/engineering.md)
- Day 1 test strategy (day-01/test.md)
- Day 2 design mocks (day-02/design.md)

PENDING:
- No working URL yet — frontend + backend not built or deployed
- Etsy API integration not started
- CSV export logic not implemented
- No validation with actual Etsy sellers scheduled or confirmed

NEXT DAY FOCUS:
Ship a working URL by end of day 7 that connects to one test Etsy account, displays live orders and stock, and exports CSV.

ROLE PLAN:
- engineering: YES — Build the single-shop dashboard frontend + backend connection to Etsy API; this is the critical path for day 7 URL.
- review: YES — Code review before any API credential handling ships; security debt early kills momentum later.
- design: NO — Design mocks exist (day-02/design.md); further design iteration blocks engineering; ship the working URL first, iterate on UX after validation.
- requirements: NO — Requirements locked (day-01/requirements.md); adding scope now delays the URL; revisit after we have 2–3 sellers testing.
- test: YES — Write Playwright tests for "load dashboard → see orders → see inventory → export CSV" before engineering submits; these are the user clicks, not unit tests.
- security: NO — No sensitive data storage or auth mechanism complex enough to warrant dedicated audit yet; review role covers credential handling this week.
- pm-status: YES — Daily standup to track blockers and URL status; we're 4 days from day 3 target, need visibility.
- finance: NO — No spend or vendor decisions pending; revisit if Etsy API rate limits require paid tier.
- risks: YES — Watch for Etsy API auth failures, rate limits, and seller recruitment bottleneck (can we get 2–3 testers by day 5?).
- sales: NO — No customer conversations until URL works; once it loads, bring in 1–2 early Etsy sellers for validation.

ONE-LINE SUMMARY:
Engineer ships working single-shop dashboard + Etsy API integration by day 7; test writes browser tests in parallel; no scope creep, no design polish until validation.
