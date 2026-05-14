# Day 3 — Testing (Playwright / Appetize): Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Priya (Tester)
- **Cycle:** 10
- **Saved:** 14/05/2026, 4:29:14 PM

---

## 🚧 Blocked

Day 3 testing remains BLOCKED on the same issue from day 2: package-lock.json is not committed to the repo, causing Docker build to fail at `npm ci`. The reviewer ran `npm install` on the server but didn't commit the result. I've written a detailed test report documenting the blocker, root cause, and fix steps (test-results/day-03/report.md), and created task #29 for the engineer to commit the missing file. The Playwright test suite covering all 6 FRs is ready to run - once the lockfile is committed, testing will take ~30 minutes.

Status: BLOCKED

Day 3 testing remains BLOCKED on the same issue from day 2: package-lock.json is not committed to the repo, causing Docker build to fail at `npm ci`. The reviewer ran `npm install` on the server but didn't commit the result. I've written a detailed test report documenting the blocker, root cause, and fix steps (test-results/day-03/report.md), and created task #29 for the engineer to commit the missing file. The Playwright test suite covering all 6 FRs is ready to run - once the lockfile is committed, testing will take ~30 minutes.

## Plan
[x] p1: Check if app builds and starts with docker compose up
[-] p2: Run Playwright test suite covering all 6 FRs + NFR-1
[-] p3: Capture screenshots from test run to test-results/day-03/
[-] p4: Document any failing tests with actual vs expected behavior
[x] p5: Write test-results/day-03/report.md with verdict and evidence
[x] p6: Create engineer tasks for any bugs found during testing

## Actions
- list `/` (80 files)
- read `day-03/requirements.md` (2267B)
- read `README.md` (1833B)
- read `day-01/requirements.md` (3499B)
- read `requirements.md` (13199B)
- read `tests/web/dashboard.spec.ts` (10061B)
- read `test-results/day-02/report.md` (5480B)
- read `server-runs/2026-05-14T13-25-45-app-cd-order-inventory-dashboard-for-etsy-mu-1.log` (547B)
- queued SSH on app: `cd ~/order-inventory-dashboard-for-etsy-multi-listers && git pull && docker compose build && docker `
- ran 1 SSH command(s) — 1 failure(s)
- list `/` (81 files)
- ✓ p1: Check if app builds and starts with docker compose up
- **wrote** `test-results/day-03/report.md` (6057B)
- ○ skipped p2: Run Playwright test suite covering all 6 FRs + NFR-1
- ○ skipped p3: Capture screenshots from test run to test-results/day-03/
- ○ skipped p4: Document any failing tests with actual vs expected behavior
- ✓ p5: Write test-results/day-03/report.md with verdict and evidence
- ✓ p6: Create engineer tasks for any bugs found during testing

## SSH commands executed
1. ✗ fail (exit 1) — cd ~/order-inventory-dashboard-for-etsy-multi-listers && git pull && docker comp
STDOUT:
Updating 6a30fd3..c1325cf
Fast-forward
 day-02/_index.md                                   |  25 ++
 day-02/sales.md                                    | 254 ++++++++++++++++
 day-02/test.md                                     | 155 ++++++++++
 day-03/_plan.md                                    |  41 +++
 day-03/design.md                                   |  34 +++
 day-03/engineering.md                              |  50 ++++
 day-03/requirements.md                             |  35 +++
 day-03/review.md                                   | 198 +++++++++++++
 email-cold-1-etsy-shop-owner-high-volume.txt       |  15 +
 email-cold-2-etsy-shop-owner-multi-channel.txt     |  13 +
 email-cold-3-etsy-shop-owner-struggling-growth.txt |  11 +
 email-followup.txt                                 |   5 +
 execution/sales-activity-log.md                    |  93 ++++++
 .../migrations/20260514000000_init/migration.sql   |  87 ++++++
 server-log.md                                      | 320 +++++++++++++++++++++
 src/app/api/auth/route.ts                          |  17 +-
 src/app/api/inventory/route.ts                     |  12 +-
 src/app/api/session/route.ts                       |  44 +++
 src/app/dashboard/page.tsx                         |  50 ++--
 src/app/page.tsx                                   |   6 +-
 src/lib/prisma.ts                                  |  21 ++
 test-results/day-02/playwright-config-needed.md    |  53 ++++
 test-results/day-02/report.md                      | 139 +++++++++
 tests/web/dashboard.spec.ts                        | 265 +++++++++++++++++
 24 files changed, 1907 insertions(+), 36 deletions(-)
 create mode 100644 day-02/_index.md
 create mode 100644 day-02/sales.md
 create mode 100644 day-02/test.md
 create mode 100644 day-03/_plan.md
 create mode 100644 day-03/design.md
 create mode 100644 day-03/engineering.md
 create mode 100644 day-03/requirements.md
 create mode 100644 day-03/review.md
 create mode 100644 email-cold-1-etsy-shop-owner-high-volume.txt
 create mode 100644 email-cold-2-etsy-shop-owner-multi-channel.txt
 create mode 100644 email-cold-3-etsy-shop-owner-struggling-growth.txt
 create mode 100644 email-followup.txt
 create mode 100644 execution/sales-activity-log.md
 create mode 100644 prisma/migrations/20260514000000_init/migration.sql
 create mode 100644 src/app/api/session/route.ts
 create mode 100644 src/lib/prisma.ts
 create mode 100644 test-results/day-02/playwright-config-needed.md
 create mode 100644 test-results/day-02/report.md
 create mode 100644 tests/web/dashboard.spec.ts
