# Day 10 — Plan: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Fatima (Planner)
- **Cycle:** 18
- **Saved:** 14/05/2026, 11:38:23 PM

---

FINISHED:
- Day 1 planning complete: requirements.md, design.md, engineering.md, test.md, review.md all written
- .env.example and Dockerfile in place (infrastructure skeleton)
- README.md with project scope documented

PENDING:
- No working URL yet — requirements say "ship by day 3" and we're at day 10 with no code deployed
- No Etsy API integration running live (engineering.md exists but no deployed connection)
- No CSV export tested against real seller data
- No customer validation run (scope says "validate with 2–3 Etsy sellers this week")

NEXT DAY FOCUS:
Ship a working localhost instance that connects to one Etsy seller's API key and renders a single order + one inventory item by end of day.

ROLE PLAN:
- engineering: YES — We are 7 days past the day-3 ship date with zero running code. Build the Etsy OAuth/API-key flow, orders table, inventory fetch. This is the only blocker.
- review: YES — Code review the API integration on merge; we need deployed production code today, not day 11.
- design: NO — We have design.md. Pixel-perfect UI is a day-5 problem; functional dashboard is today's problem.
- test: YES — Playwright test: user enters Etsy API key, sees at least one order row and one stock level render. This validates the scope.
- requirements: NO — Requirements are locked in day-01/requirements.md. Kenji ships code or debugs with Anil; he doesn't rewrite the spec.
- pm-status: YES — Daily standup only (5 min). We need to know if Anil is blocked on Etsy API docs or auth flow.
- sales: NO — We have zero customers yet. Post-MVP only.
- security: NO — No auth/data handling to audit until the API integration works. Day-6 task.
- finance: NO — No spend to track yet.
- risks: YES — Etsy API rate limits or auth complexity could spike the timeline. Hiroshi flags this by 10am or we're flying blind.

ONE-LINE SUMMARY:
Engineering ships localhost Etsy API connection + order/inventory render + Playwright validation today; review approves; we have 3 days left to hit the day-13 customer-validation deadline.
