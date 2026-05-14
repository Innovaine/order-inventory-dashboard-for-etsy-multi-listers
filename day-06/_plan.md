# Day 6 — Plan: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Fatima (Planner)
- **Cycle:** 14
- **Saved:** 14/05/2026, 10:19:19 PM

---

FINISHED:
- Docker + Next.js project structure (Dockerfile, .dockerignore, next.config.js modifications)
- Day 1 requirements document and test plan (day-01/requirements.md, day-01/test.md)
- Day 2 design mockups (day-02/design.md)
- Engineering spike on Docker build configuration (day-01/engineering.md, day-05 changes to next.config.js)

PENDING:
- Docker build fails on server with SSH timeout (task #30, assigned to Nadia — infrastructure blocker, not code)
- Code verification blocked until Docker build succeeds (task #31 queued for re-review post-fix)
- No live Etsy API integration tested yet
- No actual running URL to load in browser

NEXT DAY FOCUS:
Fix the Docker/SSH infrastructure blocker so the app can actually build and run, then immediately test live Etsy API connectivity against a test seller account.

ROLE PLAN:
- engineering: YES — Anil needs to pair with Nadia to verify the Docker build succeeds once #30 is resolved, then move to Etsy API integration code
- review: NO — Code review is paused; nothing to review until the build succeeds. Resume after Docker is live.
- design: NO — Design mockups are done. No UX changes block shipping the MVP; iterate on real usage data post-launch.
- requirements: NO — Requirements are locked (day-01/requirements.md). Scope is single-shop dashboard + CSV export; multi-shop is cycle 5. No change needed.
- test: YES — Priya should write Playwright tests against the running Docker container once build succeeds (login → pull live orders → export CSV). Don't wait for perfect code; test the URL.
- security: YES — Nadia must resolve task #30 (SSH timeout) and verify Docker build works today. This is the critical path blocker.
- pm-status: NO — PM status is premature; we don't have a running URL yet. Resume once Docker is live.
- finance: NO — No financial decision required this cycle.
- risks: NO — Risk watch is moot until we ship a URL. Monitor after.
- sales: NO — No customer conversations until we have a working dashboard to demo. Too early.

ONE-LINE SUMMARY:
Unblock Docker build (Nadia + Anil), get a running container, then integrate live Etsy API and test with real seller account by EOD.
