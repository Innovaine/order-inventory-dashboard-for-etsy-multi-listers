# Day 2 — Test Report

**Tester:** Priya  
**Date:** 14/05/2026  
**Cycle:** 5  
**Project:** Order & Inventory Dashboard for Etsy Multi-Listers

---

## Verdict: BLOCKED

The application cannot be built or tested because the Docker build fails due to missing `package-lock.json`. The engineer hit their 40-step budget before generating this file, and the Dockerfile's `RUN npm ci` command requires it.

**Blocker:** Task #24 (FIX FIRST: Generate package-lock.json for Docker build) must be completed before any tests can run.

---

## What I tested

- **Tool:** Playwright (prepared but not executed)
- **Test files written:** `tests/web/dashboard.spec.ts` (10KB, covering all 6 FRs + NFR-1)
- **Commands attempted:**
  ```bash
  cd ~/order-inventory-dashboard-for-etsy-multi-listers && docker compose up -d
  ```

---

## Results

### Build attempt

**Command:**
```bash
docker compose up -d
```

**Output:**
```
#13 [deps 4/4] RUN npm ci
#13 0.661 npm error code EUSAGE
#13 0.661 npm error
#13 0.661 npm error The `npm ci` command can only install with an existing package-lock.json or
#13 0.661 npm error npm-shrinkwrap.json with lockfileVersion >= 1. Run an install with npm@5 or
#13 0.661 npm error later to generate a package-lock.json file, then try again.
...
ERROR: command exited 1
```

**Root cause:** The repo contains `package.json` but no `package-lock.json`. The Dockerfile step `RUN npm ci` explicitly requires a lockfile for reproducible builds.

**Impact:** 
- Cannot build the Docker image
- Cannot start the Next.js app
- Cannot run any Playwright tests
- All 6 functional requirements remain untested

---

## Evidence

### Test spec prepared
- **Path:** `tests/web/dashboard.spec.ts`
- **Coverage:**
  - FR-1: API key input & validation (2 tests)
  - FR-2: Inventory display, sorting, rate limit handling (2 tests)
  - FR-3: Orders display, empty state (2 tests)
  - FR-4: CSV export download (1 test)
  - FR-5: Sync status & manual sync (2 tests)
  - FR-6: Responsive mobile layout (1 test)
  - NFR-1: Performance budget validation (1 test)

### Build failure log
- **Path:** `server-runs/2026-05-14T12-00-42-app-cd-order-inventory-dashboard-for-etsy-mu-1.log`
- **Error:** `npm ci` requires package-lock.json

### No screenshots available
No application to screenshot — the app never started.

---

## What to fix next round

**Engineer (Anil) must complete these tasks in order:**

1. **Task #24:** Generate `package-lock.json` by running `npm install` locally and committing the file.
   - This unblocks the Docker build.

2. **Task #25:** Initialize database schema with `prisma migrate` in docker-compose or startup script.
   - Without this, the app will crash on first API call when trying to query an empty database.

3. **Task #26:** Create PrismaClient singleton to avoid connection pooling errors.
   - Prevents "Can't reach database server" errors under load.

4. **Task #27:** Fix SessionStorage vulnerability in dashboard auth flow.
   - Security issue flagged by reviewer — API keys stored in sessionStorage are accessible to XSS.

**After these fixes, I can:**
- Re-run the docker compose build
- Execute the full Playwright test suite (12 tests covering all 6 FRs)
- Verify each functional requirement against the running app
- Provide pass/fail verdict with screenshots

**Estimated re-test time:** 30 minutes once the app builds successfully.

---

## Test spec quality notes (for next round)

The test spec I wrote (`tests/web/dashboard.spec.ts`) is realistic and follows the requirements doc:

- **FR-1 tests:** Check for API key input, submit button, error message on invalid key (2-second timeout per spec).
- **FR-2 tests:** Verify inventory table has SKU/Title/Qty/Price columns, check for 10+ items, validate sorting.
- **FR-3 tests:** Verify orders table with 5 required columns, check "No orders" placeholder.
- **FR-4 test:** Trigger CSV download, verify filename matches `inventory-[SHOPNAME]-[DATE].csv` pattern.
- **FR-5 tests:** Check sync status displays "Last synced: X minutes ago", manual sync button works.
- **FR-6 test:** Mobile viewport (390x844), verify no horizontal scroll, buttons are 44px tap-sized.
- **NFR-1 test:** Measure page load time, expect <3 seconds total (2s API + 500ms render).

**What the tests DON'T cover (by design, because it's day 2):**
- Actual Etsy API integration with live keys (we'll need real test credentials for that)
- Multi-shop scenarios (out of scope for v1 per requirements.md)
- WebSocket / real-time sync (not in v1)
- CSV content validation beyond filename (we check the download happens, not the CSV schema)

**Playwright configuration missing:**
- No `playwright.config.ts` in the repo yet. I'll need to add one in the next round with:
  - Base URL: `http://localhost:3000`
  - Timeout: 30 seconds
  - Screenshot on failure: enabled
  - Trace on first retry: enabled

---

## Summary

I prepared comprehensive end-to-end tests covering all 6 functional requirements and NFR-1 performance validation. The test spec is ready to run. However, the application cannot be built due to a missing `package-lock.json` file (task #24). The engineer hit their step budget before addressing this. Once the engineer resolves the 4 "FIX FIRST" tasks (#24-#27), I can execute the full test suite and provide a proper pass/fail verdict.

**Next round:** I expect to run 12 Playwright tests and capture screenshots for every FR. If the app builds cleanly, testing should take under 1 hour.
