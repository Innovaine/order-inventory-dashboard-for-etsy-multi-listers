# Day 11 — Plan: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Fatima (Planner)
- **Cycle:** 20
- **Saved:** 14/05/2026, 11:55:31 PM

---

FINISHED:
- Day 9 shipped a working URL: Etsy API integration + auth guard + Docker deployment running (no new code day 10, but app verified live)
- Proof of life: `day-10/review.md` confirms containers healthy, API responding, deployment stable
- `day-01/requirements.md`, `day-01/engineering.md`, `day-02/design.md` exist; day 9 produced running application
- CSV export capability exists (per scope); orders + inventory endpoints wired

PENDING:
- No testing coverage documented yet — unclear if 2–3 Etsy seller validation has started or is scheduled
- No PM status briefing from previous days (day-01 through day-10 have no pm-status artifacts in warehouse)
- Unknown: whether the URL is actually accessible to external users or locked behind auth in a way that blocks seller onboarding

NEXT DAY FOCUS:
Get the first real Etsy seller (not internal test) to log in, pull live data, and confirm the dashboard matches their workflow — that's validation, not more polish.

ROLE PLAN:
- engineering: NO — app is running; no new code needed until sellers report friction
- review: NO — nothing to review until engineering ships new code
- design: NO — scope is single-shop MVP; no multi-shop complexity yet, design debt can wait
- requirements: YES — clarify exactly which 2–3 sellers are target for this week's validation, get their email/contact, confirm onboarding path works end-to-end
- test: YES — write Playwright test that simulates a seller logging in via API key, fetching orders, exporting CSV; confirm UI is usable, not broken
- security: NO — auth guards logged as in place day 10; no new threat surface until multi-shop
- pm-status: YES — first status briefing; document where sellers are in onboarding pipeline, whether we have confirmed test users, blockers to validation starting today
- finance: NO — no budget decisions needed this week
- risks: YES — flag the risk that if no seller will test this week, we don't validate PMF by end of cycle; escalate to exec if pipeline is empty
- sales: NO — selling comes after validation signals; don't start outbound

ONE-LINE SUMMARY:
Shift from shipping code to shipping a seller-facing login: confirm 2–3 test sellers are ready to validate this week, write Playwright coverage for the happy path, and document what's actually blocking them from using it live.
