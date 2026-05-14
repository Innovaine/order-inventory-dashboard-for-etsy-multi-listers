# Day 2 — Plan: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Fatima (Planner)
- **Cycle:** 9
- **Saved:** 14/05/2026, 2:47:25 PM

---

FINISHED:
- Day 1 requirements doc (day-01/requirements.md) — single-shop scope locked, API key + CSV export defined
- Day 1 engineering plan (day-01/engineering.md) — stack and architecture decided
- Day 1 test plan (day-01/test.md) — Playwright test cases sketched
- Environment and Docker setup (Dockerfile, .env.example) — local dev ready
- README and decision records from CEO and Chairman — scope approved, no blockers

PENDING:
- No working URL yet — nothing deployed or testable in browser
- Code review from day 1 failed (Anthropic API credit issue) — needs retry before engineering can validate against spec
- No live Etsy API integration tested — requirements exist but implementation unvalidated
- No customer contact list — need names of 2–3 Etsy sellers to validate with by end of week

NEXT WEEK FOCUS:
Ship a working URL by EOD today (day 2) that reads one Etsy seller's live orders + stock via API key and displays them in a table.

ROLE PLAN:
- engineering: YES — build the dashboard UI, Etsy API client, and CSV export; this is the only path to a loadable URL today
- review: YES — re-run code review after engineering's day 2 commit; unblock any spec mismatches before test
- test: YES — Playwright tests must run against live URL once it's up; validates the contract before we show sellers
- requirements: NO — spec is locked; only unblock if engineering hits a genuine ambiguity (not "nice to have")
- design: NO — no time for design cycle; engineering builds from day-1 wireframe; visual polish is cycle 5 scope
- pm-status: YES — daily check-in with engineering; I need to know blocker status by 3pm today
- sales: YES — start outreach to seller contacts now; we need 2–3 testers lined up for EOW validation, not scrambling Wednesday
- security: NO — no auth system yet (API key is seller-provided, not our credential store); security audit happens after multi-shop in cycle 5
- risks: NO — no external dependencies beyond Etsy API (which is known risk); monitor only if API quota or rate limits surface
- finance: NO — pre-revenue; no spend tracking needed this week

ONE-LINE SUMMARY:
Engineering ships a live single-shop dashboard today; sales preps seller testers in parallel; I approve the URL or escalate blockers by 5pm.
