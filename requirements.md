# Day 11 — Requirements: Order & Inventory Dashboard for Etsy Multi-Listers

## Goal today
Unblock Playwright testing by creating missing config, run the full test suite to verify all 6 FRs work end-to-end, capture evidence for stakeholder validation, and prepare for seller testing starting tomorrow.

## Features in scope (validation phase)
- **F1: Etsy API key input & authentication** — Verify form accepts keys, rejects invalid keys with clear error message within 2 seconds
- **F2: Inventory display** — Verify table loads with 10+ items, sorts by quantity ascending, highlights low-stock (<5) items
- **F3: Recent orders display** — Verify orders table displays 5+ orders with correct columns (Order ID, Item, Qty, Status, Date) sorted by date descending
- **F4: CSV export** — Verify button triggers download with correct filename pattern and valid CSV format
- **F5: Sync status & error handling** — Verify status indicator displays last sync time, manual "Sync now" button works, error messages show on API failures
- **F6: Mobile-responsive layout** — Verify dashboard renders correctly on 390px mobile viewport without horizontal scroll; buttons are 44px+ tap targets

## Functional requirements (acceptance criteria for day 11 testing)

| ID    | Feature | Description | Acceptance criteria |
|-------|---------|-------------|---------------------|
| FR-1  | F1 | Playwright test: form submission with invalid API key shows error within 2 seconds | `tests/web/dashboard.spec.ts` test "FR-1: User can enter API key" passes; screenshot captured showing error message |
| FR-2  | F2 | Playwright test: inventory table displays with at least 10 items sorted by quantity | Inventory table visible; rows display SKU, Title, Qty, Price columns; items with qty < 5 are highlighted yellow/red |
| FR-3  | F3 | Playwright test: orders table displays at least 5 orders sorted newest first | Orders table visible; columns include Order ID, Item Title, Quantity, Status, Date; sorted by date descending |
| FR-4  | F4 | Playwright test: CSV export button triggers file download | Button click initiates download; filename matches pattern `inventory-[SHOPNAME]-[DATE].csv`; file is valid CSV (comma-separated, quoted fields) |
| FR-5  | F5 | Playwright test: sync status shows timestamp and manual sync button works | Status text shows "Last synced: X minutes ago" or similar; "Sync now" button completes within 2 seconds and triggers data refresh |
| FR-6  | F6 | Playwright test: mobile viewport 390px renders without horizontal scroll | Page fits within 390px width on iPhone 12 viewport; all buttons are tap-sized (≥44px); sections stack vertically, no overflow |

## Non-functional requirements

| ID     | Category | Requirement |
|--------|----------|-------------|
| NFR-1  | Testing | `playwright.config.ts` exists and Playwright test suite runs successfully; all 11 test cases in `tests/web/dashboard.spec.ts` execute without configuration errors |
| NFR-2  | Performance | API endpoints (inventory, orders, sync) respond within 2 seconds; dashboard renders within 500ms of receiving responses |
| NFR-3  | Observability | All test runs produce screenshot evidence in `test-results/` directory organized by FR; failed tests include error logs and stack traces |
| NFR-4  | Browser support | Tests run on Chromium; Chrome and Safari latest 2 versions supported (per day 1 spec) |

## Stack (from day 1 — no changes)

- **Backend:** Node.js + Express/Fastify in TypeScript
- **Web frontend:** Next.js (App Router, TypeScript, Tailwind)
- **Database:** PostgreSQL (containerized, named volume)
- **Testing:** Playwright (browser automation) + curl (API)
- **ORM:** Prisma
- **UI library:** shadcn/ui
- **Data fetching:** TanStack Query (React Query)

## Out of scope (day 11)

- **New features.** Day 11 is validation-only. No new inventory views, filtering, analytics, or multi-shop support yet.
- **Authentication improvements.** API key auth is as designed in day 1. Full OAuth rotates to cycle 5 post-revenue.
- **Performance optimization.** We hit 2s perf target in day 9. Micro-optimizations (caching, CDN) are post-revenue.
- **Inventory editing.** Read-only dashboard. Sellers edit in Etsy; we fetch and display.
- **Email/SMS/webhook notifications.** No alerts yet. Notifications are cycle 5 if validation demands.

## Open questions (product owner: Kenji, please answer before EOD)

1. **Etsy API sandbox vs. production keys.** Should our 2–3 test sellers use real API keys connected to their live shops, or should we create sandbox testing environments first? (Recommendation: real keys + real data = better validation signal, but requires direct seller conversations. **Decision: Go live with real sellers.**) **Action:** Fatima/outreach team confirms 2–3 sellers ready to test by end of day.

2. **Session timeout and re-authentication.** What's the session TTL for a stored API key? Should we force re-entry after 24 hours / 7 days, or keep the session indefinite until the seller explicitly disconnects? (Recommendation: 7 days to reduce friction in week 1. Post-revenue, move to tighter security.) **Decision needed for auth token expiry logic.**

3. **Error recovery for stale data.** If a sync fails (Etsy API down, rate limit, invalid key), do we show the last good data with a "stale" warning, or do we show "data unavailable"? (Recommendation: show cached data + warning. Better UX than blank dashboard.) **Verify SyncStatus.tsx implements this.**

## Definition of done for day 11

- [ ] **Unblock testing:** `playwright.config.ts` created in project root; engineer confirms no config errors
- [ ] **Run test suite:** All 11 Playwright tests execute (FR-1, FR-1b, FR-2, FR-2b, FR-3, FR-3b, FR-4, FR-5, FR-5b, FR-6, NFR-1)
- [ ] **Capture evidence:** Screenshots exist for each test case in `test-results/day-11/` directory
- [ ] **Test results document:** `test-results/day-11/report.md` includes:
  - Test run summary (passed / failed / skipped counts)
  - Per-test results with screenshots
  - Any failures and root causes
  - Confirmation that all 6 user-facing features work end-to-end
- [ ] **Seller readiness:** Outreach (Fatima/Tom) confirms 2–3 Etsy sellers ready for live testing starting tomorrow (day 12)
- [ ] **No new blockers:** App remains deployed on day 11; curl tests confirm all API endpoints still responding correctly

## For the engineer (Anil)

1. Create `playwright.config.ts` in project root with baseURL set to your deployment URL (staging or production)
2. Run: `npx playwright test --reporter=list` to execute all tests in `tests/web/dashboard.spec.ts`
3. If tests fail: debug and fix the app code (not the test code); re-run until all pass
4. Commit the test results and any fixes by EOD

## For the tester (you)

1. After engineer confirms Playwright runs: review all test screenshots in `test-results/day-11/`
2. For each failed test: verify if it's a legitimate bug (app broken) or a test issue (bad selector, wrong assertion)
3. Document root causes in `test-results/day-11/report.md`
4. Confirm all 6 user-facing features work; if any feature is broken, create a bug task for engineer to fix today

## For outreach (Fatima/Tom)

By EOD today: confirm 2–3 Etsy sellers are ready to test the live dashboard starting day 12. They should have:
- A valid Etsy API key (no sandbox — real data)
- At least 5 listings in their shop
- At least 1 recent order in the last 30 days
- 15 minutes free for a quick walkthrough + feedback call on day 12

---

## Summary

Day 11 is **validation day.** The app shipped on day 9 and passed a manual curl review on day 10. Today's work is to:
1. Unblock Playwright testing (missing config file)
2. Run the full test suite end-to-end
3. Confirm all 6 core features work in a real browser
4. Prepare 2–3 real sellers for live testing tomorrow

Success = all tests pass + seller testing ready to start by day 12.
