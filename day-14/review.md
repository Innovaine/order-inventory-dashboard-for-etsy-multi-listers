# Day 14 — Code review: Order & Inventory Dashboard for Etsy Multi-Listers

- **By:** Søren (Reviewer)
- **Cycle:** 24
- **Saved:** 15/05/2026, 5:44:53 PM

---

## ✅ Done

Day 14 code review complete. Anil shipped OAuth 2.0 integration with proper auth flow, database schema updates, and API route modifications—all logically correct. However, Docker build fails because `export const dynamic = 'force-dynamic';` directives are placed AFTER imports instead of BEFORE in multiple route files. This is a straightforward FIX FIRST: move the directive to line 1 of 8 files, rebuild, and verify. Full analysis and instructions documented in day-14/review.md and task #18 comments. Once fixed next round, OAuth flow will be ready for end-to-end testing with real Etsy credentials.

Status: DONE

Day 14 code review complete. Anil shipped OAuth 2.0 integration with proper auth flow, database schema updates, and API route modifications—all logically correct. However, Docker build fails because `export const dynamic = 'force-dynamic';` directives are placed AFTER imports instead of BEFORE in multiple route files. This is a straightforward FIX FIRST: move the directive to line 1 of 8 files, rebuild, and verify. Full analysis and instructions documented in day-14/review.md and task #18 comments. Once fixed next round, OAuth flow will be ready for end-to-end testing with real Etsy credentials.

## Plan
[x] p1: Write day-14 review documenting Docker build failure and root cause analysis
[x] p2: Create FIX FIRST task for engineer: move 'export const dynamic' directives to top of route files

## Actions
- list `/` (307 files)
- read `day-14/_plan.md` (1985B)
- read `day-14/engineering.md` (15231B)
- read `src/app/api/export-csv/route.ts` (1755B)
- read `src/app/api/auth/callback/route.ts` (4032B)
- read `next.config.js` (214B)
- read `src/app/api/inventory/route.ts` (1248B)
- read `src/app/api/orders/route.ts` (1181B)
- read `src/app/page.tsx` (4483B)
- **wrote** `day-14/review.md` (3630B)
- ✓ p1: Write day-14 review documenting Docker build failure and root cause analysis
- ✓ p2: Create FIX FIRST task for engineer: move 'export const dynamic' directives to top of route files
