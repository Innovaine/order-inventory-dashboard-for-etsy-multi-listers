# Day 1 — Plan: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Fatima (Planner)
- **Cycle:** 5
- **Saved:** 14/05/2026, 1:43:21 PM

---

FINISHED:
- Idea approved by chairman (cycle 4 unlock); scope document in idea.md
- CEO decision memo (decisions/ceo-amara.md) + Chairman approval (decisions/chairman-rajesh.md)
- Staffing plan assigned (execution/staffing-nalini.md)
- Outreach list for Etsy seller validation ready (execution/outreach-tom-s.md)

PENDING:
- No code repository exists yet
- No design mockups or API integration plan
- No customer interviews conducted; validation target (2–3 Etsy sellers) not yet contacted
- No test harness or deployment environment

NEXT WEEK FOCUS:
Ship a working URL by day 3 that loads one Etsy seller's live orders and inventory via API key, shows data in a table, and exports CSV.

ROLE PLAN:
- engineering: YES — Build the URL and live Etsy API integration; this is the constraint path.
- design: NO — Single dashboard table is low-complexity; engineering can template it; design cycles slow us down before we know if sellers use it.
- requirements: YES — Lock down Etsy API read scope, CSV schema, and table column order with engineering by EOD today; no spec-writing, just clarify the three things that unblock code.
- code-review: YES — Anil ships fast; Søren reviews by EOD each day to catch integration bugs early.
- test: YES — Priya writes one Playwright test: "User pastes API key, sees live orders, exports CSV, file has correct columns." Run it against staging by day 2.
- security: NO — Pre-revenue, single API key auth, no user accounts yet; audit after we have paying customers.
- pm-status: YES — Kenji does a 15-minute daily standup; single job: are we on track for day-3 URL and do we have seller contact info ready for validation Friday?
- finance: NO — No budget spend decision needed this week.
- risks: YES — Hiroshi flags one thing: if Etsy API requires OAuth instead of API keys, we rebuild Friday. Call Etsy support today to confirm auth method; if it's OAuth, we pivot to CSV upload instead.
- sales: YES — Tomás reaches out to 4 sellers from outreach list by Wednesday; goal is 2 confirmations to test the URL Friday. This is not "selling"—it's scheduling validation.

ONE-LINE SUMMARY:
Engineering builds the URL + Etsy API integration in parallel with requirements lock and seller outreach; code review + test validate daily; risks calls Etsy support on auth today.
