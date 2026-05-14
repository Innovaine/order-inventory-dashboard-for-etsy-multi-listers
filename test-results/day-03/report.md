# Day 3 — Test Report

**Tester:** Priya  
**Date:** 14/05/2026  
**Cycle:** 10  
**Project:** Order & Inventory Dashboard for Etsy Multi-Listers

---

## Verdict: BLOCKED

The application cannot be built or tested because the Docker build fails due to missing `package-lock.json`. This is **the same blocker from day 2** (task #24).

**Root cause:** The reviewer ran `npm install` on the server (14/05/2026 13:25:45) but did not commit the resulting `package-lock.json` to git. The file exists only on the server's filesystem in `~/order-inventory-dashboard-for-etsy-multi-listers/node_modules/`, but the Dockerfile step `RUN npm ci` runs inside a clean Docker build context that only sees files committed to the repo.

**Impact:**
- Docker build fails at step #13: `npm ci` requires package-lock.json
- Next.js app cannot start
- All 6 functional requirements remain untested
- No screenshots, no pass/fail data, no deployment possible

---

## What I tested

**Attempted:** Docker build + Playwright test suite

**Commands run:**
```bash
cd ~/order-inventory-dashboard-for-etsy-multi-listers && git pull && docker compose build && docker compose up -d
```

**Result:**
```
#13 [deps 4/4] RUN npm ci
#13 0.580 npm error code EUSAGE
#13 0.580 npm error
#13 0.580 npm error The `npm ci` command can only install with an existing package-lock.json or
#13 0.580 npm error npm-shrinkwrap.json with lockfileVersion >= 1. Run an install with npm@5 or
#13 0.580 npm error later to generate a package-lock.json file, then try again.
#13 ERROR: process "/bin/sh -c npm ci" did not complete successfully: exit code: 1
```

---

## Results

### Build status
**FAIL** — Docker image build failed at dependency installation stage.

### Test execution
**NOT RUN** — Cannot execute Playwright tests without a running application.

### Functional requirement coverage
- FR-1 (API key auth): ❌ Not tested
- FR-2 (Inventory display): ❌ Not tested
- FR-3 (Orders display): ❌ Not tested
- FR-4 (CSV export): ❌ Not tested
- FR-5 (Sync status): ❌ Not tested
- FR-6 (Responsive layout): ❌ Not tested
- NFR-1 (Performance): ❌ Not tested

---

## Evidence

### Build failure log
- **Path:** `server-runs/2026-05-14T13-28-00-app-cd-order-inventory-dashboard-for-etsy-mu-1.log`
- **Exit code:** 1
- **Error:** `npm ci` command requires package-lock.json with lockfileVersion >= 1

### Test spec ready
- **Path:** `tests/web/dashboard.spec.ts` (10KB, 12 tests)
- **Status:** Written and committed (day 2), ready to run once app builds

### Warehouse file check
Confirmed `package-lock.json` is **not present** in repo root:
```
$ list_files('')
...
package.json  (824B)
...
(no package-lock.json)
```

---

## What blocks us (priority order)

### 🚨 Critical blocker (must fix to proceed)

**Task #24 remains incomplete:** Generate package-lock.json for Docker build

**What the engineer must do:**
1. On their local machine or in the warehouse, run:
   ```bash
   npm install
   ```
2. Verify `package-lock.json` is generated (should be ~50-150KB)
3. Commit the file:
   ```bash
   git add package-lock.json
   git commit -m "Add package-lock.json for reproducible Docker builds"
   git push
   ```
4. On the server, `git pull` will then bring the file into the Docker build context

**Why this matters:**
- `npm ci` is explicitly designed for CI/CD and requires a lockfile
- Without a lockfile, every build gets random dependency versions
- The Dockerfile **intentionally** uses `npm ci` (not `npm install`) for reproducibility
- This is a 2-minute fix but blocks all downstream testing and deployment

---

## Additional context

### Why didn't the reviewer's npm install fix this?

The reviewer's command on the server (13:25:45):
```bash
cd ~/order-inventory-dashboard-for-etsy-multi-listers && npm install --prefer-offline --no-audit
```

This created `package-lock.json` on the **server filesystem** in the git clone directory. However:
1. The reviewer did not commit the file to git
2. The Docker build runs in a **clean build context** that copies files from the repo
3. When `docker compose build` runs, it only sees files that are git-committed
4. Result: `npm ci` inside the Dockerfile fails because the lockfile isn't in the build context

**Fix is simple:** Commit the file to git so it's available in the Docker build.

---

## What happens after the fix

Once `package-lock.json` is committed, I can:

1. **Re-run the build** (estimated 2-3 minutes for Docker layer caching)
   ```bash
   docker compose build && docker compose up -d
   ```

2. **Verify app is running**
   ```bash
   docker compose ps
   curl http://localhost:3000
   ```

3. **Install Playwright test runner** (one-time setup)
   ```bash
   cd ~/order-inventory-dashboard-for-etsy-multi-listers
   npm install -D @playwright/test
   ```

4. **Run the full test suite** (12 tests, ~2-3 minutes)
   ```bash
   PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright test --reporter=list
   ```

5. **Capture evidence**
   - 12 test result lines (pass/fail per FR)
   - 12 screenshots (one per test, saved to `test-results/`)
   - HTML report with trace files for any failures

6. **Write updated report** with per-FR pass/fail table

**Estimated time:** 30 minutes from lockfile commit to final verdict.

---

## Task board actions

I'm filing a **critical** task for the engineer to unblock testing. This is a repeat of task #24, which was created on day 2 but remains incomplete.

**New task:** "CRITICAL: Commit package-lock.json to unblock day 3 testing"

---

## Summary

Day 2 blocker persists. The reviewer ran `npm install` on the server but didn't commit `package-lock.json` to the repo. Docker build fails at `npm ci` because the lockfile isn't in the build context. Cannot test any of the 6 FRs until this is fixed. The test suite is ready to run — it's a 2-minute engineering fix followed by 30 minutes of test execution.

**Next round:** If `package-lock.json` is committed, I'll run the full Playwright suite and provide a proper pass/fail verdict with screenshots.
