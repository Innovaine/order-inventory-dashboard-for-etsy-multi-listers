# Day 12 — Requirements: Order & Inventory Dashboard for Etsy Multi-Listers

## Goal today
Enable 2–3 real Etsy sellers to connect their shops and use the dashboard live; collect structured feedback on core workflows (sync, view inventory, export CSV, manual sync) to identify the next 2–3 high-impact features.

## Features in scope (seller onboarding & light instrumentation)
- **F1: Seller onboarding walkthrough** — Guided flow for first-time sellers: connect → view dashboard → export sample CSV
- **F2: Live URL + docs** — Dashboard accessible at production URL with one-page quickstart guide (no account signup, just API key input)
- **F3: Usage analytics events (light)** — Track 5 key moments: auth success, inventory loaded, order viewed, CSV exported, manual sync triggered
- **F4: Feedback collection form** — Lightweight modal/email prompt: "What's the top feature you're missing?" + optional email for follow-up

## Functional requirements (seller validation phase)

| ID    | Feature | Description | Acceptance criteria |
|-------|---------|-------------|---------------------|
| FR-1  | F1 | Sellers can complete onboarding flow without engineering help | Seller uses dashboard 2+ times in day 12, uses at least 2 of the 5 core features (view inventory, view orders, sync, export) |
| FR-2  | F2 | Dashboard URL is live and documented | Production URL accessible via curl; README.md includes "Quick Start for Sellers" section with 3 steps max (connect key, view data, export) |
| FR-3  | F3 | Analytics events fire for core workflows | POST /api/events logs [auth_success, inventory_loaded, order_viewed, csv_exported, manual_sync] with timestamp; events viewable in server logs or simple dashboard |
| FR-4  | F4 | Sellers are prompted to share top missing feature | Feedback form appears on dashboard (e.g., sticky banner or modal after 2 min session time) or via email after day 12; at least 1 seller provides feedback |

## Non-functional requirements

| ID     | Category | Requirement |
|--------|----------|-------------|
| NFR-1  | Reliability | Dashboard uptime ≥ 99% during day 12 (no unplanned downtime; planned maintenance 0 min) |
| NFR-2  | Performance | Analytics events fire within 100ms and do not block UI; dashboard remains <500ms render time |
| NFR-3  | Privacy | API keys stored in httpOnly cookies only; no keys logged in analytics events; no PII in event data |
| NFR-4  | Observability | All analytics events logged with timestamp + seller shop ID (anonymized); errors logged with context; inspector can query event log for debugging |
| NFR-5  | Usability | Onboarding flow has no jargon; error messages < 100 chars, actionable ("Your API key expired; get a new one at etsy.com/developers") |

## Stack (no changes from day 11)

- **Backend:** Node.js + Express/Fastify in TypeScript
- **Web frontend:** Next.js (App Router, TypeScript, Tailwind)
- **Database:** PostgreSQL (containerized, named volume)
- **Testing:** Playwright (browser automation) + curl (API)
- **ORM:** Prisma
- **Analytics:** Simple JSON logging to /tmp/analytics.log or Postgres events table (no external vendor)

## Out of scope (day 12 — do NOT build)

- **Multi-shop aggregation.** Still single-shop only. Feature request to prioritize day 13 if 2+ sellers ask.
- **User accounts / authentication system.** API key auth only; no email signup, no password reset, no SSO.
- **Advanced analytics.** No dashboards, no funnels, no cohorts. Event logging only; analysis manual.
- **Onboarding video / tutorials.** Text-based quickstart only. Video is post-revenue.
- **Email notifications.** No "new order" emails, no "sync failed" alerts. Sellers check dashboard manually.
- **Inventory editing / order fulfillment.** Read-only only. No "mark as shipped" in this app.
- **Export formats.** CSV only. JSON, Excel, Google Sheets are day 14+.
- **Performance optimization.** Already <500ms. Caching, CDN, DB indexing are post-revenue.

## Open questions (product owner: Kenji, please answer ASAP)

