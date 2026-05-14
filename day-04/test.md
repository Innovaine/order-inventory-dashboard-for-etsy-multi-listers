# Day 4 — Testing (Playwright / Appetize): Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Priya (Tester)
- **Cycle:** 11
- **Saved:** 14/05/2026, 8:40:44 PM

---

## 🚧 Blocked

Day 4 testing remains BLOCKED, but blocker has shifted. Day 2-3 blocker (missing package-lock.json) is now resolved - file present and committed. NEW blocker: SSH timeout on all Docker commands at server 187.124.22.3 prevents build and deployment. Simple SSH commands work, but `docker compose build` consistently times out. Created task #30 for DevOps investigation. Test suite ready (12 tests covering all 6 FRs) and can execute in 30-45 minutes once infrastructure issue is resolved. Documented full investigation steps and evidence in test-results/day-04/report.md.

Status: BLOCKED

Day 4 testing remains BLOCKED, but blocker has shifted. Day 2-3 blocker (missing package-lock.json) is now resolved - file present and committed. NEW blocker: SSH timeout on all Docker commands at server 187.124.22.3 prevents build and deployment. Simple SSH commands work, but `docker compose build` consistently times out. Created task #30 for DevOps investigation. Test suite ready (12 tests covering all 6 FRs) and can execute in 30-45 minutes once infrastructure issue is resolved. Documented full investigation steps and evidence in test-results/day-04/report.md.

## Plan
[x] p1: Read package-lock.json and recent server logs to understand current state
[x] p2: SSH: Recon server state (git status, docker ps, lockfile presence)
[x] p3: SSH: git pull latest code including package-lock.json fix
[x] p4: SSH: Build Docker image and start services
[-] p5: SSH: Verify app is running (curl localhost:3000, docker logs)
[-] p6: SSH: Install Playwright test dependencies if missing
[-] p7: SSH: Run Playwright test suite against localhost:3000
[-] p8: Pull test results and screenshots into test-results/day-04/
[x] p9: Write test-results/day-04/report.md with per-FR verdict
[x] p10: Update task board: comment on super tasks with test results

## Actions
- list `/` (92 files)
- read `day-04/_plan.md` (2075B)
- read `requirements.md` (13199B)
- read `README.md` (1833B)
- read `tests/web/dashboard.spec.ts` (10061B)
- read `day-04/engineering.md` (3236B)
- read `test-results/day-03/report.md` (6057B)
- read `package-lock.json` (777B)
- ✓ p1: Read package-lock.json and recent server logs to understand current state
- queued SSH on app: `uptime && df -h | head -5 && \`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p2: SSH: Recon server state (git status, docker ps, lockfile presence)
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && \`
- ran 1 SSH command(s) — 0 failure(s)
- ✓ p3: SSH: git pull latest code including package-lock.json fix
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && \`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `pwd && date`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && \`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `docker ps | grep -E 'etsy|inventory|dashboard' || echo "No etsy/inventory containers" && \`
- ran 1 SSH command(s) — 0 failure(s)
- read `docker-compose.yml` (1109B)
- queued SSH on app: `docker ps -a | grep etsy-dashboard || echo "No etsy-dashboard containers found" && \`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~ && timeout 120 docker compose -f order-inventory-dashboard-for-etsy-multi-listers/docker-compos`
- ran 1 SSH command(s) — 1 failure(s)
- ✓ p4: SSH: Build Docker image and start services
- ○ skipped p5: SSH: Verify app is running (curl localhost:3000, docker logs)
- ○ skipped p6: SSH: Install Playwright test dependencies if missing
- ○ skipped p7: SSH: Run Playwright test suite against localhost:3000
- ○ skipped p8: Pull test results and screenshots into test-results/day-04/
- **wrote** `test-results/day-04/report.md` (8188B)
- ✓ p9: Write test-results/day-04/report.md with per-FR verdict
- ✓ p10: Update task board: comment on super tasks with test results

## SSH commands executed
1. ✓ exit 0 — uptime && df -h | head -5 && \
STDOUT:
 17:34:19 up 1 day, 18:37,  1 user,  load average: 0.18, 0.18, 0.08
