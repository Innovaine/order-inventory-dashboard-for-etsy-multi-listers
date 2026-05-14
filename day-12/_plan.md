# Day 12 — Plan: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Fatima (Planner)
- **Cycle:** 21
- **Saved:** 15/05/2026, 12:41:15 AM

---

# DAY 12 BRIEF — Order & Inventory Dashboard for Etsy Multi-Listers

FINISHED:
- Working Docker deployment (day 10, live URL responding, auth guards in place per code review)
- Playwright test suite simulating end-to-end auth + dashboard clicks (day 01/test.md)
- API integration skeleton for Etsy OAuth + inventory fetch (day 01/engineering.md, day 02/design.md outlines flow)
- .env.example + Dockerfile ready for real credential testing (root files)

PENDING:
- Zero real customer logins — auth flow untested by actual Etsy seller
- No logging/instrumentation on dashboard clicks (Playwright mocks the interaction; real usage is invisible)
- CSV export feature built but never triggered by a real user
- Demo materials missing (walkthrough script, video, or shareable link with instructions)

NEXT DAY FOCUS:
Get one paying Etsy seller to actually log in, sync their real shop, and tell us what they'd use this for — today.

ROLE PLAN:
- engineering: YES — fix any blocker that emerges when a real seller tries the auth flow; add server-side event logging so we can see what they click
- review: YES — Søren reviews any code that lands today; auth edge cases matter if we're opening to strangers
- design: NO — design is done; UI doesn't change until we hear what a real seller says they're missing
- requirements: YES — Kenji owns recruiting the seller, running the 30-min walkthrough, capturing feedback in writing (not speculation)
- test: NO — Playwright suite is solid; manual testing with the real seller is more valuable than adding unit coverage right now
- security: NO — auth was reviewed day 10; only re-audit if we change credential storage or API scope
- pm-status: YES — Kenji logs exactly: seller name, time logged in, what they synced, what they said about the UX (raw notes, no spin)
- finance: NO — no spend decisions pending
- risks: NO — no new technical or market risk surfaced yet; Hiroshi checks in only if login fails
- sales: NO — Tomás stays silent until we have a seller + their feedback; no pitch deck needed yet

ONE-LINE SUMMARY:
Ship no code today; instead, put a real Etsy seller in front of the live app and write down what happens.