1. **Seller recruitment status.** Has outreach (Fatima/task #34) confirmed 2–3 sellers ready by EOD day 11? If not, what's the blockers?
   - **Decision needed by 9 AM day 12** to confirm engineering time is not wasted on features sellers don't need.

2. **Analytics backend preference.** Simple JSON logs to `/tmp/analytics.log` (zero infra, developer reads logs) OR lightweight Postgres events table (queryable, persists across restarts)?
   - **Recommendation:** JSON logs for day 12 (faster to ship). Move to DB table day 14 if we get >10K events/day.
   - **Decision:** Go with JSON logs.

3. **Feedback mechanism.** In-app form (modal on /dashboard after 2-min session time) OR post-testing email survey (simpler, less intrusive)?
   - **Recommendation:** Email survey for day 12 (less code, more honest feedback when sellers have cooled off). Add in-app modal day 14.
   - **Decision:** Email survey + optional feedback link in dashboard header.

4. **Seller handoff process.** Should engineer (Anil) do a 1:1 onboarding call with each of the 2–3 sellers, or is async walkthrough (email + docs) enough?
   - **Recommendation:** Async walkthrough only (email + one-page quickstart). Reserve 1:1 calls for when we have 5+ sellers or hit blockers.
   - **Decision:** Async walkthrough.

## Definition of done for day 12

- [ ] **Seller readiness confirmed:** Outreach (Fatima) has 2–3 sellers with valid API keys + at least 5 listings each; they have received the dashboard URL + quickstart guide by 9 AM
- [ ] **Quickstart docs exist:** README.md or `/docs/QUICKSTART.md` includes: how to get an Etsy API key, step-by-step dashboard walkthrough, how to export CSV, support email for blockers
- [ ] **Analytics logging implemented:** POST /api/events endpoint accepts `{ eventName, shopId, timestamp }` and logs to `/tmp/analytics.log`; no errors on event fires
- [ ] **Event tracking wired:** Dashboard fires events on: auth success, inventory load, order view, CSV export, manual sync (test via curl or browser console to verify events are logged)
- [ ] **Feedback mechanism ready:** Email template + dashboard footer link for "Send Feedback" pointing to feedback form (Google Form or simple email); no sellers blocked by missing feedback mechanism
- [ ] **Zero new bugs:** All day 11 Playwright tests still pass; no regressions in core 6 FRs from day 12 changes
- [ ] **Seller feedback captured:** By EOD day 12, at least 1 seller has provided feedback (either via form or email reply); feedback documented in `/feedback/day-12-sellers.md`

## For the engineer (Anil)

**Do:**
1. Create POST `/api/events` endpoint: accept `{ eventName, shopId }` → log to `/tmp/analytics.log` with ISO timestamp
2. Wire event tracking into dashboard component: on auth success, inventory load, CSV export, manual sync (see FR-3 for 5 event names)
3. Verify events fire without blocking UI (use async logging, no await)
4. Add "Send Feedback" link to dashboard header → points to feedback form (Google Form link or `mailto:` with pre-filled subject)
5. Create `/docs/QUICKSTART.md` with: Etsy API key setup, 3-step dashboard walkthrough, export steps, support contact
6. Deploy to production by 10 AM day 12
7. Send deployment confirmation to outreach (Fatima) so sellers can start testing

**Don't:**
- Add new database tables or migrations (use file logging only)
- Change any auth logic or add password reset
- Optimize perf (already good)
- Add user accounts or email signup

## For the tester (Tester role)

**Do:**
1. Verify analytics events fire on the happy path: auth → inventory view → CSV export → sync. Check `/tmp/analytics.log` contains all 5 event types
2. Run smoke test (day 11 Playwright suite) to confirm no regressions
3. Test feedback form link opens correctly (click "Send Feedback", verify it navigates to form or opens email client with pre-filled subject)
4. Spot-check QUICKSTART.md is clear and jargon-free (read it aloud; ask a non-technical friend if it makes sense)

## For outreach (Fatima/Tom)

**Do by 9 AM day 12:**
1. Confirm 2–3 Etsy sellers ready to test (already have valid API keys, have 5+ listings, can commit 15 min testing)
2. Send them the dashboard URL + `/docs/QUICKSTART.md` (engineer will provide by 10 AM)
3. Ask them to test: auth, view inventory, view orders, export CSV, use manual sync at least once each
4. Collect feedback (phone call, email, or Google Form) on: workflow fit, missing features, pain points
5. Record feedback in `/feedback/day-12-sellers.md` by EOD day 12
6. Flag any blockers to Kenji immediately (if sellers can't auth or dashboard crashes)

**Sellers should:**
- Have a valid Etsy API key ready
- Use the dashboard at least twice during day 12
- Test at least 2 core features (inventory view, export, sync)
- Provide one piece of feedback (feature request, bug report, or "looks good")

## For Kenji (product owner)

**Before 9 AM:**
1. Confirm seller recruitment status with Fatima (task #34). If not ready, escalate immediately.
2. Review and close the 4 open questions above (2-5 min total).

**During day 12:**
1. Monitor feedback as it comes in (Fatima will share via Slack or email).
2. Identify patterns: if 2+ sellers ask for the same feature, flag it for day 13 prioritization.
3. Capture any bugs in the task board (create tasks, don't expect engineer to guess from chat).

**By EOD:**
1. Read all 2–3 seller feedback summaries.
2. Decide: day 13 is [bug fixes | top 1–2 feature requests | multi-shop scaling].
3. Update requirements.md for day 13 by midnight for engineer to review.

## Summary

Day 12 is **seller validation day.** The product works end-to-end (all 11 tests passing). Now we find out if real sellers use it and what they're missing.

**Success = 2+ sellers actively use dashboard + provide actionable feedback by EOD.**

**Failure = 0 sellers test (recruitment blocked) OR sellers test but find critical bugs (engineer spends day 13 fixing, not building).**

Expected outcome: 1–2 feature requests (likely: multi-shop view, notification on order, smarter sync timing). No major bugs expected; day 11 validation was thorough.

---

## Day 12 Cycle Plan (5 calendar days: May 14–18)

- **May 14 (Tue):** Today. Engineer deploys analytics + feedback form. Outreach sends URL to 2–3 sellers by 10 AM. Sellers start testing.
- **May 15 (Wed):** Sellers testing. Feedback trickles in. Engineer on-call for critical bugs only.
- **May 16–18 (Thu–Sat):** Based on day 12 feedback, execute day 13 scope (bug fixes vs. features). Ship final day 13 by Friday EOD.

---

## Acceptance criteria summary (tester + reviewer checklist)

- [ ] Outreach confirms 2–3 sellers ready by 9 AM (task #34 complete)
- [ ] `/docs/QUICKSTART.md` exists, is clear, seller can auth without help
- [ ] POST `/api/events` endpoint created and tested via curl
- [ ] 5 event types fire (auth_success, inventory_loaded, order_viewed, csv_exported, manual_sync) without blocking UI
- [ ] Analytics log file exists and contains all events with timestamp + shop ID
- [ ] Feedback form link works (opens form or email client)
- [ ] Day 11 Playwright tests still pass (zero regressions)
- [ ] At least 1 seller provides feedback by EOD day 12
- [ ] Feedback captured in `/feedback/day-12-sellers.md` with actionable notes for day 13