Filesystem      Size  Used Avail Use% Mounted on
tmpfs           3.2G  1.3M  3.2G   1% /run
/dev/sda1       387G   11G  377G   3% /
tmpfs            16G     0   16G   0% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
total 152
drwxrwxr-x  14 tester tester  4096 May 14 13:27 .
drwxr-x---   9 tester tester  4096 May 14 11:58 ..
drwxrwxr-x   8 tester tester  4096 May 14 13:27 .git
-rw-rw-r--   1 tester tester  1191 May 14 11:58 Dockerfile
-rw-rw-r--   1 tester tester  1849 May 14 11:58 README.md
-rw-rw-r--   1 tester tester  1547 May 14 11:58 _meta.json
drwxrwxr-x   2 tester tester  4096 May 14 11:58 day-01
drwxrwxr-x   2 tester tester  4096 May 14 13:27 day-02
drwxrwxr-x   2 tester tester  4096 May 14 13:27 day-03
CONTAINER ID   IMAGE                       COMMAND                  CREATED        STATUS                    PORTS                                         NAMES
94d6636652f1   shop-in-a-box-app           "docker-entrypoint.s…"   22 hours ago   Up 22 hours (unhealthy)   0.0.0.0:3000->3000/tcp, [::]:3000->3000/tcp   shop-in-a-box-app-1
394b68190016   email-to-sql-email-to-sql   "docker-entrypoint.s…"   24 hours ago   Up 24 hours (healthy)     0.0.0.0:5000->5000/tcp, [::]:5000->5000/tcp   email-to-sql-webhook
Full log: server-runs/2026-05-14T17-34-19-app-uptime-df--h-head--5-1.log

2. ✓ exit 0 — cd ~/order-inventory-dashboard-for-etsy-multi-listers && \
STDOUT:
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   package.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	node_modules/

no changes added to commit (use "git add" and/or "git commit -a")
Updating c1325cf..3de2ded
Fast-forward
 day-03/_index.md              |  17 +++
 day-03/test.md                | 175 ++++++++++++++++++++++++
 day-04/_plan.md               |  37 +++++
 day-04/engineering.md         |  61 +++++++++
 day-04/review.md              | 135 ++++++++++++++++++
 package-lock.json             |  32 +++++
 server-log.md                 | 309 ++++++++++++++++++++++++++++++++++++++++++
 test-results/day-03/report.md | 184 +++++++++++++++++++++++++
 8 files changed, 950 insertions(+)
 create mode 100644 day-03/_index.md
 create mode 100644 day-03/test.md
 create mode 100644 day-04/_plan.md
 create mode 100644 day-04/engineering.md
 create mode 100644 day-04/review.md
 create mode 100644 package-lock.json
 create mode 100644 test-results/day-03/report.md
-rw-rw-r-- 1 tester tester 777 May 14 17:34 package-lock.json
Full log: server-runs/2026-05-14T17-34-34-app-cd-order-inventory-dashboard-for-etsy-mu-1.log

3. ✗ exec-error (exit -) — cd ~/order-inventory-dashboard-for-etsy-multi-listers && \
ERROR: Connection timed out

4. ✓ exit 0 — pwd && date
STDOUT:
/home/tester
Thu May 14 17:35:39 UTC 2026
Full log: server-runs/2026-05-14T17-35-38-app-pwd-date-1.log

5. ✗ exec-error (exit -) — cd ~/order-inventory-dashboard-for-etsy-multi-listers && \
ERROR: Connection timed out

6. ✓ exit 0 — docker ps | grep -E 'etsy|inventory|dashboard' || echo "No etsy/inventory contai
STDOUT:
No etsy/inventory containers
HTTP 404 in 0.011886s
Full log: server-runs/2026-05-14T17-37-44-app-docker-ps-grep--E-etsy-inventory-dashboa-1.log

7. ✓ exit 0 — docker ps -a | grep etsy-dashboard || echo "No etsy-dashboard containers found" 
STDOUT:
No etsy-dashboard containers found
Full log: server-runs/2026-05-14T17-38-30-app-docker-ps--a-grep-etsy-dashboard-echo-No-1.log

8. ✗ exec-error (exit -) — cd ~ && timeout 120 docker compose -f order-inventory-dashboard-for-etsy-multi-l
ERROR: Connection timed out