#1 [internal] load local bake definitions
#1 reading from stdin 644B done
#1 DONE 0.0s

#2 [internal] load build definition from Dockerfile
#2 transferring dockerfile: 1.23kB done
#2 DONE 0.0s

#3 [internal] load metadata for docker.io/library/node:20-alpine
#3 DONE 0.4s

#4 [internal] load .dockerignore
#4 transferring context: 2B done
#4 DONE 0.0s

#5 [base 1/1] FROM docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293
#5 resolve docker.io/library/node:20-alpine@sha256:fb4cd12c85ee03686f6af5362a0b0d56d50c58a04632e6c0fb8363f609372293 0.0s done
#5 DONE 0.0s

#6 [runner  2/10] RUN addgroup --system --gid 1001 nodejs
#6 CACHED

#7 [builder 1/5] WORKDIR /app
#7 CACHED

#8 [runner  3/10] RUN adduser --system --uid 1001 nextjs
#8 CACHED

#9 [internal] load build context
#9 transferring context: 316.98MB 1.9s done
#9 DONE 1.9s

#10 [deps 1/4] RUN apk add --no-cache libc6-compat
#10 CACHED

#11 [deps 2/4] WORKDIR /app
#11 CACHED

#12 [deps 3/4] COPY package.json package-lock.json* ./
#12 DONE 0.3s

#13 [deps 4/4] RUN npm ci
#13 0.580 npm error code EUSAGE
#13 0.580 npm error
#13 0.580 npm error The `npm ci` command can only install with an existing package-lock.json or
#13 0.580 npm error npm-shrinkwrap.json with lockfileVersion >= 1. Run an install with npm@5 or
#13 0.580 npm error later to generate a package-lock.json file, then try again.
#13 0.580 npm error
#13 0.580 npm error Clean install a project
#13 0.580 npm error
#13 0.580 npm error Usage:
#13 0.580 npm error npm ci
#13 0.580 npm error
#13 0.580 npm error Options:
#13 0.580 npm error [--install-strategy <hoisted|nested|shallow|linked>] [--legacy-bundling]
#13 0.580 npm error [--global-style] [--omit <dev|optional|peer> [--omit <dev|optional|peer> ...]]
#13 0.580 npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
#13 0.580 npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
#13 0.580 npm error [--no-bin-links] [--no-fund] [--dry-run]
#13 0.580 npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
#13 0.580 npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
#13 0.580 npm error
#13 0.580 npm error aliases: clean-install, ic, install-clean, isntall-clean
#13 0.580 npm error
#13 0.580 npm error Run "npm help ci" for more info
#13 0.582 npm error A complete log of this run can be found in: /root/.npm/_logs/2026-05-14T13_27_59_362Z-debug-0.log
#13 ERROR: process "/bin/sh -c npm ci" did not complete successfully: exit code: 1
------
 > [deps 4/4] RUN npm ci:
0.580 npm error [--include <prod|dev|optional|peer> [--include <prod|dev|optional|peer> ...]]
0.580 npm error [--strict-peer-deps] [--foreground-scripts] [--ignore-scripts] [--no-audit]
0.580 npm error [--no-bin-links] [--no-fund] [--dry-run]
0.580 npm error [-w|--workspace <workspace-name> [-w|--workspace <workspace-name> ...]]
0.580 npm error [-ws|--workspaces] [--include-workspace-root] [--install-links]
0.580 npm error
0.580 npm error aliases: clean-install, ic, install-clean, isntall-clean
0.580 npm error
0.580 npm error Run "npm help ci" for more info
0.582 npm error A complete log of this run can be found in: /root/.npm/_logs/2026-05-14T13_27_59_362Z-debug-0.log
------
ERROR: command exited 1
Full log: server-runs/2026-05-14T13-28-00-app-cd-order-inventory-dashboard-for-etsy-mu-1.log
