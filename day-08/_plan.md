# Day 8 — Plan: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Fatima (Planner)
- **Cycle:** 16
- **Saved:** 14/05/2026, 10:39:05 PM

---

FINISHED:
- Docker + environment setup (Dockerfile, .env.example, .qadar-git.json)
- Day 1 requirements doc + design spec (day-01/requirements.md, day-01/design.md)
- Day 1 engineering plan + test plan drafted (day-01/engineering.md, day-01/test.md)
- Day 2 design work initiated (day-02/design.md exists)
- README + project metadata scaffolding (_meta.json, README.md)

PENDING:
- No live URL yet — day 3 deadline requires working Etsy API integration + dashboard render by EOD today
- Day 2 design.md incomplete — unclear if Figma/wireframes shipped or planning docs only
- No test cases written — Playwright suite needs to exist before code review can run
- Etsy API key handling untested — security implications of storing/validating keys not yet addressed

NEXT DAY FOCUS:
Ship a working localhost URL that accepts an Etsy API key, fetches live order + inventory data, and renders both in a readable table by end of day 8.

ROLE PLAN:
- engineering: YES — ship the API integration + basic dashboard render; this is the critical path to day 3 URL
- review: YES — code review must run today; unblocks engineering's next build cycle and catches security issues early
- design: YES — finalize the dashboard layout (Figma or HTML mockup); engineering needs pixel-perfect spec to avoid rework
- test: YES — write Playwright tests for "user can paste API key → sees orders and inventory"; tests must exist before review approves
- requirements: NO — requirements are locked (single-shop MVP, 2–3 sellers, CSV export); re-opening them burns the day
- pm-status: YES — Kenji needs to confirm: (1) which 2–3 Etsy sellers are lined up for validation, (2) do they have test API keys ready, (3) what's the fallback if API access fails
- security: YES — audit the API key storage pattern (env var vs. encrypted vs. database); catch XSS or injection vectors before day 3
- finance: NO — no financial decision needed yet; revisit if we need paid Etsy tier or third-party tools mid-week
- risks: YES — flag day 3 delivery risk if Etsy API docs are unclear or rate-limited; identify fallback (mock data, manual CSV import)
- sales: NO — validation happens with 2–3 existing contacts; sales outreach is cycle 5 work

ONE-LINE SUMMARY:
Lock design, ship working API integration + dashboard, write tests, and confirm validator lineup — everything else is noise until the URL loads.
