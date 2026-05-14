# Day 5 — Testing (Playwright / Appetize): Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Priya (Tester)
- **Cycle:** 12
- **Saved:** 14/05/2026, 9:00:26 PM

---

## 🚧 Blocked

Day 5 testing remains BLOCKED on the same SSH timeout issue from day 4. Attempted Docker build with latest code (next.config.js, updated Dockerfile) but connection times out after ~90 seconds. Simple SSH commands work fine, indicating issue is specific to Docker operations. Test suite is ready (12 tests covering all 6 FRs) but cannot execute without running application. Infrastructure blocker documented in task #30 (assigned to Nadia). Once Docker commands work, can deliver test verdict in 30-45 minutes.

Status: BLOCKED

Day 5 testing remains BLOCKED on the same SSH timeout issue from day 4. Attempted Docker build with latest code (next.config.js, updated Dockerfile) but connection times out after ~90 seconds. Simple SSH commands work fine, indicating issue is specific to Docker operations. Test suite is ready (12 tests covering all 6 FRs) but cannot execute without running application. Infrastructure blocker documented in task #30 (assigned to Nadia). Once Docker commands work, can deliver test verdict in 30-45 minutes.

## Plan
[x] p1: Check current server state and Docker status
[x] p2: Attempt Docker build with latest code changes from day 5
[-] p3: If build succeeds: start containers and verify health
[-] p4: If containers run: install Playwright deps and execute test suite
[-] p5: Pull test output and screenshots into test-results/day-05/
[x] p6: Write test-results/day-05/report.md with per-FR verdict
[-] p7: Create task for any failing FRs found during testing
[x] p8: Finish with final verdict

## Actions
- list `/` (111 files)
- read `day-05/engineering.md` (16557B)
- read `requirements.md` (13199B)
- read `README.md` (1833B)
- read `tests/web/dashboard.spec.ts` (10061B)
- read `test-results/day-04/report.md` (8188B)
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers 2>/dev/null && echo "Repo exists" || echo "Rep`
- queued SSH on app: `docker ps -a | grep etsy-dashboard || echo "No etsy-dashboard containers found"; docker images | gre`
- ran 2 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && git pull`
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && timeout 90 docker compose build 2>&1`
- ran 2 SSH command(s) — 1 failure(s)
- ✓ p1: Check current server state and Docker status
- ✓ p2: Attempt Docker build with latest code changes from day 5
- ○ skipped p3: If build succeeds: start containers and verify health
- ○ skipped p4: If containers run: install Playwright deps and execute test suite
- ○ skipped p5: Pull test output and screenshots into test-results/day-05/
- **wrote** `test-results/day-05/report.md` (8425B)
- ✓ p6: Write test-results/day-05/report.md with per-FR verdict
- ○ skipped p7: Create task for any failing FRs found during testing
- ✓ p8: Finish with final verdict

## SSH commands executed
1. ✓ exit 0 — cd ~/order-inventory-dashboard-for-etsy-multi-listers 2>/dev/null && echo "Repo 
STDOUT:
Repo exists
Full log: server-runs/2026-05-14T17-58-29-app-cd-order-inventory-dashboard-for-etsy-mu-1.log

2. ✓ exit 0 — docker ps -a | grep etsy-dashboard || echo "No etsy-dashboard containers found";
STDOUT:
No etsy-dashboard containers found
No etsy-dashboard images found
Full log: server-runs/2026-05-14T17-58-29-app-docker-ps--a-grep-etsy-dashboard-echo-No-2.log

3. ✓ exit 0 — cd ~/order-inventory-dashboard-for-etsy-multi-listers && git pull
STDOUT:
Updating 3de2ded..8c696ce
Fast-forward
 Dockerfile                    |   4 +-
 day-04/_index.md              |  17 ++
 day-04/test.md                | 151 ++++++++++++
 day-05/_plan.md               |  41 ++++
 day-05/engineering.md         | 384 ++++++++++++++++++++++++++++++
 day-05/review.md              |  32 +++
 next.config.js                |  10 +
 server-log.md                 | 537 ++++++++++++++++++++++++++++++++++++++++++
 test-results/day-04/report.md | 231 ++++++++++++++++++
 9 files changed, 1406 insertions(+), 1 deletion(-)
 create mode 100644 day-04/_index.md
 create mode 100644 day-04/test.md
 create mode 100644 day-05/_plan.md
 create mode 100644 day-05/engineering.md
 create mode 100644 day-05/review.md
 create mode 100644 next.config.js
 create mode 100644 test-results/day-04/report.md
Full log: server-runs/2026-05-14T17-58-51-app-cd-order-inventory-dashboard-for-etsy-mu-1.log

4. ✗ exec-error (exit -) — cd ~/order-inventory-dashboard-for-etsy-multi-listers && timeout 90 docker compo
ERROR: Connection timed out
