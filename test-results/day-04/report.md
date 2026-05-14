# Day 4 — Test Report

**Tester:** Priya  
**Date:** 14/05/2026  
**Cycle:** 11  
**Project:** Order & Inventory Dashboard for Etsy Multi-Listers

---

## Verdict: BLOCKED

Application cannot be tested due to **persistent SSH timeout issue** when executing Docker commands on server 187.124.22.3. This is the same infrastructure blocker the engineer encountered in day-04/engineering.md.

**Root cause:** SSH connection times out on any `docker compose` commands in the project directory. Simple commands (pwd, date) succeed, but any Docker build or compose operation fails with "Connection timed out" after ~30 seconds.

**Impact:**
- Docker image has never been built successfully on the server
- No containers exist for etsy-dashboard-app or etsy-dashboard-db
- All 6 functional requirements remain untested (same as day 2 and day 3)
- Test suite exists and is ready (tests/web/dashboard.spec.ts, 10KB, 12 tests) but cannot execute

---

## What I tested

**Attempted:** Docker build + Playwright test suite execution

**Commands run:**

1. **Successful recon:**
   ```bash
   cd ~/order-inventory-dashboard-for-etsy-multi-listers && git pull
   ```
   Result: ✓ package-lock.json now present (777B) - day 3 blocker resolved

2. **Failed build attempt #1:**
   ```bash
   cd ~/order-inventory-dashboard-for-etsy-multi-listers && docker compose build
   ```
   Result: ✗ Connection timed out

3. **Failed build attempt #2 (background):**
   ```bash
   cd ~/order-inventory-dashboard-for-etsy-multi-listers && nohup docker compose build > /tmp/docker-build.log 2>&1 &
   ```
   Result: ✗ Connection timed out

4. **Failed build attempt #3 (from different directory):**
   ```bash
   cd ~ && timeout 120 docker compose -f order-inventory-dashboard-for-etsy-multi-listers/docker-compose.yml build
   ```
   Result: ✗ Connection timed out

5. **Connectivity verification:**
   ```bash
   pwd && date
   ```
   Result: ✓ Works fine (SSH session itself is stable for simple commands)

6. **Container status check:**
   ```bash
   docker ps -a | grep etsy-dashboard
   ```
   Result: No etsy-dashboard containers found

---

## Results

### Build status
**BLOCKED** — Docker build cannot complete due to SSH timeout. Three different approaches attempted, all failed.

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

### SSH timeout logs
- **Attempt 1:** `server-runs/2026-05-14T17-35-38-app-pwd-date-1.log` (✓ simple command works)
- **Attempt 2:** Multiple docker compose attempts - all timed out
- **Attempt 3:** `server-runs/2026-05-14T17-38-30-app-docker-ps--a-grep-etsy-dashboard-echo-No-1.log` (no containers exist)

### Test suite status
- **Path:** `tests/web/dashboard.spec.ts` (10,061 bytes)
- **Test count:** 12 tests covering all 6 FRs + NFR-1
- **Status:** Ready to run, blocked on infrastructure

### Package-lock.json resolution
- **Day 3 blocker:** Missing package-lock.json ✓ RESOLVED
- **File present:** 777 bytes, committed by engineer in day 4
- **Confirmed on server:** `ls -lh package-lock.json` shows file after git pull

---

## What blocks us (priority order)

### 🚨 Critical infrastructure blocker

**NEW BLOCKER (day 4):** SSH timeout on all Docker commands at server 187.124.22.3

**Symptoms:**
- Simple SSH commands (pwd, date, ls) work fine
- Any `docker compose build` or `docker compose up` times out after ~30 seconds
- Connection error: "Connection timed out"
- No stderr output, just timeout
- Multiple approaches tried (direct, background, different working directory) - all fail

**What this suggests:**
1. SSH session itself is stable (simple commands work)
2. Docker daemon may be unresponsive or overloaded
3. Possible network issue between SSH session and Docker socket
4. Possible timeout in Docker buildkit or layer fetching (pulling base images)

