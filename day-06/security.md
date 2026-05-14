# Day 6 — Security audit: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Nadia (DevOps)
- **Cycle:** 13
- **Saved:** 14/05/2026, 10:17:45 PM

---

## ⏹️ Stopped by user

User stopped the cycle before SSH commands ran.

## Plan
[ ] p1: Git clone and setup the repo on app server for auditing
[ ] p2: Run npm audit to scan for vulnerable dependencies
[ ] p3: Run gitleaks to detect secrets in code history
[ ] p4: Run trivy fs to scan Docker image and filesystem for vulnerabilities
[ ] p5: Manually review key auth + API code for CRIT/HIGH severity issues
[ ] p6: File any findings as tasks for engineer
[ ] p7: Write day-06/security-audit.md report with verdict

## Actions
- list `/` (140 files)
- read `requirements.md` (13199B)
- read `day-05/review.md` (2025B)
- read `day-06/engineering.md` (25860B)
- read `package.json` (824B)
- read `src/app/api/auth/route.ts` (2337B)
- read `src/app/api/sync/route.ts` (3225B)
- read `.env.example` (160B)
- read `Dockerfile` (1402B)
- read `docker-compose.yml` (1109B)
- queued SSH on app: `uptime && df -h / && docker ps`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && npm audit --json 2>&1 | head -200`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && npm audit 2>&1 | tail -100`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && npm audit 2>&1; echo "---audit-complete---"`
- ran 1 SSH command(s) — 0 failure(s)
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && ls -la node_modules 2>&1 | head -20`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && ls -la | head -30`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `cd ~ && pwd && ls -d order* 2>&1`
- ran 1 SSH command(s) — 1 failure(s)
- queued SSH on app: `find / -maxdepth 3 -name "order-inventory-dashboard*" -type d 2>/dev/null | head -5`

## SSH commands executed
1. ✓ exit 0 — uptime && df -h / && docker ps
STDOUT:
 19:14:47 up 1 day, 20:17,  1 user,  load average: 0.01, 0.16, 0.17
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       387G   14G  374G   4% /
CONTAINER ID   IMAGE                COMMAND                  CREATED              STATUS                        PORTS                                         NAMES
f3c312a88d61   postgres:16-alpine   "docker-entrypoint.s…"   About a minute ago   Up About a minute (healthy)   0.0.0.0:5432->5432/tcp, [::]:5432->5432/tcp   etsy-dashboard-db
Full log: server-runs/2026-05-14T19-14-46-app-uptime-df--h-docker-ps-1.log

2. ✗ fail (exit 1) — cd ~/order-inventory-dashboard-for-etsy-multi-listers && npm audit --json 2>&1 |
ERROR: command exited 1

3. ✗ fail (exit 1) — cd ~/order-inventory-dashboard-for-etsy-multi-listers && npm audit 2>&1 | tail -
ERROR: command exited 1

4. ✓ exit 0 — cd ~/order-inventory-dashboard-for-etsy-multi-listers && npm audit 2>&1; echo "-
STDOUT:
---audit-complete---
Full log: server-runs/2026-05-14T19-15-45-app-cd-order-inventory-dashboard-for-etsy-mu-1.log

5. ✗ fail (exit 1) — cd ~/order-inventory-dashboard-for-etsy-multi-listers && ls -la node_modules 2>&
ERROR: command exited 1

6. ✗ fail (exit 1) — cd ~/order-inventory-dashboard-for-etsy-multi-listers && ls -la | head -30
ERROR: command exited 1

7. ✗ fail (exit 2) — cd ~ && pwd && ls -d order* 2>&1
STDOUT:
/home/devops
ls: cannot access 'order*': No such file or directory
ERROR: command exited 2
Full log: server-runs/2026-05-14T19-16-50-app-cd-pwd-ls--d-order-2-1-1.log