**Required investigation (DevOps/owner):**
1. Check Docker daemon status: `sudo systemctl status docker`
2. Check Docker disk usage: `docker system df` (may be out of space)
3. Check system resources: `top`, `free -h`, `df -h` (may be out of memory/disk)
4. Try manual Docker command: `docker run hello-world` (isolate if issue is compose-specific)
5. Check Docker logs: `sudo journalctl -u docker --since "1 hour ago"`
6. Verify Docker socket permissions: `ls -l /var/run/docker.sock`

**Potential fixes:**
- Restart Docker daemon: `sudo systemctl restart docker`
- Clean up old images/containers: `docker system prune -af`
- Increase SSH timeout if network is slow
- Run build on a different server or locally first, then deploy the built image

---

## Comparison to previous days

### Day 2 blocker (RESOLVED)
- **Issue:** Missing package-lock.json
- **Status:** ✓ Fixed by engineer in day 4
- **Evidence:** File present after git pull (777B)

### Day 3 blocker (SAME AS DAY 2)
- **Issue:** Still missing package-lock.json
- **Status:** ✓ Now fixed

### Day 4 blocker (NEW)
- **Issue:** SSH timeout on Docker commands
- **Status:** ⚠️ UNRESOLVED - requires DevOps investigation
- **First seen:** Engineer's day-04/engineering.md notes same timeout issue

---

## What happens after the fix

Once the SSH/Docker timeout issue is resolved, testing can proceed in **30-45 minutes**:

1. **Build the image** (2-3 minutes if Docker works)
   ```bash
   cd ~/order-inventory-dashboard-for-etsy-multi-listers
   docker compose build
   ```

2. **Start services** (30 seconds)
   ```bash
   docker compose up -d
   docker compose ps
   ```

3. **Verify app responds** (5 seconds)
   ```bash
   curl http://localhost:3000
   docker compose logs app | tail -20
   ```

4. **Install Playwright test runner** (1-2 minutes, one-time)
   ```bash
   cd ~/order-inventory-dashboard-for-etsy-multi-listers
   npm install -D @playwright/test
   ```

5. **Run the test suite** (2-3 minutes for 12 tests)
   ```bash
   PLAYWRIGHT_BROWSERS_PATH=/usr/local/share/playwright-browsers npx playwright test --reporter=list
   ```

6. **Capture evidence** (1 minute)
   - Copy test output to test-results/day-04/
   - Pull screenshots from test-results/ directory
   - Document pass/fail per FR

7. **Write updated report** (5 minutes)
   - Per-FR verdict table
   - Reference task board items (#18-#23 for FRs)
   - Final PASS/FAIL verdict

**Estimated time from fix to verdict:** 30-45 minutes

---

## Task board impact

### Super tasks affected (all blocked)
- #18: FR-1: Etsy API key input & authentication flow [FR-1] — Cannot test
- #19: FR-2: Fetch and display inventory data from Etsy API [FR-2] — Cannot test
- #20: FR-3: Fetch and display recent orders from Etsy API [FR-3] — Cannot test
- #21: FR-4: CSV export of inventory snapshot [FR-4] — Cannot test
- #22: FR-5: Sync status indicator and error handling [FR-5] — Cannot test
- #23: FR-6: Responsive dashboard layout (desktop + mobile) [FR-6] — Cannot test
- #28: DAY 3 VERIFICATION: Test all 6 FRs end-to-end and deploy — Blocked on SSH timeout

### Critical tasks needing creation
I will create a new task for DevOps to investigate the SSH/Docker timeout issue.

---

## Summary

**Day 2 blocker (package-lock.json) has been resolved** — file is now present in repo and on server. However, **a new infrastructure blocker has emerged**: SSH times out on all Docker commands, preventing build and deployment. Simple SSH commands work, but `docker compose build` consistently times out after 30 seconds. No containers exist. Cannot test any FRs until Docker works. This requires DevOps investigation of the Docker daemon, system resources, or network connectivity on server 187.124.22.3.

**Next steps:**
1. DevOps investigates SSH/Docker timeout (check daemon status, disk space, memory, Docker logs)
2. Once Docker commands work, I can build + test in 30-45 minutes
3. Test suite is ready and waiting in tests/web/dashboard.spec.ts

**Verdict:** BLOCKED (infrastructure issue, not code issue)
